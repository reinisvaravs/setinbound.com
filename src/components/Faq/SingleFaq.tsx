"use client";
import { useState, useRef } from "react";

const SingleFaq = (props: { question: string; answer: string }) => {
  const { question, answer } = props;
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full border-b border-dashed border-secondary-GRAY px-4 last:border-b-0">
      <div className="mb-2">
        <button
          className="flex w-full cursor-pointer items-center justify-between rounded-lg py-2 text-left focus:outline-none"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls={`faq-answer-${question.replace(/\s+/g, "-")}`}
        >
          <span className="flex items-center">
            <span className="-mb-2 text-xl font-semibold text-secondary-GRAY sm:text-2xl lg:text-xl xl:text-2xl">
              {question}
            </span>
          </span>
          <span
            className={`ml-2 pt-3 text-secondary-LIGHT_GRAY transition-transform duration-200 ${open ? "translate-y-[7px] rotate-180 transform opacity-100" : "rotate-0 opacity-50"}`}
          >
            ▼
          </span>
        </button>
        <div
          ref={contentRef}
          id={`faq-answer-${question.replace(/\s+/g, "-")}`}
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: open ? contentRef.current?.scrollHeight : 0,
            opacity: open ? 1 : 0,
            transition:
              "max-height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s",
          }}
        >
          <p className="px-1 py-2 text-base text-secondary-LIGHT_GRAY">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleFaq;
