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
  },
  twitter: {
    card: "summary_large_image",
    title: "Referral Program - LINTRAAI.COM",
    description:
      "Refer businesses to LINTRAAI.COM and earn rewards. Help us grow our network while earning for successful referrals.",
  },
};

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
