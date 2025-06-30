import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import ClientPreLoader from "@/components/Common/ClientPreLoader";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: [
    // "100", // thin (not used)
    // "200", // extralight (not used)
    "300", // light
    // "400", // normal (not used)
    "500", // medium
    "600", // semibold
    "700", // bold
    "800", // extrabold
    // "900", // black (not used)
  ],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning={true}
      className={`!scroll-smooth ${inter.className}`}
      lang="en"
    >
      <head></head>
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
