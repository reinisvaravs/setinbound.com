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
  className?: string;
}

const CallAgentButton: React.FC<CallAgentButtonProps> = ({
  children,
  className,
}) => {
  const [cooldown, setCooldown] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [attempts, setAttempts] = useState(0);

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
