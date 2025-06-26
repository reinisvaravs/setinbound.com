import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <section className="bg-primary-WHITE pb-8 pt-5 lg:pb-[70px]">
      <div
        className="hero-content wow fadeInUp mx-auto -mt-14 max-w-[780px] border-b border-secondary-GRAY text-center"
        data-wow-delay=".2s"
      >
        <h1 className="mb-6 mt-20 text-2xl font-extrabold uppercase leading-snug text-secondary-GRAY sm:text-3xl sm:leading-snug lg:text-4xl lg:leading-[1.2]">
          GET A FREE AI RECEPTIONIST in 3 STEPS
        </h1>
        <p className="mx-auto -mt-3 mb-9 max-w-[600px] text-base font-light text-secondary-LIGHT_GRAY sm:text-lg sm:leading-[1.44]">
          In just 2 days, we&rsquo;ll set up your personalized AI receptionist -
          so you can try it until it starts making you money. No results = no
          cost.
        </p>
      </div>
      <div className="container">
        <div className="-mx-4 mt-12 flex flex-wrap justify-evenly lg:mt-20">
          {featuresData.map((feature, i) => (
            <SingleFeature key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
