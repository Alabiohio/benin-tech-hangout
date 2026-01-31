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
        return Array.from({ length: 120 }).map((_, i) => ({
            id: i,
            top: (Math.random() * 800 - 50).toFixed(2) + "%", // Spread over 8 page heights
            left: (Math.random() * 100).toFixed(2) + "%",
            size: (Math.random() * 3 + 2).toFixed(1) + "px",
            duration: (Math.random() * 3 + 2).toFixed(1) + "s",
            delay: (Math.random() * 5).toFixed(1) + "s",
            color: i % 3 === 0 ? "#ffd700" : "#1c39bb", // Yellow and Blue glows
            speed: Math.random() * 0.6 + 0.4, // Faster Parallax speed
        }));
    }, []);

    // Large soft background atmosphere
    const atmosphere = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            top: (Math.random() * 800 - 50).toFixed(2) + "%",
            left: (Math.random() * 100).toFixed(2) + "%",
            size: (Math.random() * 500 + 400).toFixed(0) + "px",
            color: i % 2 === 0 ? "rgba(28, 57, 187, 0.05)" : "rgba(255, 215, 0, 0.03)",
            speed: Math.random() * 0.2 + 0.1, // Slow parallax
        }));
    }, []);

    // New: Bigger Blurred Glows (Star-like but soft)
    const largerBlurredGlows = useMemo(() => {
        return Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            top: (Math.random() * 800 - 50).toFixed(2) + "%",
            left: (Math.random() * 100).toFixed(2) + "%",
            size: (Math.random() * 60 + 50).toFixed(0) + "px",
            blur: (Math.random() * 15 + 10).toFixed(1) + "px",
            duration: (Math.random() * 6 + 4).toFixed(1) + "s",
            delay: (Math.random() * 5).toFixed(1) + "s",
            color: i % 2 === 0 ? "#ffd700" : "#1c39bb",
            // Create irregular shapes using individual border radius values
            borderRadius: `${Math.random() * 40 + 60}% ${Math.random() * 40 + 30}% ${Math.random() * 40 + 50}% ${Math.random() * 40 + 40}%`,
            rotation: (Math.random() * 360).toFixed(0) + "deg",
            speed: Math.random() * 0.5 + 0.3, // Moderate parallax
        }));
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-white overflow-hidden">
            {/* Soft Ambient Atmosphere */}
            {atmosphere.map((blob) => (
                <div
                    key={`atmos-${blob.id}`}
                    className="absolute rounded-full blur-[140px]"
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

            {/* Larger Blurred Glows (Star-like soft orbs) */}
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
                        borderRadius: glow.borderRadius,
                        transform: `translate3d(0, ${-scrollOffset * glow.speed}px, 0) rotate(${glow.rotation})`,
                        animationDuration: glow.duration,
                        animationDelay: glow.delay,
                        opacity: 0.4,
                        boxShadow: `0 0 50px 15px ${glow.color}`,
                        willChange: "transform",
                    }}
                />
            ))}

            {/* "Glowing things" - Twinkling orbs all over the body */}
            {staticGlows.map((glow) => (
                <div
                    key={`glow-${glow.id}`}
                    className="absolute rounded-full animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                    style={{
                        top: glow.top,
                        left: glow.left,
                        width: glow.size,
                        height: glow.size,
                        backgroundColor: glow.color,
                        transform: `translate3d(0, ${-scrollOffset * glow.speed}px, 0)`,
                        animationDuration: glow.duration,
                        animationDelay: glow.delay,
                        opacity: 0.7,
                        willChange: "transform",
                    }}
                />
            ))}
        </div>
    );
}
