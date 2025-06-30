import SectionTitle from "../Common/SectionTitle";
import SingleFaq from "./SingleFaq";

const Faq = () => {
  return (
    <section className="relative z-20 overflow-hidden bg-primary-WHITE pb-16 pt-20 lg:pb-[70px] lg:pt-[120px]">
      <div className="container">
        <SectionTitle
          subtitle="FAQ"
          title="Any Questions? Answered"
          paragraph=""
          width="640px"
          center
        />
        <div className="-mx-4 mt-[60px] flex flex-row flex-wrap lg:mt-20 justify-center">
          <SingleFaq
            question="What is SetInbound?"
            answer="SetInbound provides AI-powered voice receptionists for appointment-based businesses, helping you answer calls, qualify leads, and book appointments automatically 24/7."
          />
          <SingleFaq
            question="How does the AI receptionist work?"
            answer="Our AI agent answers inbound or outbound calls, books or reschedules appointments, handles FAQs, and routes qualified leads to you. It integrates with your CRM or calendar and continuously learns from new conversations."
          />
          <SingleFaq
            question="Which industries do you serve?"
            answer="We work with appointment-heavy industries including dentists, medspas, salons, personal trainers, real estate agents, coaches, insurance, automotive services, clinics, B2B SaaS demos, and more."
          />
          <SingleFaq
            question="Do you offer a free trial?"
            answer="Yes - you get a 3-day free trial after placing a fully refundable €500 soft deposit. Cancel in writing within 72 hours for a full refund, or continue to apply the deposit to your service fee."
          />
          <SingleFaq
            question="What’s the pricing structure?"
            answer="Pricing is customized based on your business needs, call volume, and integrations. After the trial, you’ll receive a transparent quote with no hidden fees. Contact us for details."
          />
          <SingleFaq
            question="How long does setup take?"
            answer="A standard AI voice agent can be deployed in 1 week, with advanced workflows and customization usually taking 2-4 weeks."
          />
          <SingleFaq
            question="Which languages and accents are available?"
            answer="Our AI can handle over 30 languages, including English, Spanish, French, German, Portuguese, Chinese, Japanese, Russian, Hindi, and more. Regional accents are available on request."
          />
          <SingleFaq
            question="What appointment tools do you integrate with?"
            answer="We connect with popular tools like Cal.com, Google Calendar, GoHighLevel, Pipedrive, and can push data to spreadsheets or CRMs of your choice."
          />
          <SingleFaq
            question="Can I customize the conversation script?"
            answer="Yes. We help you build a custom conversation flow, including branching logic for objections or FAQs. Clients own the scripts after project delivery."
          />
          <SingleFaq
            question="Is the service available 24/7?"
            answer="Yes, the AI receptionist is designed to handle calls around the clock, even after hours or on weekends."
          />
          <SingleFaq
            question="How do you ensure data security and compliance?"
            answer="We comply with GDPR and other privacy laws, acting as a data processor on behalf of your business. We also offer Data Processing Agreements (DPAs) on request and store data securely in your designated systems."
          />
          <SingleFaq
            question="What happens if the system goes down?"
            answer="While we aim for high availability, occasional third-party outages may occur. We monitor systems closely and work to restore any interruptions as quickly as possible."
          />
        </div>
      </div>
    </section>
  );
};

export default Faq;
