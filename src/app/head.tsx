import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://lintraai.com"),
  title: "LintraAI - AI Voice Agents for Solar Sales",
  description:
    "Transform your solar sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your solar business while reducing operational costs.",
  keywords:
    "AI voice agents, solar sales, lead qualification, appointment scheduling, customer education, solar business automation",
  authors: [{ name: "LintraAI" }],
  creator: "LintraAI",
  publisher: "LintraAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "https://lintraai.com",
    title: "LintraAI - AI Voice Agents for Solar Sales",
    description:
      "Transform your solar sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your solar business while reducing operational costs.",
    images: [
      {
        url: "/images/hero/hero-image.png",
        width: 1200,
        height: 630,
        alt: "LintraAI - AI Voice Agents for Solar Sales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LintraAI - AI Voice Agents for Solar Sales",
    description:
      "Transform your solar sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your solar business while reducing operational costs.",
    images: ["/images/hero/hero-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Add your verification tokens here
    // google: 'your-google-site-verification',
    // yandex: 'your-yandex-verification',
    // yahoo: 'your-yahoo-verification',
  },
};
