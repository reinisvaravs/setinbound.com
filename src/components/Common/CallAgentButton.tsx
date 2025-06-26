import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const COOLDOWN_SECONDS = 60;
const MAX_ATTEMPTS = 2;
const LS_ATTEMPTS_KEY = "callAttempts";
const LS_COOLDOWN_END_KEY = "callCooldownEnd";

interface CallAgentButtonProps {
  children: React.ReactNode;
  className?: string;
}

const CallAgentButton: React.FC<CallAgentButtonProps> = ({
  children,
  className,
}) => {
  const [cooldown, setCooldown] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [attempts, setAttempts] = useState(0);

  // On mount, restore attempts and cooldown from localStorage
  useEffect(() => {
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
      startCooldownInterval(cooldownEnd - now);
    } else {
      setAttempts(storedAttempts);
      if (cooldownEnd) {
        localStorage.removeItem(LS_COOLDOWN_END_KEY);
      }
    }
    // eslint-disable-next-line
  }, []);

  // Helper to start the cooldown interval
  const startCooldownInterval = (msLeft: number) => {
    setCooldown(Math.ceil(msLeft / 1000));
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          localStorage.removeItem(LS_COOLDOWN_END_KEY);
          setAttempts(0);
          localStorage.setItem(LS_ATTEMPTS_KEY, "0");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimer(interval);
  };

  // Start cooldown and persist to localStorage
  const startCooldown = () => {
    const cooldownEnd = Date.now() + COOLDOWN_SECONDS * 1000;
    localStorage.setItem(LS_COOLDOWN_END_KEY, cooldownEnd.toString());
    setCooldown(COOLDOWN_SECONDS);
    setAttempts(0);
    localStorage.setItem(LS_ATTEMPTS_KEY, "0");
    startCooldownInterval(COOLDOWN_SECONDS * 1000);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cooldown === 0) {
      setShowConfirm(true);
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
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const confirmDialog = showConfirm ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="animate-fade-in w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col items-center">
          <svg
            className="mb-4 h-12 w-12 text-accent-BLUE"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <h3 className="mb-2 text-xl font-bold text-secondary-GRAY">
            Confirm Call
          </h3>
          <p className="mb-6 text-center text-base text-secondary-LIGHT_GRAY">
            Are you sure you want to call our AI Receptionist? This will use
            your phone&apos;s calling feature.
          </p>
          <div className="flex w-full justify-end gap-2">
            <button
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="rounded-lg bg-accent-BLUE px-4 py-2 text-sm font-medium text-primary-WHITE shadow-sm transition hover:bg-secondary-GRAY"
              onClick={handleConfirm}
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
        className={
          "inline-flex items-center justify-center rounded-md bg-accent-BLUE px-4 py-2 text-xs font-medium text-primary-WHITE transition duration-300 ease-in-out hover:bg-secondary-GRAY hover:text-primary-WHITE disabled:cursor-not-allowed disabled:opacity-50 xs:h-8 xs:px-4 xs:text-xs sm:h-10 sm:px-5 sm:text-sm md:h-11 md:px-6 md:text-base lg:h-12 lg:px-7 lg:text-base xl:h-12 xl:px-8 xl:text-[15px] " +
          (className || "")
        }
        onClick={handleCallClick}
        disabled={cooldown > 0}
      >
        {cooldown > 0 ? `Wait ${cooldown}s` : children}
      </button>
    </>
  );
};

export default CallAgentButton;
