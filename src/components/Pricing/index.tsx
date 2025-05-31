"use client";
import SectionTitle from "../Common/SectionTitle";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            // subtitle="Pricing Table"
            title="Our Pricing"
            paragraph="Pricing depends on the features you need. Contacts us to get a custom quote."
            center
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
