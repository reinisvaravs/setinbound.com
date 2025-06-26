import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://setinbound.com"),
  title: {
    default: "Setinbound.com - AI Voice Agents for Sales",
    template: "%s | Setinbound.com",
  },
  description:
    "Transform your sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your business while reducing operational costs.",
  keywords: [
    "AI voice agents",
    "lead qualification",
    "appointment scheduling",
    "customer education",
    "business automation",
    "AI automation",
    "sales automation",
  ],
  authors: [
    { name: "Setinbound.com", url: "https://setinbound.com" },
    { name: "Reinis Varavs", url: "https://setinbound.com" },
    { name: "Henry Varavs", url: "https://setinbound.com" },
  ],
  creator: "Setinbound.com",
  publisher: "Setinbound.com",
  openGraph: {
    type: "website",
    url: "https://setinbound.com",
    title: "Setinbound.com - AI Voice Agents for Sales",
    description:
      "Transform your sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your business while reducing operational costs.",
    siteName: "Setinbound.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Setinbound.com - AI Voice Agents for Sales",
    description:
      "Transform your sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your business while reducing operational costs.",
    creator: "@setinbound.com",
    site: "@setinbound.com",
  },
  icons: {
    icon: "/favicon.png",
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
      name: "Setinbound.com",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Transform your sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7.",
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
            urlTemplate: "https://setinbound.com",
            actionPlatform: "https://schema.org/DesktopWebPlatform",
          },
        },
        {
          "@type": "ScheduleAction",
          name: "Schedule a Meeting",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://setinbound.com",
            actionPlatform: "https://schema.org/DesktopWebPlatform",
          },
        },
      ],
      author: {
        "@type": "Organization",
        name: "Setinbound.com",
        url: "https://setinbound.com",
      },
      creator: [
        {
          "@type": "Person",
          name: "Reinis Varavs",
          url: "https://setinbound.com",
        },
        {
          "@type": "Person",
          name: "Henry Varavs",
          url: "https://setinbound.com",
        },
      ],
    }),
  },
};
