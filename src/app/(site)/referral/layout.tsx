import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Earn 10% Referring Businesses to Our 24/7 AI Receptionist | SetInbound",
  description:
    "Refer appointment-based businesses to SetInbound and earn 10% of their upfront payment if they become a client. Help them capture more leads 24/7 while earning passive income.",
  openGraph: {
    title:
      "Earn 10% Referring Businesses to Our 24/7 AI Receptionist | SetInbound",
    description:
      "Know a business missing calls? Earn 10% for helping them with SetInbound's 24/7 AI receptionist.",
    url: "https://setinbound.com/referral",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Earn 10% Referring Businesses to Our 24/7 AI Receptionist | SetInbound",
    description:
      "Know a business missing calls? Earn 10% for helping them with SetInbound's 24/7 AI receptionist.",
  },
  other: {
    "json-ld": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProgramMembership",
      name: "SetInbound Referral Program",
      url: "https://setinbound.com/referral",
      description:
        "Earn 10% of the upfront payment from any business you refer that becomes a SetInbound client, helping them answer leads 24/7 with an AI receptionist.",
      programName: "SetInbound Referral Program",
      membershipPointsEarned: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: "10",
      },
      termsOfService: "https://setinbound.com/terms", // add this page if you wish
      membershipNumber: "automatic-on-acceptance",
      areaServed: {
        "@type": "Place",
        name: "United States",
      },
      provider: {
        "@type": "Organization",
        name: "SetInbound",
        url: "https://setinbound.com",
      },
    }),
  },
};

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
