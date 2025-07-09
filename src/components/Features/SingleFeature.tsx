import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/4">
      <div className="wow fadeInUp group mb-12" data-wow-delay=".15s">
        <div className="relative z-10 mb-4 flex h-[70px] w-[70px] scale-75 items-center justify-center rounded-2xl bg-accent-BLUE md:mb-8 md:scale-100">
          <span className="absolute left-0 top-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-accent-BLUE bg-opacity-20 duration-300"></span>
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold text-secondary-GRAY">{title}</h3>
        <p className="mb-8 text-secondary-LIGHT_GRAY lg:mb-11">{paragraph}</p>
      </div>
    </div>
  );
};

export default SingleFeature;
