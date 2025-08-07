// import CallToAction from "@/components/CallToAction";
// import Faq from "@/components/Faq";
// import Features from "@/components/Features";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setinbound.com - AI Voice Agents",
};

export default function Home() {
  return (
    <main>
      <ScrollUp />
      <Hero />
      {/* <Features />
      <CallToAction />
      <Faq /> */}
    </main>
  );
}
