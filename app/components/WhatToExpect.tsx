'use client';

import Link from 'next/link';

export default function WhatToExpect({ setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: (open: boolean) => void }) {
    const expectations = [
        { title: "Panels", desc: "Listen to practical conversations from industry experts and ecosystem leaders.", tone: "bg-white border-blue-100 text-biro-blue-dark" },
        { title: "Exhibition", desc: "Discover what is being built in Benin's tech ecosystem through live demos.", tone: "bg-[#f8fbff] border-blue-100 text-biro-blue-dark" },
        { title: "Networking", desc: "Forge strategic collaborations and partnerships with builders, founders, and leaders.", tone: "bg-white border-blue-100 text-biro-blue-dark" },
        { title: "Startup Pitch", desc: "Watch local startups showcase their ideas for visibility and investor connections.", tone: "bg-[#f8fbff] border-blue-100 text-biro-blue-dark" },
        { title: "Opportunities", desc: "Explore job fairs, connect with investors, and discover various pools of opportunity.", tone: "bg-white border-blue-100 text-biro-blue-dark" },
        { title: "Tech Money", desc: "Learn about financing, venture capital, and building profitable tech businesses.", tone: "bg-[#f8fbff] border-blue-100 text-biro-blue-dark" },
        { title: "Mentorship", desc: "Connect with mentors who can guide your journey in the tech space.", tone: "bg-white border-blue-100 text-biro-blue-dark" }
    ];

    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden" id="what-to-expect">
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-righteous text-biro-blue-dark tracking-tighter leading-none mb-6">
                        What to expect <span className="text-biro-blue">at BTH 2.0</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-xl text-slate-600 font-medium">BTH 2.0 is more than just a tech meetup. It&apos;s where innovation meets opportunity in Benin City.</p>
                </div>

                <div className="flex flex-col gap-8 md:gap-10">
                    {expectations.map((item, idx) => (
                        <div
                            key={idx}
                            style={{ transitionDelay: `${idx * 50}ms` }}
                            className={`group relative ${item.tone} px-10 py-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden transition-all duration-700 hover:scale-[1.01] border`}
                            data-aos="fade-up"
                        >
                            <div className="relative z-10">
                                <div className="max-w-3xl text-center md:text-left">
                                    <h3 className="text-4xl md:text-6xl font-black font-righteous mb-4 md:mb-6 tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500">
                                        {item.title}
                                    </h3>
                                    <p className="text-lg md:text-2xl font-medium opacity-80 group-hover:opacity-100 transition-opacity leading-snug md:leading-tight">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="absolute top-1/2 -right-4 -translate-y-1/2 text-[10rem] md:text-[15rem] font-black font-righteous text-blue-100/60 transition-all duration-700 rotate-[15deg] select-none pointer-events-none">
                                {idx + 1}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-32 px-4 py-10 md:p-20 bg-[#f8fbff] rounded-[2rem] border border-blue-100 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <h3 className="text-3xl md:text-6xl font-black font-righteous text-biro-blue-dark mb-6">Discover. Showcase. Connect.</h3>
                        <p className="text-slate-600 text-lg md:text-2xl max-w-3xl mb-12 font-medium leading-relaxed">
                            The exhibition brings together startups, creators, and tech brands to showcase what they&apos;re building and solving.
                            Walk through live demos, interact with products, and meet the teams behind them.
                            <span className="block mt-4 text-biro-blue-dark">It&apos;s where ideas become visible and opportunities begin.</span>
                        </p>

                        <div className="flex flex-col md:flex-row gap-6">
                            <Link
                                href="/exhibitor"
                                className="px-12 py-5 bg-biro-blue text-white font-black font-righteous rounded-2xl hover:scale-105 transition-all text-xl"
                            >
                                Get an Exhibition Slot
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-24 text-center" data-aos="fade-up">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative px-14 py-6 bg-highlight-yellow text-white font-black font-righteous rounded-[2.5rem] transition-all hover:scale-105 active:scale-95 text-xl overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-4">
                            REGISTER NOW
                            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
