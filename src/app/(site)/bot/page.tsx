import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import { Metadata } from "next";
import Chatbot from "@/components/Common/Chatbot";

export const metadata: Metadata = {
  title: "Setinbound.com - AI Voice Agents",
};

export default function Home() {
  return (
    <main>
      <ScrollUp />
      <Hero />
      <Chatbot />
    </main>
  );
}
