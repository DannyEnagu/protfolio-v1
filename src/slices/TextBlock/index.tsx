import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TestBlock`.
 */
export type TestBlockProps = SliceComponentProps<Content.TestBlockSlice>;

/**
 * Component for "TestBlock" Slices.
 */
const TestBlock = ({ slice }: TestBlockProps): JSX.Element => {
  return (
    <div
      className="max-w-prose"
    >
      <PrismicRichText field={slice.primary.text} />
    </div>
  );
};

export default TestBlock;
