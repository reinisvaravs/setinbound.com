import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral Program - LINTRAAI.COM",
  description:
    "Refer businesses to LINTRAAI.COM and earn rewards. Help us grow our network while earning for successful referrals.",
  openGraph: {
    title: "Referral Program - LINTRAAI.COM",
    description:
      "Refer businesses to LINTRAAI.COM and earn rewards. Help us grow our network while earning for successful referrals.",
    url: "https://lintraai.com/referal",
    type: "website",
    images: [
      {
        url: "/images/referral-og-image.jpg", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "LINTRAAI.COM Referral Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Referral Program - LINTRAAI.COM",
    description:
      "Refer businesses to LINTRAAI.COM and earn rewards. Help us grow our network while earning for successful referrals.",
    images: [
      "/images/referral-twitter-image.jpg", // Replace with your actual image URL
    ],
  },
};

("use client");

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
          "Referrer Phone": formData.referrerPhone.trim(),
          "Referrer Email": formData.referrerEmail.trim(),
          "Has Notified Referral": formData.hasNotifiedReferral ? "Yes" : "No",
          "Contact Name": formData.contactName.trim(),
          "Contact Phone": formData.contactPhone.trim(),
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
    <section className="relative z-10 bg-primary py-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mt-8 max-w-[570px] text-center">
              <h2 className="mb-2.5 text-3xl font-bold text-dark dark:text-white md:text-[30px] md:leading-[1.44]">
                Refer a Business and Earn 500-1500€
              </h2>
              <p className="mb-10 text-base text-body-color dark:text-dark-6">
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
                className="mb-2.5 block text-white dark:text-dark-6"
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
                className="w-full rounded-md border border-transparent bg-[#242B51] px-5 py-3 text-white focus:border-primary focus-visible:shadow-none dark:bg-dark dark:text-white"
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
                className="mb-2.5 block text-white dark:text-dark-6"
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
                className="w-full rounded-md border border-transparent bg-[#242B51] px-5 py-3 text-white focus:border-primary focus-visible:shadow-none dark:bg-dark dark:text-white"
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
                className="mb-2.5 block text-white dark:text-dark-6"
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
                className="w-full rounded-md border border-transparent bg-[#242B51] px-5 py-3 text-white focus:border-primary focus-visible:shadow-none dark:bg-dark dark:text-white"
              />
              {errors.referrerEmail && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.referrerEmail}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="flex items-center text-white dark:text-dark-6">
                <input
                  type="checkbox"
                  checked={formData.hasNotifiedReferral}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hasNotifiedReferral: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                I have notified the referral about this submission
              </label>
            </div>

            <div className="mb-6">
              <label
                htmlFor="contactName"
                className="mb-2.5 block text-white dark:text-dark-6"
              >
                Contact Person Name *
              </label>
              <input
                type="text"
                id="contactName"
                value={formData.contactName}
                onChange={(e) =>
                  setFormData({ ...formData, contactName: e.target.value })
                }
                placeholder="Enter contact person's name"
                className="w-full rounded-md border border-transparent bg-[#242B51] px-5 py-3 text-white focus:border-primary focus-visible:shadow-none dark:bg-dark dark:text-white"
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
                className="mb-2.5 block text-white dark:text-dark-6"
              >
                Contact Person Phone *
              </label>
              <input
                type="tel"
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) =>
                  setFormData({ ...formData, contactPhone: e.target.value })
                }
                placeholder="+123-456-7890"
                className="w-full rounded-md border border-transparent bg-[#242B51] px-5 py-3 text-white focus:border-primary focus-visible:shadow-none dark:bg-dark dark:text-white"
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
                className="mb-2.5 block text-white dark:text-dark-6"
              >
                Contact Person Email *
              </label>
              <input
                type="email"
                id="contactEmail"
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
                placeholder="Enter contact person's email"
                className="w-full rounded-md border border-transparent bg-[#242B51] px-5 py-3 text-white focus:border-primary focus-visible:shadow-none dark:bg-dark dark:text-white"
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
                className="mb-2.5 block text-white dark:text-dark-6"
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
                className="w-full rounded-md border border-transparent bg-[#242B51] px-5 py-3 text-white focus:border-primary focus-visible:shadow-none dark:bg-dark dark:text-white"
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.companyName}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="flex items-center text-white dark:text-dark-6">
                <input
                  type="checkbox"
                  checked={formData.runsAds}
                  onChange={(e) =>
                    setFormData({ ...formData, runsAds: e.target.checked })
                  }
                  className="mr-2"
                />
                The company currently runs ads
              </label>
            </div>

            <div className="mb-6">
              <label
                htmlFor="otherInfo"
                className="mb-2.5 block text-white dark:text-dark-6"
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
                className="w-full rounded-md border border-transparent bg-[#242B51] px-5 py-3 text-white focus:border-primary focus-visible:shadow-none dark:bg-dark dark:text-white"
              />
            </div>

            <div className="mb-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="hover:shadow-signUp flex w-full items-center justify-center rounded-md bg-secondary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-60 disabled:cursor-not-allowed disabled:opacity-50"
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
