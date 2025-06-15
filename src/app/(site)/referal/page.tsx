"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ReferalPage() {
  const [formData, setFormData] = useState({
    yourName: "",
    companyName: "",
    yourContact: "",
    companyContact: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    toast.success("Thank you for your referral! We&apos;ll be in touch soon.");
    setFormData({
      yourName: "",
      companyName: "",
      yourContact: "",
      companyContact: "",
    });
  };

  return (
    <section className="relative z-10 py-[120px]">
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
            <div className="mb-8">
              <label
                htmlFor="yourName"
                className="mb-3 block text-sm font-medium text-dark dark:text-white"
              >
                Your Name
              </label>
              <input
                type="text"
                id="yourName"
                value={formData.yourName}
                onChange={(e) =>
                  setFormData({ ...formData, yourName: e.target.value })
                }
                required
                placeholder="Enter your full name"
                className="shadow-one dark:shadow-signUp w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="companyName"
                className="mb-3 block text-sm font-medium text-dark dark:text-white"
              >
                Company You&apos;re Referencing
              </label>
              <input
                type="text"
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                required
                placeholder="Enter the company's full name"
                className="shadow-one dark:shadow-signUp w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="yourContact"
                className="mb-3 block text-sm font-medium text-dark dark:text-white"
              >
                Your Contact Details
              </label>
              <input
                type="text"
                id="yourContact"
                value={formData.yourContact}
                onChange={(e) =>
                  setFormData({ ...formData, yourContact: e.target.value })
                }
                required
                placeholder="Enter your email or phone number"
                className="shadow-one dark:shadow-signUp w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="companyContact"
                className="mb-3 block text-sm font-medium text-dark dark:text-white"
              >
                Company&apos;s Contact Details
              </label>
              <input
                type="text"
                id="companyContact"
                value={formData.companyContact}
                onChange={(e) =>
                  setFormData({ ...formData, companyContact: e.target.value })
                }
                required
                placeholder="Enter company's email or phone number"
                className="shadow-one dark:shadow-signUp w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
              />
            </div>

            <div className="mb-8">
              <p className="text-sm text-body-color dark:text-dark-6">
                By submitting you&apos;re agreeing to our terms and service
              </p>
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="hover:shadow-signUp flex w-full items-center justify-center rounded-md bg-secondary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-60"
              >
                Submit Referral
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
