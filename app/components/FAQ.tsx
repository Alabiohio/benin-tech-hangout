'use client';

import { useState } from 'react';

export default function FAQ() {
    const questions = [
        {
            q: "Is the event really free?",
            a: "Yes. The General Pass is completely free, but registration is required for capacity management. Builders and VIP passes have pricing that covers additional perks and exclusive access."
        },
        {
            q: "Who can attend BTF 2.0?",
            a: "Anyone interested in tech — developers, designers, founders, students, creatives, policy makers, and ecosystem leaders. We welcome everyone building or curious about the Edo State tech ecosystem."
        },
        {
            q: "How do I apply to pitch my startup?",
            a: "Click the 'Apply to Pitch' button on this page or visit the Pitch section. Shortlisted startups will receive intensive training before the main event and will compete for the ₦5M prize pool."
        },
        {
            q: "How can I become a speaker or exhibitor?",
            a: "Apply through the 'Apply to Speak' link on the Speakers section or use the 'Be an Exhibitor' button in the Pitch section. You can also email us at benintechfest@gmail.com."
        },
         {
            q: "Where exactly is the event taking place?",
            a: "BTF 2.0 will be held in Benin City, Edo State. The confirmed venue address will be communicated to all registered attendees via email as the event date approaches."
        },
        {
            q: "How can my company become a sponsor?",
            a: "Visit the Sponsors section, click 'become a Sponsor,' or contact us directly at benintechfest@gmail.com. We have multiple sponsorship tiers to suit your brand goals and budget."
        },
        {
            q: "How do I volunteer at BTF 2.0?",
            a: "Fill out the volunteer application form via the 'Apply to Volunteer' button. Volunteers get special access to the event, branded merchandise, and recognition as part of the BTF organizing team."
        },
    ];

    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <section className="py-8 bg-[#f8fbff] relative" id="faq">
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-6">
                    <h2 className="text-3xl md:text-4xl font-black font-righteous text-biro-blue-dark tracking-tight">
                        Got <span className="text-biro-blue">Questions?</span>
                    </h2>
                </div>

                <div>
                    {questions.map((faq, idx) => (
                        <div
                            key={idx}
                            className={`group border-b border-blue-100 pb-2 transition-all duration-300 ${openIdx === idx ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                        >
                            <button
                                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                                className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
                            >
                                <span className="text-[18px] md:text-xl font-black text-biro-blue-dark tracking-tight leading-relaxed">
                                    {faq.q}
                                </span>
                                <div className={`w-10 h-10 rounded-full border border-blue-100 flex items-center justify-center transition-all duration-500 ${openIdx === idx ? 'bg-highlight-yellow text-white rotate-45' : 'bg-white text-biro-blue-dark'}`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                                </div>
                            </button>
                            <div className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${openIdx === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="pb-8">
                                    <p className="text-slate-600 font-medium leading-relaxed pl-2 md:pl-0 border-l-4 border-highlight-yellow/50">
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
