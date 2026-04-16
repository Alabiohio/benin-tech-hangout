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
            offset: 120,
            disable: 'mobile',
            startEvent: 'DOMContentLoaded',
        } as any);

        // Optional: Manual refresh to ensure all elements are correctly positioned after mount
        AOS.refresh();
    }, []);

    return null;
}
