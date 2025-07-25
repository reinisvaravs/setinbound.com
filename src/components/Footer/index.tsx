import Image from "next/image";
import Link from "next/link";
import EmailBtn from "../Common/EmailBtn";

const Footer = () => {
  return (
    <footer
      className="wow fadeInUp relative z-10 bg-accent-BLUE pb-6 pt-20 lg:pt-[80px]"
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
                  className="-ml-3 h-auto w-full max-w-full"
                  priority
                />
              </Link>
              <p className="mb-8 max-w-[270px] text-base text-primary-WHITE">
                Transforming businesses through intelligent automation and
                cutting-edge AI solutions.
              </p>
              <div className="-mx-3 flex items-center">
                {/* https://icons8.com/icons/set/social-media--style-fluency */}
                <Link
                  aria-label="social link"
                  href="https://instagram.com/varavshenrijs"
                  className="px-1"
                  target="_blank"
                >
                  <Image
                    src="/images/social_media/instagram.svg"
                    alt="logo"
                    width={1}
                    height={1}
                    className="ease h-auto w-[50px] max-w-full rounded-full p-2 transition-all duration-300 hover:bg-secondary-GRAY"
                    priority
                  />
                </Link>
                {/* <Link
                  aria-label="social link"
                  href="https://youtube.com/@varavshenrijs"
                  className="px-1"
                  target="_blank"
                >
                  <Image
                    src="/images/social_media/youtube.svg"
                    alt="logo"
                    width={1}
                    height={1}
                    className="ease h-auto w-[50px] max-w-full rounded-full p-2 transition-all duration-300 hover:bg-secondary-GRAY"
                    priority
                  />
                </Link> */}
                <Link
                  aria-label="social link"
                  href="https://x.com/varavshenrijs"
                  className="px-1"
                  target="_blank"
                >
                  <Image
                    src="/images/social_media/x.svg"
                    alt="logo"
                    width={1}
                    height={1}
                    className="ease h-auto w-[50px] max-w-full rounded-full p-2 transition-all duration-300 hover:bg-secondary-GRAY"
                    priority
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-1 pl-2">
            <div className="mb-5 flex flex-row flex-nowrap items-center justify-center">
              <EmailBtn />
            </div>
            <div className="flex flex-row flex-nowrap items-center justify-center">
              <Link
                aria-label="privacy policy"
                href="/privacy-policy"
                className="ease rounded-md px-3 text-primary-WHITE transition-all duration-300 hover:bg-secondary-GRAY"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="flex flex-row flex-nowrap items-center justify-center">
              <Link
                aria-label="privacy policy"
                href="/terms"
                className="ease rounded-md px-3 text-primary-WHITE transition-all duration-300 hover:bg-secondary-GRAY"
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
