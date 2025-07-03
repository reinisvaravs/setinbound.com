import CallAgentButton from "../Common/CallAgentButton";

const CallToAction = () => {
  return (
    <section
      id="call-section"
      className="relative z-10 overflow-hidden bg-primary-WHITE_DARK py-20 lg:py-[115px]"
    >
      <div className="container mx-auto">
        <div className="relative overflow-hidden">
          <div className="-mx-4 flex flex-wrap items-stretch">
            <div className="w-full px-4">
              <div className="mx-auto text-center">
                <h2 className="mb-2.5 text-3xl font-bold text-secondary-GRAY md:text-[38px] md:leading-[1.44]">
                  Experience Our Demo{" "}
                  <span className="whitespace-nowrap">AI Receptionist</span>
                </h2>
                <p className="mx-auto mb-6 max-w-[515px] text-base leading-[1.5] text-secondary-LIGHT_GRAY">
                  Click below to call our AI Receptionist directly
                </p>
                <div className="my-6 flex items-center justify-center">
                  <CallAgentButton>Call Agent</CallAgentButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
