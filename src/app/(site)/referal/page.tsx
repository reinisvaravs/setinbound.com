"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ReferalPage() {
  const [formData, setFormData] = useState({
    // Referrer's Info
    referrerName: "",
    referrerPhone: "",
    referrerEmail: "",
    hasNotifiedReferral: false,

    // Referred Business Info
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    companyName: "",
    runsAds: false,
    otherInfo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Allows formats: +XXX-XXX-XXXX, XXX-XXX-XXXX, XXXXXXXXXX
    return /^(\+\d{1,3}[- ]?)?\d{3}[- ]?\d{3}[- ]?\d{4}$/.test(phone);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.referrerName.trim()) {
      newErrors.referrerName = "Referrer name is required";
    }
    if (!formData.referrerPhone.trim()) {
      newErrors.referrerPhone = "Referrer phone is required";
    } else if (!validatePhone(formData.referrerPhone)) {
      newErrors.referrerPhone = "Invalid phone format (e.g., +123-456-7890)";
    }
    if (!formData.referrerEmail.trim()) {
      newErrors.referrerEmail = "Referrer email is required";
    } else if (!validateEmail(formData.referrerEmail)) {
      newErrors.referrerEmail = "Invalid email format";
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
    }
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "Contact phone is required";
    } else if (!validatePhone(formData.contactPhone)) {
      newErrors.contactPhone = "Invalid phone format (e.g., +123-456-7890)";
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required";
    } else if (!validateEmail(formData.contactEmail)) {
      newErrors.contactEmail = "Invalid email format";
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://sheetdb.io/api/v1/bhxoxdwcztjdo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Referrer Name": formData.referrerName.trim(),
          "Referrer Phone": `'${formData.referrerPhone.trim()}`,
          "Referrer Email": formData.referrerEmail.trim(),
          "Has Notified Referral": formData.hasNotifiedReferral ? "Yes" : "No",
          "Contact Name": formData.contactName.trim(),
          "Contact Phone": `'${formData.contactPhone.trim()}`,
          "Contact Email": formData.contactEmail.trim(),
          "Company Name/Domain": formData.companyName.trim(),
          "Runs Ads": formData.runsAds ? "Yes" : "No",
          "Other Info": formData.otherInfo.trim(),
          Timestamp: (() => {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, "0");
            const day = now.getDate().toString().padStart(2, "0");
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const seconds = now.getSeconds().toString().padStart(2, "0");
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          })(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      toast.success(
        "Thank you for your referral! We&apos;ll be in touch soon.",
      );
      setFormData({
        referrerName: "",
        referrerPhone: "",
        referrerEmail: "",
        hasNotifiedReferral: false,
        contactName: "",
        contactPhone: "",
        contactEmail: "",
        companyName: "",
        runsAds: false,
        otherInfo: "",
      });
      setErrors({});
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-10 bg-primary-WHITE py-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mt-8 max-w-[570px] text-center">
              <h2 className="mb-2.5 text-3xl font-bold text-secondary-GRAY md:text-[30px] md:leading-[1.44]">
                Refer a Business and Earn 500-1500€
              </h2>
              <p className="mb-10 text-base text-secondary-LIGHT_GRAY">
                Help us grow our network while earning rewards for successful
                referrals.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[570px]">
          <form
            onSubmit={handleSubmit}
            className="wow fadeInUp"
            data-wow-delay=".15s"
          >
            <div className="mb-6">
              <label
                htmlFor="referrerName"
                className="mb-2.5 block text-secondary-GRAY"
              >
                Your Name *
              </label>
              <input
                type="text"
                id="referrerName"
                value={formData.referrerName}
                onChange={(e) =>
                  setFormData({ ...formData, referrerName: e.target.value })
                }
                placeholder="Enter your name"
                className="mr-2 w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
              {errors.referrerName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.referrerName}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="referrerPhone"
                className="mb-2.5 block text-secondary-GRAY"
              >
                Your Phone Number *
              </label>
              <input
                type="tel"
                id="referrerPhone"
                value={formData.referrerPhone}
                onChange={(e) =>
                  setFormData({ ...formData, referrerPhone: e.target.value })
                }
                placeholder="+123-456-7890"
                className="w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
              {errors.referrerPhone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.referrerPhone}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="referrerEmail"
                className="mb-2.5 block text-secondary-GRAY"
              >
                Your Email *
              </label>
              <input
                type="email"
                id="referrerEmail"
                value={formData.referrerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, referrerEmail: e.target.value })
                }
                placeholder="Enter your email"
                className="w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
              {errors.referrerEmail && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.referrerEmail}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="flex items-center text-secondary-GRAY">
                <input
                  type="checkbox"
                  checked={formData.hasNotifiedReferral}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hasNotifiedReferral: e.target.checked,
                    })
                  }
                  className="mr-2 h-4 w-4 cursor-pointer"
                />
                I have notified the referral about this submission
              </label>
            </div>

            <div className="mb-6">
              <label
                htmlFor="contactName"
                className="mb-2.5 block text-secondary-GRAY"
              >
                Referral Name *
              </label>
              <input
                type="text"
                id="contactName"
                value={formData.contactName}
                onChange={(e) =>
                  setFormData({ ...formData, contactName: e.target.value })
                }
                placeholder="Enter referral's name"
                className="w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
              {errors.contactName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.contactName}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="contactPhone"
                className="mb-2.5 block text-secondary-GRAY"
              >
                Referral Phone *
              </label>
              <input
                type="tel"
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) =>
                  setFormData({ ...formData, contactPhone: e.target.value })
                }
                placeholder="+123-456-7890"
                className="w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
              {errors.contactPhone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.contactPhone}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="contactEmail"
                className="mb-2.5 block text-secondary-GRAY"
              >
                Referral Email *
              </label>
              <input
                type="email"
                id="contactEmail"
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
                placeholder="Enter referral's email"
                className="w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
              {errors.contactEmail && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.contactEmail}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="companyName"
                className="mb-2.5 block text-secondary-GRAY"
              >
                Company Name/Domain *
              </label>
              <input
                type="text"
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                placeholder="Enter company name or domain"
                className="w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.companyName}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="flex items-center text-secondary-GRAY">
                <input
                  type="checkbox"
                  checked={formData.runsAds}
                  onChange={(e) =>
                    setFormData({ ...formData, runsAds: e.target.checked })
                  }
                  className="mr-2 h-4 w-4 cursor-pointer"
                />
                This business currently runs ads
              </label>
            </div>

            <div className="mb-6">
              <label
                htmlFor="otherInfo"
                className="mb-2.5 block text-secondary-GRAY"
              >
                Other Information
              </label>
              <textarea
                id="otherInfo"
                value={formData.otherInfo}
                onChange={(e) =>
                  setFormData({ ...formData, otherInfo: e.target.value })
                }
                placeholder="Any additional information about the referral"
                rows={4}
                className="w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
            </div>

            <div className="mb-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="hover:shadow-signUp flex w-full items-center justify-center rounded-md bg-secondary-GRAY px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-success-500  disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Referral"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
