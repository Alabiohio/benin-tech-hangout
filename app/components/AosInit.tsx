"use client";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSInit() {
    useEffect(() => {
        // Double-check we are in the browser
        if (typeof window === 'undefined') return;

        const initAOS = () => {
            AOS.init({
                duration: 800,
                once: true,
                easing: 'ease-out',
                offset: 100,
            });
            AOS.refresh();
        };

        // Initialize with a safer timeout to allow Next.js hydration to complete fully
        // especially for lazy-loaded components within Suspense boundaries
        const timer = setTimeout(initAOS, 500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return null;
}