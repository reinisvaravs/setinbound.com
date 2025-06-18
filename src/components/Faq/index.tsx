import SectionTitle from "../Common/SectionTitle";
import SingleFaq from "./SingleFaq";

const Faq = () => {
  return (
    <section className="bg-primary-WHITE relative z-20 overflow-hidden pb-8 pt-20 lg:pb-[50px] lg:pt-[120px]">
      <div className="container">
        <SectionTitle
          subtitle="FAQ"
          title="Any Questions? Answered"
          paragraph=""
          width="640px"
          center
        />

        <div className="-mx-4 mt-[60px] flex flex-wrap lg:mt-20">
          <div className="w-full px-4 lg:w-1/2">
            <SingleFaq
              question="What industries can benefit from AI voice agents?"
              answer="AI voice agents are particularly effective in industries with high call volumes such as sales, customer service, healthcare scheduling, real estate, and financial services. They excel in scenarios requiring consistent, round-the-clock phone support and lead qualification."
            />
            <SingleFaq
              question="How long does it take to set up an AI voice agent?"
              answer="Typically, we can deploy a basic AI voice agent within 1-2 weeks. Full implementation, including custom voice training, specific workflow integration, and advanced conversation flows, usually takes 2-4 weeks. We ensure minimal disruption to your existing operations during setup."
            />
            <SingleFaq
              question="How natural do the AI voice agents sound?"
              answer="Our AI voice agents use advanced natural language processing and neural voice technology to create remarkably human-like conversations. They can understand context, respond naturally to interruptions, and adapt their tone appropriately, making interactions smooth and professional."
            />
          </div>

          <div className="w-full px-4 lg:w-1/2">
            <SingleFaq
              question="How do you ensure call quality and accuracy?"
              answer="We maintain high standards through continuous monitoring and optimization. Each AI voice agent undergoes rigorous testing, regular performance reviews, and automatic updates. We also provide detailed analytics and call transcripts for quality assurance."
            />
            <SingleFaq
              question="Can AI voice agents integrate with existing phone system?"
              answer="Yes, our AI voice agents integrate seamlessly with most modern phone systems, CRM platforms, and business tools. We support VoIP, traditional phone lines, and digital communication platforms, ensuring smooth integration with your existing infrastructure."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
