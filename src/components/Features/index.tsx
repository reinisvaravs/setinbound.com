import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <section className="bg-primary-WHITE pb-8 pt-5 lg:pb-[70px]">
      <div
        className="hero-content wow fadeInUp mx-auto -mt-14 w-[80vw] max-w-[780px] border-b border-secondary-GRAY text-center sm:w-[70vw] md:w-[60vw] lg:w-[60vw] xl:w-[50vw]"
        data-wow-delay=".2s"
      >
        <h1 className="mb-4 mt-16 text-2xl font-extrabold uppercase leading-tight text-secondary-GRAY sm:mb-6 sm:mt-20 sm:text-xl md:text-2xl lg:mb-6 lg:mt-20 lg:leading-snug xl:text-3xl xl:leading-snug 2xl:text-4xl 2xl:leading-[1.2]">
          GET A FREE{" "}
          <span className="whitespace-nowrap text-accent-BLUE">
            AI RECEPTIONIST
          </span>
        </h1>
        <p className="mx-auto mb-6 max-w-[450px] px-1 font-light leading-relaxed text-secondary-LIGHT_GRAY sm:-mt-3 sm:mb-9 sm:max-w-[500px] sm:text-base sm:leading-[1.44] md:max-w-[600px] md:text-base md:leading-[1.44] lg:-mt-3 lg:mb-9 lg:max-w-[600px] lg:text-base lg:leading-[1.44]">
          In 3 STEPS and just 2 days, you&#39;ll have your own AI receptionist -
          that you can use for Free until we reach X goal. If no results = no
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
