import CallToAction from "@/components/CallToAction";
import Chatbot from "@/components/Common/Chatbot";
import ScrollUp from "@/components/Common/ScrollUp";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "SetInbound.com | Mākslīgā intelekta asistenti zobārstniecībām",
    template:
      "%s | Mākslīgā intelekta asistenti zobārstniecībām | SetInbound.com",
  },
  description:
    "IEGŪSTI BEZMAKSAS MĀKSLĪGĀ INTELEKTA ASISTENTA IZMĒĢINĀJUMU - Jūsu zobārstniecībai, tikai 3 soļi un 2 dienas, un Jums būs savs AI asistents, ko varēsiet izmantot bez maksas līdz sasniedzam vai pārsniedzam mūsu solījumu.",

  openGraph: {
    title: "SetInbound.com | Mākslīgā intelekta asistenti zobārstniecībām",
    description:
      "IEGŪSTI BEZMAKSAS MĀKSLĪGĀ INTELEKTA ASISTENTA IZMĒĢINĀJUMU - Jūsu zobārstniecībai, tikai 3 soļi un 2 dienas, un Jums būs savs AI asistents, ko varēsiet izmantot bez maksas līdz sasniedzam vai pārsniedzam mūsu solījumu.",
    locale: "lv_LV",
  },
  twitter: {
    title: "SetInbound.com | Mākslīgā intelekta asistenti zobārstniecībām",
    description:
      "IEGŪSTI BEZMAKSAS MĀKSLĪGĀ INTELEKTA ASISTENTA IZMĒĢINĀJUMU - Jūsu zobārstniecībai, tikai 3 soļi un 2 dienas, un Jums būs savs AI asistents, ko varēsiet izmantot bez maksas līdz sasniedzam vai pārsniedzam mūsu solījumu.",
  },
};

export default function Home() {
  return (
    <main>
      <ScrollUp />
      <Hero />
      <Features />
      <CallToAction />
      <Faq />
      <Chatbot />
    </main>
  );
}
