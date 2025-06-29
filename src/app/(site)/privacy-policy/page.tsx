import { Metadata } from "next";
import LegalPage from "@/components/Common/LegalPage";
import PrivacyPolicyDocument from "./PrivacyPolicyDocument";

export const metadata: Metadata = {
  title: "Privacy Policy | Setinbound.com",
  description: "Privacy Policy | Setinbound.com",
};

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy">
      <PrivacyPolicyDocument />
    </LegalPage>
  );
}
