'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function Navbar({ onRegisterClick }: { onRegisterClick?: () => void }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isMobileRegisterOpen, setIsMobileRegisterOpen] = useState(false);

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
            className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out bg-white/99 py-4"
        >
            <div className="container mx-auto px-4 md:px-8 h-12 md:h-14 flex items-center justify-between relative z-[101]">
                <Link href="/" className="flex items-center gap-2 group relative" onClick={handleLinkClick}>
                    <Image
                        src="/logo/logo.png"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="w-auto h-8 md:h-16 object-contain"
                        priority
                    />
                </Link>

                <nav className="hidden lg:flex items-center gap-8 text-[13px] font-black uppercase tracking-widest transition-colors duration-300 text-slate-800">
                    <Link href="#about" className="hover:text-biro-blue-dark transition-colors">About</Link>
                    <Link href="#highlights" className="hover:text-biro-blue-dark transition-colors">Highlights</Link>
                    <Link href="#tickets" className="hover:text-biro-blue-dark transition-colors">Tickets</Link>
                    <div className="relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsRegisterOpen(!isRegisterOpen);
                            }}
                            className="flex items-center gap-1 hover:text-biro-blue-dark transition-colors font-black uppercase tracking-widest"
                        >
                            Register
                            <svg className={`w-3 h-3 transition-transform duration-300 ${isRegisterOpen ? 'rotate-180 text-biro-blue' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 transform z-[110] ${isRegisterOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                            <div className="p-2">
                                <button onClick={() => { onRegisterClick?.(); handleLinkClick(); }} className="w-full text-left block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-biro-blue rounded-xl font-black uppercase tracking-widest text-[11px] transition-colors">
                                    Attend Event
                                </button>
                                <Link href="/volunteer" className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-biro-blue rounded-xl font-black uppercase tracking-widest text-[11px] transition-colors" onClick={handleLinkClick}>As Volunteer</Link>
                                <Link href="/exhibitor" className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-biro-blue rounded-xl font-black uppercase tracking-widest text-[11px] transition-colors" onClick={handleLinkClick}>As Exhibitor</Link>
                            </div>
                        </div>
                    </div>
                    <Link href="#faq" className="hover:text-biro-blue-dark transition-colors">FAQ</Link>
                    <Link href="#contact" className="hover:text-biro-blue-dark transition-colors">Contact</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Button
                        onClick={onRegisterClick}
                        className="!hidden lg:!flex px-6 py-2.5 text-lg font-black uppercase tracking-widest text-[11px] transition-all duration-300 active:scale-95 bg-biro-blue text-white hover:bg-biro-blue-dark"
                    >
                        Register Now
                    </Button>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 cursor-pointer transition-colors duration-300 text-biro-blue"
                        aria-label="Toggle Menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300">
                            {isMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 7h18M3 12h14M3 17h18" />}
                        </svg>
                    </button>
                </div>
            </div>

            <div className={`fixed inset-0 bg-slate-900/60 lg:hidden transition-all duration-500 ease-in-out z-[200] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
                <div className={`absolute top-0 right-0 h-screen w-full max-w-sm bg-white transition-transform duration-500 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                        <Image src="/logo/logo.png" alt="Logo" width={100} height={48} className="w-auto h-10 object-contain" />
                        <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-biro-blue transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="flex flex-col p-8 gap-5 overflow-y-auto">
                        <Link href="#about" className={`text-2xl font-black font-cabinet-grotesk uppercase tracking-tight text-slate-800 hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '100ms' }} onClick={handleLinkClick}>About</Link>
                        <Link href="#highlights" className={`text-2xl font-black font-cabinet-grotesk uppercase tracking-tight text-slate-800 hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '150ms' }} onClick={handleLinkClick}>Highlights</Link>
                        <Link href="#tickets" className={`text-2xl font-black font-cabinet-grotesk uppercase tracking-tight text-slate-800 hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '200ms' }} onClick={handleLinkClick}>Tickets</Link>
                        <div className={`flex flex-col gap-3 transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '250ms' }}>
                            <button onClick={() => setIsMobileRegisterOpen(!isMobileRegisterOpen)} className="flex items-center justify-between text-2xl font-black font-cabinet-grotesk uppercase tracking-tight text-slate-800 hover:text-biro-blue text-left w-full">
                                Register
                                <svg className={`w-6 h-6 transition-transform duration-300 ${isMobileRegisterOpen ? 'rotate-180 text-biro-blue' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isMobileRegisterOpen ? 'max-h-48' : 'max-h-0'}`}>
                                <div className="flex flex-col gap-3 pl-4 pt-3 border-l-2 border-slate-100">
                                    <button onClick={() => { onRegisterClick?.(); handleLinkClick(); }} className="text-left text-xl font-bold text-slate-800 hover:text-biro-blue">Attend Event</button>
                                    <Link href="/volunteer" className="text-xl font-bold text-slate-800 hover:text-biro-blue" onClick={handleLinkClick}>As Volunteer</Link>
                                    <Link href="/exhibitor" className="text-xl font-bold text-slate-800 hover:text-biro-blue" onClick={handleLinkClick}>As Exhibitor</Link>
                                </div>
                            </div>
                        </div>
                        <Link href="#faq" className={`text-2xl font-black font-cabinet-grotesk uppercase tracking-tight text-slate-800 hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '300ms' }} onClick={handleLinkClick}>FAQ</Link>
                        <Link href="#contact" className={`text-2xl font-black font-cabinet-grotesk uppercase tracking-tight text-slate-800 hover:text-biro-blue transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '350ms' }} onClick={handleLinkClick}>Contact</Link>

                        <div className={`mt-4 pt-8 border-t border-slate-100 transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '450ms' }}>
                            <Button onClick={() => { onRegisterClick?.(); handleLinkClick(); }} className="w-full flex items-center justify-center py-4 bg-biro-blue text-white text-center font-black font-cabinet-grotesk uppercase tracking-widest text-lg hover:bg-biro-blue-dark transition-all active:scale-95">
                                Register Now
                            </Button>
                        </div>
                    </div>

                    <div className="mt-auto p-8 bg-slate-50 border-t border-slate-100">
                        <p className="text-slate-400 text-xs text-center font-black uppercase tracking-widest">
                            © 2026 BENIN TECH Fest
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}
