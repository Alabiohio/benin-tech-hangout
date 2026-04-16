"use client";

import { useMemo, useEffect, useRef } from "react";

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

    // Generate static random positions for "glowing things"
    const staticGlows = useMemo(() => {
        return Array.from({ length: 60 }).map((_, i) => ({ // Reduced from 80
            id: i,
            top: (Math.random() * 1200 - 100).toFixed(2) + "%",
            left: (Math.random() * 100).toFixed(2) + "%",
            size: (Math.random() * 3 + 1.5).toFixed(1) + "px",
            duration: (Math.random() * 4 + 2).toFixed(1) + "s",
            delay: (Math.random() * 5).toFixed(1) + "s",
            color: i % 2 === 0 ? "#ffd700" : "#ffffff",
            speed: (Math.random() * 0.4 + 0.1).toFixed(3), // Parallax speed
        }));
    }, []);

    // Large soft background atmosphere
    const atmosphere = useMemo(() => {
        return Array.from({ length: 10 }).map((_, i) => ({ // Reduced from 12
            id: i,
            top: (Math.random() * 1200 - 100).toFixed(2) + "%",
            left: (Math.random() * 100).toFixed(2) + "%",
            size: (Math.random() * 600 + 400).toFixed(0) + "px",
            color: i % 2 === 0 ? "rgba(28, 57, 187, 0.04)" : "rgba(255, 215, 0, 0.02)",
            speed: (Math.random() * 0.12 + 0.03).toFixed(3), // Slow parallax
        }));
    }, []);

    // New: Bigger Blurred Glows (Star-like but soft)
    const largerBlurredGlows = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({ // Reduced from 25
            id: i,
            top: (Math.random() * 1200 - 100).toFixed(2) + "%",
            left: (Math.random() * 100).toFixed(2) + "%",
            size: (Math.random() * 80 + 40).toFixed(0) + "px",
            blur: (Math.random() * 15 + 10).toFixed(1) + "px",
            duration: (Math.random() * 5 + 3).toFixed(1) + "s",
            delay: (Math.random() * 5).toFixed(1) + "s",
            color: i % 2 === 0 ? "#ffd700" : "#1c39bb",
            opacity: (Math.random() * 0.15 + 0.05).toFixed(2),
            speed: (Math.random() * 0.3 + 0.1).toFixed(3), // Moderate parallax
        }));
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 pointer-events-none bg-white overflow-hidden"
            style={{ '--scroll-y': '0px' } as React.CSSProperties}
        >
            {/* Soft Ambient Atmosphere */}
            {atmosphere.map((blob) => (
                <div
                    key={`atmos-${blob.id}`}
                    className="absolute rounded-full blur-[120px]"
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

            {/* Larger Blurred Glows */}
            {largerBlurredGlows.map((glow) => (
                <div
                    key={`large-glow-${glow.id}`}
                    className="absolute animate-pulse"
                    style={{
                        top: glow.top,
                        left: glow.left,
                        width: glow.size,
                        height: glow.size,
                        backgroundColor: glow.color,
                        filter: `blur(${glow.blur})`,
                        borderRadius: "50%",
                        transform: `translate3d(0, calc(var(--scroll-y) * -${glow.speed}), 0)`,
                        opacity: glow.opacity,
                        animationDuration: glow.duration,
                        animationDelay: glow.delay,
                        willChange: "transform",
                    }}
                />
            ))}

            {/* "Glowing things" - Twinkling orbs */}
            {staticGlows.map((glow) => (
                <div
                    key={`glow-${glow.id}`}
                    className="absolute rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    style={{
                        top: glow.top,
                        left: glow.left,
                        width: glow.size,
                        height: glow.size,
                        backgroundColor: glow.color,
                        transform: `translate3d(0, calc(var(--scroll-y) * -${glow.speed}), 0)`,
                        animationDuration: glow.duration,
                        animationDelay: glow.delay,
                        opacity: 0.5,
                        willChange: "transform",
                    }}
                />
            ))}
        </div>
    );
}
