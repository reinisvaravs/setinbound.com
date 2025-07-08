import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import ClientPreLoader from "@/components/Common/ClientPreLoader";
import { Poppins } from "next/font/google";
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100", // thin (not used)
    "200", // extralight (not used)
    "300", // light
    "400", // normal (not used)
    "500", // medium
    "600", // semibold
    "700", // bold
    "800", // extrabold
    "900", // black (not used)
  ],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://setinbound.com"),
  title: {
    default: "SetInbound.com | AI Receptionists for Dental Clinics",
    template: "%s | AI Receptionists for Dental Clinics | SetInbound.com",
  },
  description:
    "GET A FREE TRIAL OF AN AI RECEPTIONIST - For your dental clinic, in 3 steps and just 2 days, you'll have your own AI Receptionist that you can use for Free until we reach or exceed our promise.",
  keywords: [
    "AI receptionist",
    "virtual receptionist",
    "dental clinic receptionist",
    "appointment scheduling",
    "24/7 answering service",
    "inbound lead conversion",
    "business automation",
    "sales qualification",
    "missed call recovery",
    "California AI receptionist",
    "US virtual receptionist",
    "Vāravi",
    "SIA Vāravi",
    "reinisvaravs.com",
    "dental practice automation",
    "dental office receptionist",
  ],
  authors: [
    { name: "SetInbound", url: "https://setinbound.com" },
    { name: "Reinis Varavs", url: "https://reinisvaravs.com" },
    { name: "Henry Varavs", url: "https://instagram.com/varavshenrijs" },
  ],

  publisher: "SetInbound",
  openGraph: {
    type: "website",
    url: "https://setinbound.com",
    title: "SetInbound.com | AI Receptionists for Dental Clinics",
    description:
      "GET A FREE TRIAL OF AN AI RECEPTIONIST - For your dental clinic, in 3 steps and just 2 days, you'll have your own AI Receptionist that you can use for Free until we reach or exceed our promise.",
    siteName: "SetInbound",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "SetInbound.com | AI Receptionists for Dental Clinics",
    description:
      "GET A FREE TRIAL OF AN AI RECEPTIONIST - For your dental clinic, in 3 steps and just 2 days, you'll have your own AI Receptionist that you can use for Free until we reach or exceed our promise.",
    creator: "@setinbound.com",
    site: "@setinbound.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=4", sizes: "any" },
      { url: "/favicon.svg?v=4", type: "image/svg+xml" },
      { url: "/favicon-96x96.png?v=4", sizes: "96x96", type: "image/png" },
      {
        url: "/web-app-manifest-192x192.png?v=4",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/web-app-manifest-512x512.png?v=4",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico?v=4",
    apple: [
      { url: "/apple-touch-icon.png?v=4", sizes: "180x180", type: "image/png" },
    ],
    other: [{ rel: "manifest", url: "/site.webmanifest?v=4" }],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      notranslate: true,
    },
  },
  other: {
    google: "notranslate",
    "Content-Language": "en-US",
    translate: "no",
    "theme-color": "#7F3DF4",
    "json-ld": JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["WebApplication", "LocalBusiness"],
      name: "SetInbound",
      url: "https://setinbound.com",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "SetInbound provides AI receptionists for dental clinics. Get a free trial in 3 steps and just 2 days. Your AI Receptionist is free until we reach or exceed our promise.",
      serviceArea: {
        "@type": "Place",
        name: "California, USA",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
      potentialAction: [
        {
          "@type": "CommunicateAction",
          name: "Test Call AI Receptionist",
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
        {
          "@type": "ReserveAction",
          name: "Book Appointment",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://setinbound.com",
            actionPlatform: "https://schema.org/DesktopWebPlatform",
          },
        },
      ],
      author: {
        "@type": "Organization",
        name: "SetInbound",
        url: "https://setinbound.com",
      },
      creator: [
        {
          "@type": "Person",
          name: "Reinis Varavs",
          url: "https://reinisvaravs.com",
        },
        {
          "@type": "Person",
          name: "Henry Varavs",
          url: "https://instagram.com/varavshenrijs",
        },
      ],
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning={true}
      className={`!scroll-smooth ${poppins.className}`}
      lang="en"
    >
      <head>
        <link rel="icon" href="/favicon.ico?v=4" sizes="any" />
        <link rel="icon" href="/favicon.svg?v=4" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=4" />
        <link rel="manifest" href="/site.webmanifest?v=4" />
      </head>
      <body>
        <ClientPreLoader>
          <Header />
          {children}
          <Footer />
          <Toaster position="top-center" />
        </ClientPreLoader>
      </body>
    </html>
  );
}
