import { Feature } from "@/types/feature";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { LuPhoneCall } from "react-icons/lu";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <IoCalendarNumberOutline className="h-[60%] w-[60%] text-white" />,
    title: "Step 1 - Schedule a Call",
    paragraph:
      "Give our AI receptionist a quick spin - let it find the best times for us to chat. Or skip the call and book directly on our calendar.",
    btn: "Learn More",
    btnLink: "/#",
  },
  {
    id: 2,
    icon: <CgNotes className="h-[60%] w-[60%] text-white" />,
    title: "Step 2 - Onboard & Customize",
    paragraph:
      "Fill out a brief onboarding form and walk us through your business. We'll tailor your AI receptionist to match your style, operations, and goals.",
    btn: "Learn More",
    btnLink: "/#",
  },
  {
    id: 3,
    icon: <LuPhoneCall className="h-[60%] w-[60%] text-white" />,
    title: "Step 3 - Launch & Profit",
    paragraph:
      "Going live - start receiving calls, qualifying leads, and booking appointments. If it doesn't make you money, it costs you nothing.",
    btn: "Learn More",
    btnLink: "/#",
  },
];
export default featuresData;
