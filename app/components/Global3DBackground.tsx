"use client";

import { useMemo, useEffect, useState } from "react";

export default function Global3DBackground() {
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollOffset(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Generate static random positions for "glowing things"
    const staticGlows = useMemo(() => {
        return Array.from({ length: 80 }).map((_, i) => ({
            id: i,
            top: (Math.random() * 1200 - 100).toFixed(2) + "%", // Increased range for full site coverage
            left: (Math.random() * 100).toFixed(2) + "%",
            size: (Math.random() * 3 + 1.5).toFixed(1) + "px",
            duration: (Math.random() * 4 + 2).toFixed(1) + "s",
            delay: (Math.random() * 5).toFixed(1) + "s",
            color: i % 2 === 0 ? "#ffd700" : "#ffffff",
            speed: Math.random() * 0.5 + 0.2, // Faster Parallax speed
        }));
    }, []);

    // Large soft background atmosphere
    const atmosphere = useMemo(() => {
        return Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            top: (Math.random() * 1200 - 100).toFixed(2) + "%",
            left: (Math.random() * 100).toFixed(2) + "%",
            size: (Math.random() * 600 + 400).toFixed(0) + "px",
            color: i % 2 === 0 ? "rgba(28, 57, 187, 0.04)" : "rgba(255, 215, 0, 0.02)",
            speed: Math.random() * 0.15 + 0.05, // Slow parallax
        }));
    }, []);

    // New: Bigger Blurred Glows (Star-like but soft)
    const largerBlurredGlows = useMemo(() => {
        return Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            top: (Math.random() * 1200 - 100).toFixed(2) + "%",
            left: (Math.random() * 100).toFixed(2) + "%",
            size: (Math.random() * 80 + 40).toFixed(0) + "px",
            blur: (Math.random() * 15 + 10).toFixed(1) + "px",
            duration: (Math.random() * 5 + 3).toFixed(1) + "s",
            delay: (Math.random() * 5).toFixed(1) + "s",
            color: i % 2 === 0 ? "#ffd700" : "#1c39bb",
            opacity: (Math.random() * 0.15 + 0.05).toFixed(2),
            speed: Math.random() * 0.4 + 0.2, // Moderate parallax
        }));
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-white overflow-hidden">
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
                        transform: `translate3d(0, ${-scrollOffset * blob.speed}px, 0)`,
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
                        transform: `translate3d(0, ${-scrollOffset * glow.speed}px, 0)`,
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
                        transform: `translate3d(0, ${-scrollOffset * glow.speed}px, 0)`,
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
