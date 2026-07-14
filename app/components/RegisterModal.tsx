'use client';

import Link from "next/link";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3">
            <div
                className="absolute inset-0 bg-[#000000]/85 animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-lg bg-[#000000] border border-white/10 rounded-[2.5rem] p-4 md:p-10 animate-in zoom-in-95 fade-in duration-300 slide-in-from-bottom-5 overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div className="mb-8 pr-8 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-black font-cabinet-grotesk text-white mb-2 leading-tight">Join <span className="text-biro-blue">BTF 2.0</span></h2>
                    <p className="text-white/50 text-sm font-medium">Select your registration path</p>
                </div>

                <div className="space-y-3">
                    {[
                        {
                            title: "Get Tickets",
                            desc: "",
                            link: "/tickets", // Changed to absolute link to work on any page
                            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>,
                            color: "bg-highlight-yellow text-white"
                        },
                        {
                            title: "Become a Volunteer",
                            desc: "",
                            link: "/volunteer",
                            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
                            color: "bg-blue-500 text-white"
                        },
                        {
                            title: "Be an Exhibitor",
                            desc: "",
                            link: "/exhibitor",
                            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 10h1m4 0h1m-5-4h1m4 0h1"></path></svg>,
                            color: "bg-biro-blue-dark text-white"
                        },
                        {
                            title: "Be a Speaker",
                            desc: "",
                            link: "/speaker-registration",
                            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>,
                            color: "bg-red-700 text-white"
                        }
                    ].map((opt, i) => (
                        <Link
                            key={i}
                            href={opt.link}
                            onClick={onClose}
                            className="group flex items-center gap-5 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 overflow-hidden"
                        >
                            <div className={`w-10 h-10 rounded-xl ${opt.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                {opt.icon}
                            </div>
                            <div className="text-left flex-grow">
                                <h3 className="text-lg font-black font-cabinet-grotesk text-white leading-none mb-1">{opt.title}</h3>
                                <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest">{opt.desc}</p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
