import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import ClientPreLoader from "@/components/Common/ClientPreLoader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
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
