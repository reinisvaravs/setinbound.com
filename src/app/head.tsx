import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://lintraai.com"),
  title: {
    default: "Lintra AI - AI Voice Agents for Solar Sales",
    template: "%s | Lintra AI",
  },
  description:
    "Transform your solar sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your solar business while reducing operational costs.",
  keywords: [
    "AI voice agents",
    "solar sales",
    "lead qualification",
    "appointment scheduling",
    "customer education",
    "solar business automation",
    "AI automation",
    "solar industry",
    "sales automation",
  ],
  authors: [
    { name: "Lintra AI", url: "https://lintraai.com" },
    { name: "Reinis Varavs", url: "https://lintraai.com" },
    { name: "Henry Varavs", url: "https://lintraai.com" },
  ],
  creator: "Lintra AI",
  publisher: "Lintra AI",
  openGraph: {
    type: "website",
    url: "https://lintraai.com",
    title: "Lintra AI - AI Voice Agents for Solar Sales",
    description:
      "Transform your solar sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your solar business while reducing operational costs.",
    siteName: "Lintra AI",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Lintra AI - AI Voice Agents for Solar Sales",
    description:
      "Transform your solar sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your solar business while reducing operational costs.",
    creator: "@lintraai",
    site: "@lintraai",
  },
  icons: {
    icon: [{ url: "/images/logo/favicon.png" }],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "none",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "none",
      "max-snippet": -1,
      "max-video-preview": -1,
      notranslate: true,
    },
  },
  other: {
    google: "notranslate",
    "Content-Language": "en-US",
    translate: "no",
    "json-ld": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Lintra AI",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Transform your solar sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7.",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
      potentialAction: [
        {
          "@type": "CommunicateAction",
          name: "Test Call AI Voice Agent",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://lintraai.com",
            actionPlatform: "https://schema.org/DesktopWebPlatform",
          },
        },
        {
          "@type": "ScheduleAction",
          name: "Schedule a Meeting",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://lintraai.com",
            actionPlatform: "https://schema.org/DesktopWebPlatform",
          },
        },
      ],
      author: {
        "@type": "Organization",
        name: "Lintra AI",
        url: "https://lintraai.com",
      },
      creator: [
        {
          "@type": "Person",
          name: "Reinis Varavs",
          url: "https://lintraai.com",
        },
        {
          "@type": "Person",
          name: "Henry Varavs",
          url: "https://lintraai.com",
        },
      ],
    }),
  },
};
