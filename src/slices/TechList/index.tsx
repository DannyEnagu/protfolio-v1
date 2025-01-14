'use client';
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { MdCircle } from "react-icons/md";

import Boundary from "@/components/Boundary";
import Heading from "@/components/Heading";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });

      tl.fromTo(
        '.tech-row',
        {
          x: (i) => (i % 2 === 0 ? gsap.utils.random(600, 400) : gsap.utils.random(-600, -400)),
        },
        {
          x: (i) => (i % 2 === 0 ? gsap.utils.random(-600, -400) : gsap.utils.random(600, 400)),
          ease: 'power1.inOut',
        }
      )
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="wrapper overflow-hidden"
      ref={component}
    >
      <Boundary as="div">
        <Heading as="h2" size="xl" className="mb-8">
          {slice.primary.heading}
        </Heading>
      </Boundary>
      <ul>
        {slice.primary.tech.map(({ tech_color, tech_name }, index) => (
          <li
            key={index}
            className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
            aria-label={tech_name || ""}
          >
            {Array.from({ length: 15 }, (_, index) => (
              <React.Fragment key={index}>
                <span className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                style={{color: index === 7 && tech_color ? tech_color: 'inherit'} }>
                  {tech_name}
                </span>
                <span className="text-3xl">
                  <MdCircle />
                </span>
              </React.Fragment>
            ))}
          </li>
        ))}
        {slice.items.map(({ tech_color, tech_name }, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          aria-label={tech_name || ""}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span
                className={
                  "tech-item text-8xl font-extrabold uppercase tracking-tighter"
                }
                style={{
                  color: index === 7 && tech_color ? tech_color : "inherit",
                }}
              >
                {tech_name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
      </ul>
    </section>
  );
};

export default TechList;
