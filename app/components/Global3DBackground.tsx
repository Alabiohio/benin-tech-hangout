"use client";

import { useEffect, useRef } from "react";

const STATIC_GLOWS = [
    { top: "8%", left: "12%", size: "4px", duration: "5s", delay: "0s", color: "#007cf9", speed: "0.11" },
    { top: "18%", left: "72%", size: "5px", duration: "6s", delay: "0.6s", color: "#ff0000", speed: "0.14" }, // Recessive red
    { top: "32%", left: "28%", size: "3px", duration: "4s", delay: "1.2s", color: "#007cf9", speed: "0.09" },
    { top: "46%", left: "84%", size: "4px", duration: "5s", delay: "0.8s", color: "#007cf9", speed: "0.1" },
    { top: "58%", left: "14%", size: "5px", duration: "7s", delay: "0.3s", color: "#007cf9", speed: "0.12" },
    { top: "70%", left: "56%", size: "3px", duration: "4.5s", delay: "1.4s", color: "#007cf9", speed: "0.08" },
    { top: "88%", left: "34%", size: "4px", duration: "6.5s", delay: "0.2s", color: "#007cf9", speed: "0.1" },
    { top: "96%", left: "78%", size: "5px", duration: "5.2s", delay: "1s", color: "#ff0000", speed: "0.13" }, // Recessive red
];

const ATMOSPHERE = [
    { top: "5%", left: "-8%", size: "260px", color: "rgba(0, 124, 249, 0.04)", speed: "0.03" },
    { top: "18%", left: "74%", size: "300px", color: "rgba(255, 0, 0, 0.02)", speed: "0.04" }, // Recessive red
    { top: "42%", left: "24%", size: "220px", color: "rgba(0, 124, 249, 0.03)", speed: "0.02" },
    { top: "68%", left: "82%", size: "280px", color: "rgba(0, 124, 249, 0.04)", speed: "0.03" },
    { top: "92%", left: "10%", size: "240px", color: "rgba(0, 124, 249, 0.03)", speed: "0.02" },
];

export default function Global3DBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let rafId: number;
        let lastScrollY = window.scrollY;

        const updateScroll = () => {
            const currentScrollY = window.scrollY;
            if (Math.abs(lastScrollY - currentScrollY) > 0.1) {
                lastScrollY = currentScrollY;
                if (containerRef.current) {
                    containerRef.current.style.setProperty('--scroll-y', `${currentScrollY}px`);
                }
            }
            rafId = requestAnimationFrame(updateScroll);
        };

        rafId = requestAnimationFrame(updateScroll);
        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 pointer-events-none bg-white overflow-hidden"
            style={{ '--scroll-y': '0px' } as React.CSSProperties}
        >
            {/* Geometric craftsmanship tech grid overlay */}
            <div 
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 124, 249, 0.25) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 124, 249, 0.25) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Responsive Interlocking digital craftsmanship SVG lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#007cf9" />
                        <stop offset="100%" stopColor="#ff0000" stopOpacity="0.2" />
                    </linearGradient>
                </defs>
                <line x1="15%" y1="0" x2="15%" y2="100%" stroke="url(#line-grad)" strokeWidth="1" />
                <line x1="85%" y1="0" x2="85%" y2="100%" stroke="url(#line-grad)" strokeWidth="1" />
                <line x1="0" y1="25%" x2="100%" y2="25%" stroke="url(#line-grad)" strokeWidth="1" />
                <line x1="0" y1="75%" x2="100%" y2="75%" stroke="url(#line-grad)" strokeWidth="1" />
                <line x1="0" y1="0" x2="20%" y2="20%" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="100%" y1="0" x2="80%" y2="20%" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="0" y1="100%" x2="20%" y2="80%" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="100%" y1="100%" x2="80%" y2="80%" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="5,5" />
            </svg>

            {ATMOSPHERE.map((blob, index) => (
                <div
                    key={`atmos-${index}`}
                    className="absolute rounded-full"
                    style={{
                        top: blob.top,
                        left: blob.left,
                        width: blob.size,
                        height: blob.size,
                        backgroundColor: blob.color,
                        transform: `translate3d(0, calc(var(--scroll-y) * -${blob.speed}), 0)`,
                        willChange: "transform",
                    }}
                />
            ))}

            {STATIC_GLOWS.map((glow, index) => (
                <div
                    key={`glow-${index}`}
                    className="absolute rounded-full animate-pulse"
                    style={{
                        top: glow.top,
                        left: glow.left,
                        width: glow.size,
                        height: glow.size,
                        backgroundColor: glow.color,
                        transform: `translate3d(0, calc(var(--scroll-y) * -${glow.speed}), 0)`,
                        animationDuration: glow.duration,
                        animationDelay: glow.delay,
                        opacity: 0.25,
                        willChange: "transform",
                    }}
                />
            ))}
        </div>
    );
}
