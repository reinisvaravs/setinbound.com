"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ReferralPage() {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      toast.error("Please fill in all required fields.");
      // Let the browser show its validation UI as well
      form.reportValidity();
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
      toast.success("Thank you! We'll be in touch soon.");
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
            noValidate
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
                required
                className="mr-2 w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
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
                required
                className="w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
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
                required
                className="w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
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
                  required
                />
                I confirm I have the referral&#39;s permission to share their
                details.
              </label>
            </div>

            <div className="mb-6">
              <label
                htmlFor="contactName"
                className="mb-2.5 block text-secondary-GRAY"
              >
                Referral&#39;s Name *
              </label>
              <input
                type="text"
                id="contactName"
                value={formData.contactName}
                onChange={(e) =>
                  setFormData({ ...formData, contactName: e.target.value })
                }
                placeholder="Enter referral&#39;s name"
                required
                className="w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="contactPhone"
                className="mb-2.5 block text-secondary-GRAY"
              >
                Referral&#39;s Phone *
              </label>
              <input
                type="tel"
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) =>
                  setFormData({ ...formData, contactPhone: e.target.value })
                }
                placeholder="+123-456-7890"
                required
                className="w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="contactEmail"
                className="mb-2.5 block text-secondary-GRAY"
              >
                Referral&#39;s Email *
              </label>
              <input
                type="email"
                id="contactEmail"
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
                placeholder="Enter referral&#39;s email"
                required
                className="w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
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
                required
                className="w-full rounded-md border-2 border-gray-300 bg-primary-WHITE_DARK px-5 py-3 text-secondary-GRAY focus:outline-none focus:ring-0"
              />
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
                This business is actively running paid ads
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
              <p className="mx-auto max-w-md rounded-full bg-primary-WHITE_DARK/70 px-6 py-2 text-center text-xs font-medium text-secondary-GRAY/70 shadow-sm backdrop-blur-sm">
                By submitting you agree to our
                <a
                  href="/privacy-policy"
                  className="mx-1 inline-block text-accent-BLUE underline-offset-4 transition-all duration-200 hover:text-accent-RED hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                and
                <a
                  href="/terms-and-conditions"
                  className="mx-1 inline-block text-accent-BLUE underline-offset-4 transition-all duration-200 hover:text-accent-RED hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>
              </p>
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
