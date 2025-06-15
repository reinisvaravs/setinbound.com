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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://sheetdb.io/api/v1/bhxoxdwcztjdo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              referrerName: formData.referrerName,
              referrerPhone: formData.referrerPhone,
              referrerEmail: formData.referrerEmail,
              hasNotifiedReferral: formData.hasNotifiedReferral ? "Yes" : "No",
              contactName: formData.contactName,
              contactPhone: formData.contactPhone,
              contactEmail: formData.contactEmail,
              companyName: formData.companyName,
              runsAds: formData.runsAds ? "Yes" : "No",
              otherInfo: formData.otherInfo,
              timestamp: new Date().toISOString(),
            },
          ],
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
            {/* Referrer's Information Section */}
            <div className="mb-12">
              <h3 className="mb-6 text-xl font-semibold text-dark dark:text-white">
                Referrer&apos;s Information
              </h3>

              <div className="mb-8">
                <label
                  htmlFor="referrerName"
                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="referrerName"
                  value={formData.referrerName}
                  onChange={(e) =>
                    setFormData({ ...formData, referrerName: e.target.value })
                  }
                  required
                  placeholder="Enter your full name"
                  className="shadow-one dark:shadow-signUp w-full rounded-md border border-transparent px-6 py-3 text-base text-white placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
                />
              </div>

              <div className="mb-8">
                <label
                  htmlFor="referrerPhone"
                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="referrerPhone"
                  value={formData.referrerPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, referrerPhone: e.target.value })
                  }
                  required
                  placeholder="Enter your phone number"
                  className="shadow-one dark:shadow-signUp w-full rounded-md border border-transparent px-6 py-3 text-base text-white placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
                />
              </div>

              <div className="mb-8">
                <label
                  htmlFor="referrerEmail"
                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="referrerEmail"
                  value={formData.referrerEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, referrerEmail: e.target.value })
                  }
                  required
                  placeholder="Enter your email address"
                  className="shadow-one dark:shadow-signUp w-full rounded-md border border-transparent px-6 py-3 text-base text-white placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
                />
              </div>

              <div className="mb-8">
                <label className="flex items-center text-sm font-medium text-dark dark:text-white">
                  <input
                    type="checkbox"
                    checked={formData.hasNotifiedReferral}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hasNotifiedReferral: e.target.checked,
                      })
                    }
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  Have you let this person know you&apos;re referring them to
                  us?
                </label>
              </div>
            </div>

            {/* Referred Business Information Section */}
            <div className="mb-12">
              <h3 className="mb-6 text-xl font-semibold text-dark dark:text-white">
                Referred Business Information
              </h3>

              <div className="mb-8">
                <label
                  htmlFor="contactName"
                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                >
                  Person&apos;s Full Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) =>
                    setFormData({ ...formData, contactName: e.target.value })
                  }
                  required
                  placeholder="Enter the contact person's full name"
                  className="shadow-one dark:shadow-signUp w-full rounded-md border border-transparent px-6 py-3 text-base text-white placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
                />
              </div>

              <div className="mb-8">
                <label
                  htmlFor="contactPhone"
                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPhone: e.target.value })
                  }
                  required
                  placeholder="Enter their phone number"
                  className="shadow-one dark:shadow-signUp w-full rounded-md border border-transparent px-6 py-3 text-base text-white placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
                />
              </div>

              <div className="mb-8">
                <label
                  htmlFor="contactEmail"
                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, contactEmail: e.target.value })
                  }
                  required
                  placeholder="Enter their email address"
                  className="shadow-one dark:shadow-signUp w-full rounded-md border border-transparent px-6 py-3 text-base text-white placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
                />
              </div>

              <div className="mb-8">
                <label
                  htmlFor="companyName"
                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                >
                  Company Name / Domain
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  required
                  placeholder="Enter company name or domain"
                  className="shadow-one dark:shadow-signUp w-full rounded-md border border-transparent px-6 py-3 text-base text-white placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
                />
              </div>

              <div className="mb-8">
                <label className="flex items-center text-sm font-medium text-dark dark:text-white">
                  <input
                    type="checkbox"
                    checked={formData.runsAds}
                    onChange={(e) =>
                      setFormData({ ...formData, runsAds: e.target.checked })
                    }
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  Does this company run ads?
                </label>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="otherInfo"
                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                >
                  Other Information
                </label>
                <textarea
                  id="otherInfo"
                  value={formData.otherInfo}
                  onChange={(e) =>
                    setFormData({ ...formData, otherInfo: e.target.value })
                  }
                  placeholder="Enter any additional information about the company"
                  className="shadow-one dark:shadow-signUp min-h-[100px] w-full rounded-md border border-transparent px-6 py-3 text-base text-white placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
                />
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm text-body-color dark:text-dark-6">
                By submitting you&apos;re agreeing to our terms and service
              </p>
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
