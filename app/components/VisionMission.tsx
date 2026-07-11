'use client';

import Image from "next/image";
import { motion } from "framer-motion";

export default function VisionMission() {
    return (
        <section id="vision" className="py-24 bg-biro-blue relative overflow-hidden text-white">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/mission1.jpg"
                    alt="Community Mission"
                    fill
                    className="object-cover opacity-15"
                    loading="lazy"
                />
                <div className="absolute inset-0 mission-bg-overlay"></div>
            </div>

            <div className="container mx-auto px-6 relative z-20">
                <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="group relative flex flex-col justify-center bg-white/10 rounded-[2.5rem] p-10 md:p-14 border border-white/15 overflow-hidden transition-all duration-500"
                    >
                        <div className="inline-block px-4 py-1.5 mb-10 text-xs font-black font-cabinet-grotesk tracking-[0.2em] text-[#fecaca] uppercase bg-white/10 rounded-xl border border-white/15 w-fit">
                            Our Vision
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black font-cabinet-grotesk mb-8 leading-[1.15] text-white">
                            To <span className="text-[#fecaca]">strengthen and grow</span> <br />
                            Benin City&apos;s tech ecosystem.
                        </h2>

                        <p className="text-blue-50/90 text-xl font-medium leading-relaxed max-w-xl">
                            To see Benin City grow into a connected, supportive, and thriving tech ecosystem where everyone has a place, a voice, and an opportunity to grow.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="group relative bg-white rounded-[1.5rem] p-10 md:p-14 border border-blue-100 overflow-hidden transition-all duration-500"
                    >
                        <div className="inline-block px-4 py-1.5 mb-10 text-xs font-black font-cabinet-grotesk tracking-[0.2em] text-biro-blue uppercase bg-blue-50 rounded-xl border border-blue-100 w-fit">
                            Our Mission
                        </div>

                        <ul className="space-y-8 relative z-10">
                            {[
                                "To bring tech people together under one roof",
                                "To encourage collaboration instead of competition",
                                "To create visibility for talents, startups, and organizations",
                                "To strengthen the tech ecosystem in Benin, one connection at a time"
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-6 group/item">
                                    <div className="mt-1.5 flex-shrink-0 w-2.5 h-2.5 rounded-full bg-highlight-yellow"></div>
                                    <p className="text-slate-700 font-bold text-lg leading-snug">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
