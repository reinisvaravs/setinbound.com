import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

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

  const confirmDialog = showConfirm ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="animate-fade-in w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col items-center">
          {/* Terms Checkbox */}
          <div className="mb-6 flex w-full items-start gap-4">
            <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center">
              <input
                type="checkbox"
                id="terms-checkbox"
                checked={agreedToTerms}
                onChange={handleCheckboxChange}
                className="h-5 w-5 rounded-md border-2 border-gray-300 bg-white text-accent-BLUE transition-colors duration-200 focus:ring-2 focus:ring-accent-BLUE focus:ring-offset-2 focus:ring-offset-white"
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

          <div className="flex w-full justify-end gap-2">
            <button
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-200"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition ${
                agreedToTerms
                  ? "bg-accent-BLUE text-primary-WHITE hover:bg-success-500"
                  : "cursor-not-allowed bg-gray-300 text-gray-500"
              }`}
              onClick={handleConfirm}
              disabled={!agreedToTerms}
            >
              Call
            </button>
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
        className="flex items-center gap-4 rounded-md bg-accent-BLUE px-6 py-[14px] text-base font-medium text-primary-WHITE transition duration-300 ease-in-out hover:bg-success-500"
        onClick={handleCallClick}
        disabled={cooldown > 0}
      >
        {cooldown > 0 ? `Wait ${cooldown}s` : children}
      </button>
    </>
  );
};

export default CallAgentButton;
