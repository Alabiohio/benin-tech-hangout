'use client';

import { useState } from 'react';

export default function FAQ() {
    const questions = [
        {
            q: "Is the event really free?",
            a: "Yes. The Regular Pass is completely free, but registration is required for capacity management and communication."
        },
        {
            q: "Who can attend?",
            a: "Anyone interested in tech, including developers, designers, founders, students, and creatives. We welcome everyone building or curious about the ecosystem."
        },
        {
            q: "How can I become a speaker or exhibitor?",
            a: "You can apply through the website or contact the team directly. Use the exhibition button or the relevant registration pages."
        },
        {
            q: "Do I need to register?",
            a: "Yes. Entry is strictly via registration. Please ensure you have your pass ready for check-in."
        }
    ];

    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <section className="py-32 bg-[#f8fbff] relative" id="faq">
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-righteous text-biro-blue-dark tracking-tight">
                        Got <span className="text-biro-blue">Questions?</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {questions.map((faq, idx) => (
                        <div
                            key={idx}
                            className={`group border-b border-blue-100 pb-2 transition-all duration-300 ${openIdx === idx ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                        >
                            <button
                                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                                className="w-full flex items-center justify-between py-8 text-left focus:outline-none"
                            >
                                <span className="text-xl md:text-2xl font-black font-righteous text-biro-blue-dark tracking-tight leading-relaxed">
                                    {faq.q}
                                </span>
                                <div className={`w-10 h-10 rounded-full border border-blue-100 flex items-center justify-center transition-all duration-500 ${openIdx === idx ? 'bg-highlight-yellow text-white rotate-45' : 'bg-white text-biro-blue-dark'}`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                                </div>
                            </button>
                            <div className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${openIdx === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="pb-8">
                                    <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed pl-2 md:pl-0 border-l-4 border-highlight-yellow/50">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
