import { Metadata } from "next";
import LegalPage from "@/components/Common/LegalPage";
import TermsDocument from "./TermsDocument";

export const metadata: Metadata = {
  title: "Terms & Conditions | Setinbound.com",
  description: "Terms & Conditions | Setinbound.com",
};

export default function Terms() {
  return (
    <LegalPage title="Terms & Conditions">
      <TermsDocument />
    </LegalPage>
  );
}
