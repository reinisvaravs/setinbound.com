import SingleFaq from "./SingleFaq";

const Faq = () => {
  return (
    <section className="relative z-20 overflow-hidden bg-primary-WHITE pb-16 pt-20 lg:pb-[70px] lg:pt-[120px]">
      <div className="container">
        <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-secondary-GRAY md:text-4xl">
          FAQs
        </h2>
        <div className="mx-auto mt-[60px] flex max-w-[1100px] flex-row flex-wrap justify-center lg:mt-20">
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
            question="What's the pricing structure?"
            answer="Pricing is customized based on your business needs, call volume, and integrations. After the trial, you'll receive a transparent quote with no hidden fees. Contact us for details."
          />
          <SingleFaq
            question="Is the service available 24/7?"
            answer="Yes, the AI receptionist is designed to handle calls around the clock, even after hours or on weekends."
          />
          <SingleFaq
            question="How do you ensure data security and compliance?"
            answer="We comply with GDPR and other privacy laws, acting as a data processor on behalf of your business. We also offer Data Processing Agreements (DPAs) on request and store data securely in your designated systems."
          />
        </div>
      </div>
    </section>
  );
};

export default Faq;
