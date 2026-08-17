'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Button from "./Button";
import RegisterModal from "./RegisterModal";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ onRegisterClick }: { onRegisterClick?: () => void }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isMobileRegisterOpen, setIsMobileRegisterOpen] = useState(false);
    const [isLocalRegisterModalOpen, setIsLocalRegisterModalOpen] = useState(false);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleRegisterClick = () => {
        if (onRegisterClick) {
            onRegisterClick();
        } else {
            setIsLocalRegisterModalOpen(true);
        }
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
        setIsRegisterOpen(false);
        setIsMobileRegisterOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = () => setIsRegisterOpen(false);
        if (isRegisterOpen) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => window.removeEventListener('click', handleClickOutside);
    }, [isRegisterOpen]);

    return (
        <header
            className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out bg-background py-4 overflow-x-clip"
        >
            <div className="container mx-auto px-4 md:px-8 h-12 md:h-14 flex items-center relative z-[101]">
                <Link href="/" className="flex items-center gap-2 group relative mr-auto" onClick={handleLinkClick}>
                    <Image
                        src={mounted && resolvedTheme === 'dark' ? '/logo/logo_light.png' : '/logo/logo.png'}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-auto h-13 md:h-14 object-contain"
                        priority
                    />
                </Link>

                <nav className="hidden lg:flex items-center gap-8 text-[13px] font-black uppercase tracking-widest transition-colors duration-300 text-colors-inverted mr-8">
                    <Link href="/#about" className="hover:text-biro-blue-dark transition-colors">About</Link>
                    <Link href="/#pitch" className="hover:text-biro-blue-dark transition-colors">Pitch</Link>
                    <Link href="/schedule" className="hover:text-biro-blue-dark transition-colors">Schedule</Link>
                    <Link href="/#sponsor" className="hover:text-biro-blue-dark transition-colors">Sponsor</Link>
                    <Link href="/exhibition" className="hover:text-biro-blue-dark transition-colors">Exhibition</Link>
                    <Link href="https://forms.gle/kkEu2pQNmznFTDpw8" className="hover:text-biro-blue-dark transition-colors">Volunteer</Link>
                </nav>

                <div className="flex items-center gap-4 min-w-0">
                    <ThemeToggle />
                    <div className="hidden lg:block">
                        <Link
                            href="/register"
                            className="px-6 py-2.5 text-lg font-black rounded-full uppercase tracking-widest text-[11px] transition-all duration-300 active:scale-95 bg-biro-blue text-white hover:bg-transparent hover:border-3 hover:border-biro-blue hover:text-biro-blue"
                        >
                            Register Now
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden shrink-0 p-2 cursor-pointer transition-colors duration-300 text-foreground"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <FiX size={28} strokeWidth={2.5} className="transition-transform duration-300" />
                        ) : (
                            <FiMenu size={28} strokeWidth={2.5} className="transition-transform duration-300" />
                        )}
                    </button>
                </div>
            </div>

            <div className={`fixed inset-0 bg-slate-900/60 lg:hidden transition-all duration-500 ease-in-out z-[200] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
                <div className={`absolute top-0 right-0 h-screen w-full max-w-sm bg-background transition-transform duration-500 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-6 border-b border-foreground/20">
                        <Image src={mounted && resolvedTheme === 'dark' ? '/logo/logo_light.png' : '/logo/logo.png'} alt="Logo" width={96} height={42} className="w-auto h-9 object-contain" />
                        <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full bg-slate-100 text-background hover:text-biro-blue transition-colors">
                            <FiX size={28} strokeWidth={2.5} />
                        </button>
                    </div>

                    <div className="flex flex-col p-8 gap-5 overflow-y-auto">
                        <Link href="/#about" className={`text-2xl font-black font-cabinet-grotesk uppercase tracking-tight text-colors-inverted hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '100ms' }} onClick={handleLinkClick}>About</Link>
                        <Link href="/#pitch" className={`text-2xl font-black font-cabinet-grotesk uppercase tracking-tight text-colors-inverted hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '150ms' }} onClick={handleLinkClick}>Pitch</Link>
                        <Link href="/schedule" className={`text-2xl font-black font-cabinet-grotesk uppercase tracking-tight text-colors-inverted hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '200ms' }} onClick={handleLinkClick}>Schedule</Link>
                        <Link href="/#sponsor" className={`text-2xl font-black font-cabinet-grotesk uppercase tracking-tight text-colors-inverted hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '250ms' }} onClick={handleLinkClick}>Sponsor</Link>
                        <Link href="/exhibition" className={`text-2xl font-black font-cabinet-grotesk uppercase tracking-tight text-colors-inverted hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '300ms' }} onClick={handleLinkClick}>Exhibition</Link>
                        <Link href="https://forms.gle/kkEu2pQNmznFTDpw8" className={`text-2xl font-black font-cabinet-grotesk uppercase tracking-tight text-colors-inverted hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '350ms' }} onClick={handleLinkClick}>Volunteer</Link>

                        <div className={`mt-4 pt-8 transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '450ms' }}>
                            <Button onClick={() => { handleRegisterClick(); handleLinkClick(); }} className="w-full flex items-center justify-center py-4 bg-biro-blue text-white text-center font-black font-cabinet-grotesk uppercase tracking-widest text-lg hover:bg-biro-blue-dark transition-all active:scale-95">
                                Register Now
                            </Button>
                        </div>
                    </div>

                    <div className="mt-auto p-8 bg-background">
                        <p className="text-slate-400 text-xs text-center font-black uppercase tracking-widest">
                            © 2026 BENIN TECH Fest
                        </p>
                    </div>
                </div>
            </div>
            <RegisterModal
                isOpen={isLocalRegisterModalOpen}
                onClose={() => setIsLocalRegisterModalOpen(false)}
            />
        </header>
    );
}
