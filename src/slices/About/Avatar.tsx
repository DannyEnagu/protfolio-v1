'use client';
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef } from "react";

interface AvatarProps {
    image: ImageField;
    className?: string;
}

export default function Avatar({image, className}: AvatarProps) {
    const component = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(
                ".avatar",
                { opacity: 0, scale: 1.4 },
                { scale: 1, opacity: 1, duration: prefersReducedMotion ? 0: 1.3, ease: "power3.inOut" });
        
            window.onmousemove = (e) => {
                if (!component.current) return;
                let componentRect = component.current.getBoundingClientRect();
                const componentCenterX = componentRect.left + componentRect.width / 2;

                let componentPercent = {
                    x: (e.clientX - componentCenterX) / componentRect.width / 2,
                    // y: (e.clientY - componentRect.top) / componentRect.height
                };

                let distanceFromCenterX = 1 - Math.abs(componentPercent.x);

                gsap
                    .timeline({
                        defaults: { duration: 0.5, overwrite: 'auto', ease: "power3.out" },
                    })
                    .to('.avatar', {
                        rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
                        duration: 0.5,
                    }, 0)
                    .to('.highlight', {
                        opacity: distanceFromCenterX - 0.7,
                        x: -10 * 20 & componentPercent.x,
                        duration: 0.5,
                    }, 0)
            };
        }, component)

        return () => ctx.revert(); // Cleanup
    }, [prefersReducedMotion]);
    
    return (
        <div ref={component} className={clsx("relative h-full w-full", className)}>
            <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
                <PrismicNextImage
                    field={image}
                    className="avatar-image h-full w-full object-fill"
                    imgixParams={{ q: 90 }}
                    alt=""
                />
                <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block" />
            </div>
        </div>
    );
}