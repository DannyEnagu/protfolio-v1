import Boundary from "@/components/Boundary";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Avatar from "./Avatar";

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About = ({ slice }: AboutProps): JSX.Element => {
  return (
    <Boundary
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr, 1fr]">
        <Heading as="h1" size="xl" className="col-start-1">
          {slice.primary.heading}
        </Heading>
        <div className="prose prose-xl prose-slate prose-invert tracking-normal col-start-1">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <Button label={slice.primary.button_text} linkField={slice.primary.button_link} />
        <Avatar image={slice.primary.avatar} className="row-start-1 max-w-sm md:col-start-2 md:row-end-3" />
      </div>
    </Boundary>
  );
};

export default About;