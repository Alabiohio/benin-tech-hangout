'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export default function AOSInit() {
    useEffect(() => {
        // Initialize AOS immediately as soon as the component mounts on the client
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-quart',
            offset: 50, // Trigger animations slightly earlier for better perceived speed
        });

        // Optional: Manual refresh to ensure all elements are correctly positioned after mount
        AOS.refresh();
    }, []);

    return null;
}
