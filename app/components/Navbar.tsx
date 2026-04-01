'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    // Close menu when a link is clicked
    const handleLinkClick = () => setIsMenuOpen(false);

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
                scrolled 
                    ? 'bg-white/80 backdrop-blur-xl py-1' 
                    : 'bg-transparent py-2'
            }`}
        >
            <div className="container mx-auto px-4 md:px-8 h-12 md:h-14 flex items-center justify-between relative z-[101]">
                {/* Logo Section */}
                <Link 
                    href="/" 
                    className="flex items-center gap-2 group relative"
                    onClick={handleLinkClick}
                >
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={64}
                        height={64}
                        className={`w-auto h-12 md:h-14 object-contain transition-transform duration-300 group-hover:scale-105 ${
                            !scrolled && !isMenuOpen ? 'brightness-100' : ''
                        }`}
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className={`hidden lg:flex items-center gap-8 text-[15px] font-semibold transition-colors duration-300 ${
                    scrolled ? 'text-slate-800' : 'text-white'
                }`}>
                    <Link href="#about" className="hover:text-biro-blue-dark transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-biro-blue after:transition-all hover:after:w-full">About</Link>
                    <Link href="#vision" className="hover:text-biro-blue-dark transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-biro-blue after:transition-all hover:after:w-full">Vision</Link>
                    <Link href="#benefits" className="hover:text-biro-blue-dark transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-biro-blue after:transition-all hover:after:w-full">Benefits</Link>
                    <Link href="#gallery" className="hover:text-biro-blue-dark transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-biro-blue after:transition-all hover:after:w-full">Gallery</Link>
                    <Link href="#contact" className="hover:text-biro-blue-dark transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-biro-blue after:transition-all hover:after:w-full">Contact</Link>
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    <Link
                        href="#register"
                        className={`hidden sm:flex px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg ${
                            scrolled || isMenuOpen
                                ? 'bg-biro-blue text-white hover:bg-biro-blue-dark'
                                : 'bg-highlight-yellow text-biro-blue-dark hover:bg-white hover:text-biro-blue'
                        }`}
                        onClick={handleLinkClick}
                    >
                        Register Now
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`lg:hidden p-2 cursor-pointer transition-colors duration-300 ${
                            isMenuOpen || scrolled ? 'text-biro-blue' : 'text-white'
                        }`}
                        aria-label="Toggle Menu"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="transition-transform duration-300"
                        >
                            {isMenuOpen ? (
                                <path d="M18 6L6 18M6 6l12 12" />
                            ) : (
                                <path d="M3 7h18M3 12h14M3 17h18" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-all duration-500 ease-in-out z-[200] ${
                    isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsMenuOpen(false)}
            >
                <div 
                    className={`absolute top-0 right-0 h-screen w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header in Mobile Menu */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-50">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={48}
                            height={48}
                            className="w-auto h-10 object-contain"
                        />
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-biro-blue transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <div className="flex flex-col p-8 gap-5 overflow-y-auto">
                        <Link 
                            href="#about" 
                            className={`text-2xl font-bold text-slate-800 hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} 
                            style={{ transitionDelay: '100ms' }}
                            onClick={handleLinkClick}
                        >
                            About
                        </Link>
                        <Link 
                            href="#vision" 
                            className={`text-2xl font-bold text-slate-800 hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                            style={{ transitionDelay: '150ms' }}
                            onClick={handleLinkClick}
                        >
                            Vision
                        </Link>
                        <Link 
                            href="#benefits" 
                            className={`text-2xl font-bold text-slate-800 hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                            style={{ transitionDelay: '200ms' }}
                            onClick={handleLinkClick}
                        >
                            Benefits
                        </Link>
                        <Link 
                            href="#gallery" 
                            className={`text-2xl font-bold text-slate-800 hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                            style={{ transitionDelay: '250ms' }}
                            onClick={handleLinkClick}
                        >
                            Gallery
                        </Link>
                        <Link 
                            href="#contact" 
                            className={`text-2xl font-bold text-slate-800 hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                            style={{ transitionDelay: '300ms' }}
                            onClick={handleLinkClick}
                        >
                            Contact
                        </Link>
                        
                        <div className={`mt-4 pt-8 border-t border-slate-100 transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                            <Link
                                href="#register"
                                className="w-full flex items-center justify-center py-4 bg-biro-blue text-white text-center font-bold text-lg rounded-xl shadow-lg shadow-biro-blue/20 hover:bg-biro-blue-dark transition-all active:scale-95"
                                onClick={handleLinkClick}
                            >
                                Register Now
                            </Link>
                        </div>
                    </div>
                    
                    <div className="mt-auto p-8 bg-slate-50 border-t border-slate-100">
                        <p className="text-slate-400 text-xs text-center font-medium">
                            © 2026 BENIN TECH HANGOUT. ALL RIGHTS RESERVED.
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}