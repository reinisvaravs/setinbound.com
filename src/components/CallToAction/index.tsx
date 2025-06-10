"use client";

import { useState } from "react";

const CallToAction = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <section
      id="call-section"
      className="relative z-10 overflow-hidden bg-primary py-20 lg:py-[115px]"
    >
      <div className="container mx-auto">
        <div className="relative overflow-hidden">
          <div className="-mx-4 flex flex-wrap items-stretch">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[570px] text-center">
                <h2 className="mb-2.5 text-3xl font-bold text-white md:text-[38px] md:leading-[1.44]">
                  <span>Experience Our AI Voice Agent</span>
                </h2>
                <p className="mx-auto mb-6 max-w-[515px] text-base leading-[1.5] text-white">
                  Enter your phone number to receive a call from our AI agent,
                  or click below to call us directly.
                </p>
                <div className="mt-4">
                  <input
                    type="tel"
                    id="clientNumber"
                    placeholder="Enter your phone number"
                    className="w-64 rounded-md border border-gray-300 bg-transparent px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <button
                    className="ml-2 mt-2 rounded-md bg-accent-light px-4 py-2 text-white shadow-1 transition duration-300 ease-in-out hover:bg-accent"
                    onClick={async () => {
                      if (phoneNumber) {
                        try {
                          const response = await fetch(
                            "https://api.retellai.com/v2/create-phone-call",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_RETELL_API_KEY}`,
                              },
                              body: JSON.stringify({
                                call_id: `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                                call_type: "phone_call",
                                agent_id: "agent_19823a553af7a5a0136510340b",
                                retell_llm_dynamic_variables: {},
                                call_status: "registered",
                                latency: {},
                                call_cost: {
                                  product_costs: [],
                                  total_duration_seconds: 0,
                                  total_duration_unit_price: 0,
                                  combined_cost: 0,
                                },
                                opt_out_sensitive_data_storage: false,
                                opt_in_signed_url: false,
                                from_number: "+12698955424",
                                to_number: phoneNumber,
                                direction: "outbound",
                              }),
                            },
                          );

                          if (!response.ok) {
                            throw new Error("Failed to initiate call");
                          }

                          await response.json();
                          alert("Call initiated successfully!");
                        } catch (error) {
                          console.error("Error making call:", error);
                          alert("Failed to initiate call. Please try again.");
                        }
                      } else {
                        window.location.href = "tel:+12698955424";
                      }
                    }}
                  >
                    {phoneNumber ? "Call Me" : "Call Agent"}
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
