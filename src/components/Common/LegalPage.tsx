import { ReactNode } from "react";
import BackHomeBtn from "./BackHomeBtn";

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <section className="relative z-10 bg-primary-WHITE_DARK py-[120px]">
      <div className="container">
        <div className="-mx-4 flex">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[570px] text-center">
              <h2 className="mb-2.5 text-4xl font-bold text-secondary-GRAY md:text-[45px] md:leading-[1.44]">
                {title}
              </h2>
              {children}
              <BackHomeBtn />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
