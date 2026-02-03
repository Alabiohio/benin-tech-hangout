'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-white backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
            <div className="container mx-auto px-2 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold flex items-center gap-1 group">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={64}
                        height={64}
                        className="w-auto h-12 object-contain"
                    />
                </Link>

                <nav className={`hidden md:flex gap-8 text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-gray-600' : 'text-white'}`}>
                    <Link href="#about" className="hover:opacity-80 transition-opacity whitespace-nowrap">About</Link>
                    <Link href="#schedule" className="hover:opacity-80 transition-opacity whitespace-nowrap">Schedule</Link>
                    <Link href="#speakers" className="hover:opacity-80 transition-opacity whitespace-nowrap">Speakers</Link>
                    <Link href="#contact" className="hover:opacity-80 transition-opacity whitespace-nowrap">Contact</Link>
                </nav>

                <Link
                    href="#register"
                    className="px-5 py-2.5 bg-highlight-yellow text-biro-blue font-bold rounded-full hover:bg-yellow-400 transition-all active:scale-95 shadow-sm text-sm"
                >
                    Register Now
                </Link>
            </div>
        </header>
    );
}
