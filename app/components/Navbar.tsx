'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
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
                        src={mounted && resolvedTheme === 'dark' ? '/logo/logo-icon.png' : '/logo/logo-icon.png'}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-auto h-13 md:h-15 object-contain"
                        priority
                    />
                    <span className="font-cabinet-grotesk text-2xl font-extrabold flex flex-col leading-[0.85] text-colors-inverted">  
                        <span>Benin</span>
                        <span>Tech</span>
                        <span>Fest</span>
                    </span>
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

            <div className={`fixed inset-0 bg-background lg:hidden transition-all duration-300 ease-in-out z-[200] flex flex-col ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex items-center justify-between px-6 py-3">
                    <Image src={mounted && resolvedTheme === 'dark' ? '/logo/logo_light.png' : '/logo/logo.png'} alt="Logo" width={96} height={42} className="w-auto h-9 object-contain" />
                    <button onClick={() => setIsMenuOpen(false)} className="p-2 text-foreground hover:text-biro-blue transition-colors">
                        <FiX size={36} strokeWidth={3} />
                    </button>
                </div>

                <div className="flex flex-col -mt-5 items-center justify-center flex-1 gap-1 overflow-y-auto">
                    <Link href="/#about" className="text-[44px] sm:text-[35px] md:text-[40px] font-bold tracking-tight text-foreground" onClick={handleLinkClick}>About</Link>
                    <Link href="/#pitch" className="text-[44px] sm:text-[35px] md:text-[40px] font-bold tracking-tight text-foreground" onClick={handleLinkClick}>Pitch</Link>
                    <Link href="/tickets" className="text-[43px] sm:text-[35px] md:text-[40px] font-bold tracking-tight text-foreground" onClick={handleLinkClick}>Tickets</Link>
                    <Link href="/schedule" className="text-[43px] sm:text-[35px] md:text-[40px] font-bold tracking-tight text-foreground" onClick={handleLinkClick}>Schedule</Link>
                    <Link href="/#sponsor" className="text-[43px] sm:text-[35px] md:text-[40px] font-bold tracking-tight text-foreground" onClick={handleLinkClick}>Sponsor</Link>
                    <Link href="/exhibition" className="text-[43px] sm:text-[35px] md:text-[40px] font-bold tracking-tight text-foreground" onClick={handleLinkClick}>Exhibition</Link>
                    <Link href="https://forms.gle/kkEu2pQNmznFTDpw8" className="text-[45px] sm:text-[35px] md:text-[40px] font-bold tracking-tight text-foreground" onClick={handleLinkClick}>Volunteer</Link>
                </div>

                <div className="px-6 pb-12 w-full mt-auto">
                    <Link
                        href="/register"
                        className="flex items-center justify-center w-full py-3 text-[20px] font-bold rounded-[2.5rem] uppercase tracking-wide bg-[#1a73e8] text-white hover:bg-blue-700 transition-colors"
                        onClick={handleLinkClick}
                    >
                        REGISTER NOW
                    </Link>
                </div>
            </div>
            <RegisterModal
                isOpen={isLocalRegisterModalOpen}
                onClose={() => setIsLocalRegisterModalOpen(false)}
            />
        </header>
    );
}
