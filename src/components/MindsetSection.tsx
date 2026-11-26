import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const MindsetSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="chapter-mind"
      aria-labelledby="mind-heading"
      className="relative bg-[#F5F5F5] text-[#0B0D10] py-24 md:py-36 px-6 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mb-14 md:mb-20"
        >
          <p className="chapter-label text-[#6B7280] mb-6">
            The Mind Behind the Code
          </p>
          <h2
            id="mind-heading"
            className="editorial-headline text-[#0B0D10]"
          >
            I don&apos;t want to write code just to make things work. I want to understand why they
            work.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Editorial Paragraphs — Balanced Vertically */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8 text-[#3B4049] py-2">
            <div className="space-y-7 editorial-body">
              <p>
                Curiosity starts the work, but discipline finishes it. When a payment callback times
                out or a layout shifts on a small screen, the real engineering happens in tracing the
                root cause rather than patching over symptoms.
              </p>
              <p>
                Studying Computer Science while building live products keeps my perspective grounded.
                Every database schema, API endpoint, and user interface belongs to one connected
                system—and the clearest code comes from understanding the human problem before
                reaching for a framework.
              </p>
            </div>

            <p className="pt-6 border-t border-black/[0.08] editorial-body text-[#0B0D10] font-medium">
              I am still early in my engineering career, and I treat that honestly: learning with
              intention, paying attention to details, and building software meant to be useful.
            </p>
          </div>

          {/* Balanced Unboxed Editorial Portrait with rounded-2xl */}
          <div className="lg:col-span-5 flex flex-col">
            <figure className="h-full flex flex-col justify-between gap-3">
              <div className="flex-1 min-h-[340px] lg:min-h-[420px] overflow-hidden rounded-2xl bg-[#E5E7EB]">
                <img
                  src="/assets/aistudio/37321_2c38d586.jpg"
                  alt="Portrait of Midusa outdoors"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
              </div>
              <figcaption className="tech-meta text-[#6B7280] flex items-center justify-between px-1">
                <span>Midusa</span>
                <span>Curious by habit, deliberate by craft</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
