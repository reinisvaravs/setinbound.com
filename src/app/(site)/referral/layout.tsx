import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral Program - Setinbound.com",
  description:
    "Refer businesses to Setinbound.com and earn rewards. Help us grow our network while earning for successful referrals.",
  openGraph: {
    title: "Referral Program - Setinbound.com",
    description:
      "Refer businesses to Setinbound.com and earn rewards. Help us grow our network while earning for successful referrals.",
    url: "https://setinbound.com/referral",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Referral Program - Setinbound.com",
    description:
      "Refer businesses to Setinbound.com and earn rewards. Help us grow our network while earning for successful referrals.",
  },
};

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
