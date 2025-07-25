import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Earn 10% referring a businesses to us | SetInbound.com",
  openGraph: {
    title: "Earn 10% referring a businesses to us | SetInbound.com",
    url: "https://setinbound.com/referral",
  },
  twitter: {
    title: "Earn 10% referring a businesses to us | SetInbound.com",
  },
  other: {
    "json-ld": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ReferralProgram",
      name: "SetInbound Referral Program",
      url: "https://setinbound.com/referral",
      programName: "SetInbound Referral Program",
      membershipPointsEarned: {
        "@type": "QuantitativeValue",
        value: "10",
        unitText: "PERCENT",
      },
      termsOfService: "https://setinbound.com/terms",
      startDate: "2025-07-01",
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
