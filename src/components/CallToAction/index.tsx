"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// import toast from "react-hot-toast";

const COOLDOWN_SECONDS = 60;
const MAX_ATTEMPTS = 2;
const LS_ATTEMPTS_KEY = "callAttempts";
const LS_COOLDOWN_END_KEY = "callCooldownEnd";

const CallToAction = () => {
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
    <section
      id="call-section"
      className="relative z-10 overflow-hidden bg-primary-WHITE_DARK py-20 lg:py-[115px]"
    >
      {showConfirm &&
        typeof window !== "undefined" &&
        ReactDOM.createPortal(confirmDialog, document.body)}
      <div className="container mx-auto">
        <div className="relative overflow-hidden">
          <div className="-mx-4 flex flex-wrap items-stretch">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[570px] text-center">
                <h2 className="mb-2.5 text-3xl font-bold text-secondary-GRAY md:text-[38px] md:leading-[1.44]">
                  <span>Experience Our Demo AI Receptionist</span>
                </h2>
                <p className="mx-auto mb-6 max-w-[515px] text-base leading-[1.5] text-secondary-LIGHT_GRAY">
                  Click below to call our AI Receptionist directly
                </p>
                <div className="my-6">
                  <button
                    className="inline-flex items-center justify-center rounded-md bg-accent-BLUE px-4 py-2 text-xs font-medium text-primary-WHITE transition duration-300 ease-in-out hover:bg-secondary-GRAY hover:text-primary-WHITE disabled:cursor-not-allowed disabled:opacity-50 xs:h-8 xs:px-4 xs:text-xs sm:h-10 sm:px-5 sm:text-sm md:h-11 md:px-6 md:text-base lg:h-12 lg:px-7 lg:text-base xl:h-12 xl:px-8 xl:text-[15px]"
                    onClick={handleCallClick}
                    disabled={cooldown > 0}
                  >
                    {cooldown > 0
                      ? `Wait ${cooldown}s`
                      : `Call Agent${attempts > 0 ? ` (${MAX_ATTEMPTS - attempts} left)` : ""}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none">
        <span className="absolute left-0 top-0">
          <svg
            width="495"
            height="470"
            viewBox="0 0 495 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="55"
              cy="442"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="446"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="12"
            />
          </svg>
        </span>
        <span className="absolute bottom-0 right-0">
          <svg
            width="493"
            height="470"
            viewBox="0 0 493 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="462"
              cy="5"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="49"
              cy="470"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z"
              stroke="white"
              strokeOpacity="0.06"
              strokeWidth="13"
            />
          </svg>
        </span>
      </div>
    </section>
  );
};

export default CallToAction;
