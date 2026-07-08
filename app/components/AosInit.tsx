'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export default function AosInit() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true, offset: 120 });
        AOS.refresh();
    }, []);

    return null;
}
