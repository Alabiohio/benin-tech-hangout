'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WhatToExpect({ setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: (open: boolean) => void }) {
    const expectations = [
        { title: "Panels", desc: "Listen to practical conversations from industry experts and ecosystem leaders.", image: "/BTH-10-1.jpg", overlay: "bg-blue-900/85" },
        { title: "Exhibition", desc: "Discover what is being built in Benin's tech ecosystem through live demos.", image: "/BTH-3-1.jpg", overlay: "bg-orange-600/85" },
        { title: "Networking", desc: "Forge strategic collaborations and partnerships with builders, founders, and leaders.", image: "/BTH-30-1.jpg", overlay: "bg-purple-900/85" },
        { title: "Startup Pitch", desc: "Watch local startups showcase their ideas for visibility and investor connections.", image: "/BTH-35.png", overlay: "bg-emerald-900/85" },
        { title: "Opportunities", desc: "Explore job fairs, connect with investors, and discover various pools of opportunity.", image: "/BTH-45.jpg", overlay: "bg-red-900/85" },
        { title: "Tech Money", desc: "Learn about financing, venture capital, and building profitable tech businesses.", image: "/BTH-7.jpg", overlay: "bg-teal-900/85" },
        { title: "Mentorship", desc: "Connect with mentors who can guide your journey in the tech space.", image: "/BTH-9-1.jpg", overlay: "bg-indigo-900/85" }
    ];

    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden" id="what-to-expect">
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-4xl font-black font-righteous text-biro-blue-dark mb-5">
                        What to expect <span className="text-biro-blue">at BTF 2.0</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-xl text-slate-600 font-medium">BTF 2.0 is more than just a tech meetup. It&apos;s where innovation meets opportunity in Benin City.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 auto-rows-[150px] md:auto-rows-[400px]">
                    {expectations.map((item, idx) => {
                        const getGridSpan = (i: number) => {
                            if (i === 0) return 'md:col-span-2 lg:col-span-2';
                            if (i === 3) return 'md:col-span-2 lg:col-span-2';
                            if (i === 6) return 'md:col-span-2 lg:col-span-1';
                            return 'col-span-1';
                        };

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`group relative rounded-[32px] md:rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:scale-[1.02] ${getGridSpan(idx)}`}
                            >
                                <div className="absolute inset-0 z-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className={`absolute inset-0 z-0 ${item.overlay}`}></div>

                                <div className="relative z-10 flex flex-col items-center justify-center text-white h-full p-6 md:p-12 text-center">
                                    <div className="max-w-2xl">
                                        <h3 className="text-2xl md:text-5xl font-black font-righteous mb-2 md:mb-4 tracking-tighter leading-none group-hover:scale-105 transition-transform duration-500 drop-shadow-md">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm md:text-xl font-medium opacity-90 group-hover:opacity-100 transition-opacity leading-snug drop-shadow-sm">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-32 px-4 py-10 md:p-20 bg-[#f8fbff] rounded-[1rem] border border-blue-100 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <h3 className="text-2xl md:text-4xl font-black font-righteous text-biro-blue-dark mb-6">Discover. Showcase. Connect.</h3>
                        <p className="text-slate-600 max-w-3xl mb-12 font-medium leading-relaxed">
                            The exhibition brings together startups, creators, and tech brands to showcase what they&apos;re building and solving.
                            Walk through live demos, interact with products, and meet the teams behind them.
                            <span className="block mt-4 text-biro-blue-dark">It&apos;s where ideas become visible and opportunities begin.</span>
                        </p>

                        <div className="flex flex-col md:flex-row gap-6">
                            <Link
                                href="/exhibitor"
                                className="px-12 py-3 bg-biro-blue text-white font-black font-righteous rounded-2xl hover:scale-105 transition-all text-xl"
                            >
                                Get an Exhibition Slot
                            </Link>
                        </div>
                    </div>
                </div>

                <motion.div
                    className="mt-24 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative px-14 py-5 bg-highlight-yellow text-white font-black font-righteous rounded-[2.5rem] transition-all hover:scale-105 active:scale-95 text-xl overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-4">
                            REGISTER NOW
                            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
