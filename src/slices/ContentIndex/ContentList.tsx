'use client';
import { asImageSrc, Content, isFilled } from "@prismicio/client";
import Link from "next/link";
import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ContentListProps {
    items: Content.BlogPostDocument[] | Content.ProjectDocument[];
    contentType: Content.ContentIndexSlice['primary']['content_type'];
    viewMoreText?: Content.ContentIndexSlice['primary']['view_more_text'];
    fallbackItemImage: Content.ContentIndexSlice['primary']['fallback_item_image'];
}

gsap.registerPlugin(ScrollTrigger);

export default function ContentList({
    items,
    contentType,
    viewMoreText='Read More',
    fallbackItemImage}
    : ContentListProps) {
  const component = React.useRef<HTMLDivElement>(null);
  const revealRef = React.useRef<HTMLDivElement>(null);
  const itemsRef = React.useRef<Array<HTMLLIElement | null>>([]);
  const [currentItem, setCurrentItem] = React.useState<null | number>(null);

  const lastMousePosition = React.useRef({ x: 0, y: 0 });

  const urlPrefix = contentType === 'Blog' ? '/blog' : '/projects';

  React.useEffect(() => {
    let ctx = gsap.context(() => {
        itemsRef.current.forEach((item, index) => {
            gsap.fromTo(item,
                {
                    y: 20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.3,
                    delay: index * 0.1,
                    ease: 'elastic.out(1, 0.3)',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom-=100px',
                        end: 'bottom center',
                        toggleActions: 'play none none none',
                    }
                }
            );
        });

        return () => ctx.revert();
    }, component);
  }, []);

  React.useEffect(() => {
    const handleMouseMovement = (event: MouseEvent) => {
        const mousePosition = {
            x: event.clientX,
            y: event.clientY + window.scrollY
        };

        // Calculate Mouse Movement Speed and Direction
        const speed = Math.sqrt(Math.pow(mousePosition.x - lastMousePosition.current.x, 2));

        let ctx = gsap.context(() => {
            if (currentItem !== null) {
                const maxY = window.scrollY + window.innerHeight - 350;
                const maxX = window.innerWidth - 250;

                gsap.to(revealRef.current, {
                    x: gsap.utils.clamp(0, maxX, mousePosition.x - 110),
                    y: gsap.utils.clamp(0, maxY, mousePosition.y - 160),
                    rotation: speed * (mousePosition.x > lastMousePosition.current.x ? 1 : -1),
                    ease: 'back.out(2)',
                    duration: 1.3,
                    opacity: 1
                });

            }

            lastMousePosition.current = mousePosition;
            return () => ctx.revert();
        }, component);
    };

    window.addEventListener('mousemove', handleMouseMovement);

    return () => window.removeEventListener('mousemove', handleMouseMovement);
  }, [currentItem]);


  const contentImages = items.map((item) => {
    const image = isFilled.image(item.data.hover_image) ? item.data.hover_image : fallbackItemImage;

    return asImageSrc(image, {
        w: 220,
        h: 320,
        fit: 'crop',
        exp: -10
    });
  });

  React.useEffect(() => {
    contentImages.forEach((image) => {
        if (!image) return;
        const img = new Image();
        img.src = image;
    });
  }, [contentImages]);

  const handleMouseEnter = (index: number) => {
    setCurrentItem(index);
  };

  const handleMouseLeave = () => {
    setCurrentItem(null);
  };

  return (
    <div ref={component}>
      <ul className="grid border-b border-b-slate-100" onMouseLeave={handleMouseLeave}>
        {items.map((item, index) => (
            <React.Fragment key={index}>
            {isFilled.keyText(item.data.title) && (
                <li
                    className="list-item opacity-0f"
                    onMouseEnter={() => handleMouseEnter(index)}
                    ref={(element) => {
                        itemsRef.current[index] = element;
                    }}
                >
                    <Link
                    href={urlPrefix + '/' + item.uid}
                    className="flex flex-col gap-3 border-t border-t-slate-200 py-10 text-slate-200 md:flex-row"
                    aria-label={item.data.title}
                    >
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold">{item.data.title}</span>
                            <div className="flex gap-3 text-yellow-400 text-lg font-bold">
                                {item.tags.map((tag, index) => (
                                    <span key={index}>{tag}</span>
                                ))}
                            </div>
                        </div>
                        <span className="flex items-center gap-2 text-xl font-medium md:ml-auto">
                            {viewMoreText}
                            <MdArrowOutward />
                        </span>
                    </Link>
                </li>
            )}
            </React.Fragment>
        ))}
      </ul>
      {/* Hover Element to Animate */}
      <div
        ref={revealRef}
        className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        style={{backgroundImage: currentItem !== null ? `url(${contentImages[currentItem]})`: ""}}
      >
      </div>
    </div>
  );
}