import Image from "next/image";
import Link from "next/link";
import EmailBtn from "../Common/EmailBtn";

const Footer = () => {
  return (
    <footer
      className="wow fadeInUp relative z-10 bg-accent-BLUE pb-10 pt-20 lg:pt-[100px]"
      data-wow-delay=".15s"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-3/12">
            <div className="mb-10 w-full">
              <Link href="/" className="mb-6 inline-block max-w-[210px]">
                <Image
                  src="/images/logo/logo-white-row.webp"
                  alt="logo"
                  width={224}
                  height={38}
                  className="h-auto w-full max-w-full -ml-3"
                  priority
                />
              </Link>
              <p className="mb-8 max-w-[270px] text-base text-primary-WHITE">
                Transforming businesses through intelligent automation and
                cutting-edge AI solutions.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-1 pl-9">
            <div className="mb-5 flex flex-row flex-nowrap items-center justify-center">
              <EmailBtn />
            </div>
            <div className="flex flex-row flex-nowrap items-center justify-center">
              <Link
                aria-label="privacy policy"
                href="/privacy-policy"
                className="px-3 text-primary-WHITE"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="flex flex-row flex-nowrap items-center justify-center">
              <Link
                aria-label="privacy policy"
                href="/terms"
                className="px-3 text-primary-WHITE"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
