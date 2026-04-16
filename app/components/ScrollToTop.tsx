'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[100] p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl hover:bg-biro-blue hover:scale-110 transition-all duration-300 group ring-1 ring-white/10 animate-in fade-in zoom-in slide-in-from-bottom-5"
                    aria-label="Scroll to top"
                >
                    <svg
                        className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 15l7-7 7 7"
                        />
                    </svg>

                    {/* Glowing pulse effect */}
                    <div className="absolute inset-0 rounded-2xl bg-biro-blue/20 blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
            )}
        </>
    );
}
