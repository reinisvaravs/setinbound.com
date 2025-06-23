import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <section className="bg-primary-WHITE pb-8 pt-5 lg:pb-[70px]">
      <div
        className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center -mt-14 border-b border-secondary-GRAY"
        data-wow-delay=".2s"
      >
        <h1 className="text-secondary-GRAY mb-6 mt-20 text-2xl font-extrabold uppercase leading-snug sm:text-3xl sm:leading-snug lg:text-4xl lg:leading-[1.2]">
          GET A FREE AI RECEPTIONIST in 3 STEPS
        </h1>
        <p className="text-secondary-LIGHT_GRAY mx-auto mb-9 max-w-[600px] text-base font-light sm:text-lg sm:leading-[1.44] -mt-3">
          Transform your solar sales with AI-powered voice agents that qualify
          leads, schedule appointments, and educate customers 24/7.
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
