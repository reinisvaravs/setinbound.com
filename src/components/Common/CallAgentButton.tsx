"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { QRCodeCanvas } from "qrcode.react";

const COOLDOWN_SECONDS = 60;
const MAX_ATTEMPTS = 2;
const LS_ATTEMPTS_KEY = "callAttempts";
const LS_COOLDOWN_END_KEY = "callCooldownEnd";

// Global timer management
let globalTimer: NodeJS.Timeout | null = null;
let globalTimerEnd: number = 0;

interface CallAgentButtonProps {
  children: React.ReactNode;
}

const CallAgentButton: React.FC<CallAgentButtonProps> = ({ children }) => {
  const [cooldown, setCooldown] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const phoneNumber =
    process.env.NEXT_PUBLIC_RETELL_PHONE_NUMBER || "+37128816633";
  const numberRef = useRef<HTMLSpanElement>(null);

  // On mount, restore attempts and cooldown from localStorage
  useEffect(() => {
    const updateFromStorage = () => {
      const storedAttempts = parseInt(
        localStorage.getItem(LS_ATTEMPTS_KEY) || "0",
        10,
      );
      const cooldownEnd = parseInt(
        localStorage.getItem(LS_COOLDOWN_END_KEY) || "0",
        10,
      );
      const now = Date.now();
      if (cooldownEnd && cooldownEnd > now) {
        setCooldown(Math.ceil((cooldownEnd - now) / 1000));
        setAttempts(0);
        startGlobalCooldown(cooldownEnd - now);
      } else {
        setAttempts(storedAttempts);
        if (cooldownEnd) {
          localStorage.removeItem(LS_COOLDOWN_END_KEY);
        }
        setCooldown(0);
      }
    };
    updateFromStorage();

    // Listen for custom events to sync across all instances in the same tab
    const onCallAgentUpdate = () => {
      updateFromStorage();
    };
    window.addEventListener("callAgentUpdate", onCallAgentUpdate);

    // Also listen for storage changes (for cross-tab sync)
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_ATTEMPTS_KEY || e.key === LS_COOLDOWN_END_KEY) {
        updateFromStorage();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("callAgentUpdate", onCallAgentUpdate);
      window.removeEventListener("storage", onStorage);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  // Global cooldown timer management
  const startGlobalCooldown = (msLeft: number) => {
    // Clear existing timer if any
    if (globalTimer) {
      clearInterval(globalTimer);
    }

    globalTimerEnd = Date.now() + msLeft;
    setCooldown(Math.ceil(msLeft / 1000));

    globalTimer = setInterval(() => {
      const now = Date.now();
      const remaining = Math.ceil((globalTimerEnd - now) / 1000);

      if (remaining <= 0) {
        if (globalTimer) {
          clearInterval(globalTimer);
          globalTimer = null;
        }
        localStorage.removeItem(LS_COOLDOWN_END_KEY);
        localStorage.setItem(LS_ATTEMPTS_KEY, "0");
        setCooldown(0);
        setAttempts(0);
        // Broadcast the update to other instances
        window.dispatchEvent(new Event("callAgentUpdate"));
      } else {
        setCooldown(remaining);
        // Broadcast the timer update to all instances
        window.dispatchEvent(
          new CustomEvent("callAgentTimerUpdate", { detail: remaining }),
        );
      }
    }, 1000);
  };

  // Listen for timer updates from other instances
  useEffect(() => {
    const onTimerUpdate = (e: CustomEvent) => {
      setCooldown(e.detail);
    };
    window.addEventListener(
      "callAgentTimerUpdate",
      onTimerUpdate as EventListener,
    );

    return () => {
      window.removeEventListener(
        "callAgentTimerUpdate",
        onTimerUpdate as EventListener,
      );
    };
  }, []);

  // Start cooldown and persist to localStorage
  const startCooldown = () => {
    const cooldownEnd = Date.now() + COOLDOWN_SECONDS * 1000;
    localStorage.setItem(LS_COOLDOWN_END_KEY, cooldownEnd.toString());
    setCooldown(COOLDOWN_SECONDS);
    setAttempts(0);
    localStorage.setItem(LS_ATTEMPTS_KEY, "0");
    startGlobalCooldown(COOLDOWN_SECONDS * 1000);
    // Broadcast the update to other instances
    window.dispatchEvent(new Event("callAgentUpdate"));
  };

  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cooldown === 0) {
      setShowConfirm(true);
      setAgreedToTerms(false); // Reset checkbox when opening dialog
    }
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    localStorage.setItem(LS_ATTEMPTS_KEY, newAttempts.toString());
    window.location.href = `tel:${process.env.NEXT_PUBLIC_RETELL_PHONE_NUMBER || "+37128816633"}`;
    if (newAttempts >= MAX_ATTEMPTS) {
      startCooldown();
    } else {
      // Broadcast the update to other instances
      window.dispatchEvent(new Event("callAgentUpdate"));
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setAgreedToTerms(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToTerms(e.target.checked);
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setShowTooltip(true);
      setAnnounce("Phone number copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
      setTimeout(() => setShowTooltip(false), 1500);
    } else if (numberRef.current) {
      // Fallback: select the number for manual copy
      const range = document.createRange();
      range.selectNode(numberRef.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      setAnnounce("Phone number selected. Press Ctrl+C to copy.");
    }
    if ((window as any).gtag)
      (window as any).gtag("event", "copy_phone_number");
  };

  const handleReveal = () => {
    toast(
      "You need to agree to the Terms of Service and Privacy Policy to reveal the number.",
    );
    setAnnounce(
      "You need to agree to the Terms of Service and Privacy Policy to reveal the number.",
    );
    if ((window as any).gtag)
      (window as any).gtag("event", "reveal_attempt_without_agreement");
  };

  const handleCall = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!agreedToTerms) {
      e.preventDefault();
      return;
    }
    if ((window as any).gtag) (window as any).gtag("event", "call_agent");
    handleConfirm();
  };

  const confirmDialog = showConfirm ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="animate-fade-in w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col items-center">
          {/* Terms Checkbox */}
          <div className="mb-6 flex w-full items-start gap-4">
            <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center">
              <input
                type="checkbox"
                id="terms-checkbox"
                checked={agreedToTerms}
                onChange={handleCheckboxChange}
                className="h-5 w-5 rounded-md border-2 border-gray-300 bg-white text-accent-BLUE transition-colors duration-200 focus:outline-none focus:[box-shadow:0_0_0_2px_#2563eb]"
              />
            </div>
            <label
              htmlFor="terms-checkbox"
              className="cursor-pointer select-none text-sm leading-6 text-gray-700"
            >
              I agree to the{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-BLUE underline decoration-2 underline-offset-2 transition-colors duration-200 hover:text-success-500"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-BLUE underline decoration-2 underline-offset-2 transition-colors duration-200 hover:text-success-500"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Number and action buttons in a row when revealed */}
          <div className="mb-4 flex min-h-12 w-full items-center justify-between gap-4">
            {agreedToTerms ? (
              <div
                className="animate-fade-in flex items-center gap-2"
                style={{ transition: "all 0.3s" }}
              >
                <span
                  ref={numberRef}
                  className="select-all text-sm text-gray-700"
                  aria-label="Agent phone number"
                  tabIndex={0}
                >
                  {phoneNumber}
                </span>
                <button
                  className="ease relative rounded-full"
                  onClick={handleCopy}
                  type="button"
                  aria-label={copied ? "Copied!" : "Copy phone number"}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onFocus={() => setShowTooltip(true)}
                  onBlur={() => setShowTooltip(false)}
                >
                  {!copied && <MdContentCopy className="fill-secondary-GRAY" />}
                  {copied && <FaCheck className="fill-secondary-GRAY" />}
                  {showTooltip && (
                    <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 rounded bg-gray-700 px-2 py-1 text-xs text-white shadow-lg">
                      {copied ? "Copied!" : "Copy to clipboard"}
                    </span>
                  )}
                </button>
                {/* QR code for desktop users */}
                {!isMobile && (
                  <div
                    className="ml-2"
                    aria-label="Scan QR code to call on your phone"
                  >
                    <QRCodeCanvas value={`tel:${phoneNumber}`} size={40} />
                  </div>
                )}
                {/* Screen reader live region for announcements */}
                <span aria-live="polite" className="sr-only">
                  {announce}
                </span>
              </div>
            ) : (
              <span
                className="cursor-pointer text-sm text-gray-700"
                onClick={handleReveal}
                aria-label="Reveal Number (requires agreement)"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleReveal();
                }}
                style={{
                  minHeight: "40px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Reveal Number
              </span>
            )}
            <div className="flex gap-2">
              <button
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-200"
                onClick={handleCancel}
                aria-label="Cancel"
              >
                Cancel
              </button>
              <a
                href={agreedToTerms ? `tel:${phoneNumber}` : undefined}
                className={`rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition ${
                  agreedToTerms
                    ? "bg-accent-BLUE text-primary-WHITE hover:bg-success-500"
                    : "pointer-events-none cursor-not-allowed bg-gray-300 text-gray-500"
                }`}
                onClick={handleCall}
                tabIndex={agreedToTerms ? 0 : -1}
                aria-label="Call agent"
              >
                Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {showConfirm &&
        typeof window !== "undefined" &&
        ReactDOM.createPortal(confirmDialog, document.body)}
      <button
        className="flex items-center gap-2 rounded-md bg-accent-BLUE px-3 py-3 text-sm font-medium text-primary-WHITE transition duration-300 ease-in-out hover:bg-success-500 sm:gap-4 sm:px-6 sm:py-[14px] sm:text-base"
        onClick={handleCallClick}
        disabled={cooldown > 0}
      >
        {cooldown > 0 ? `Wait ${cooldown}s` : children}
      </button>
    </>
  );
};

export default CallAgentButton;
