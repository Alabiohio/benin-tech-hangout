"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const slideRight: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const slideLeft: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

export default function About() {
    return (
        <section id="about" className="py-24 relative bg-white border-y border-slate-100">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <motion.div
                        variants={slideRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="w-full md:w-1/2"
                    >
                        <div className="relative">
                            <div className="w-full h-[450px] rounded-sm border border-slate-100 relative overflow-hidden group">
                                <Image
                                    src="/BTH-9-1.jpg"
                                    alt="Benin Tech Fest Community"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-[#0f2f6b]/20 group-hover:bg-[#0f2f6b]/10 transition-colors"></div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="absolute -bottom-8 -left-8 bg-white p-8 rounded-sm border border-slate-100 shadow-xl shadow-blue-900/5 hidden md:block group hover:-translate-y-2 transition-transform duration-500"
                            >
                                <p className="text-biro-blue font-bold text-5xl mb-1 tabular-nums">3000+</p>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Total Attendees</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={slideLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="w-full md:w-1/2"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-8 bg-biro-blue"></div>
                            <span className="text-biro-blue text-xs font-bold uppercase tracking-widest">About</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-biro-blue-dark mb-8 leading-tight tracking-tight">
                            Uniting Benin&apos;s <br />
                            <span className="text-biro-blue">Tech Future</span>
                        </h2>

                        <motion.p variants={fadeUp} className="text-lg text-slate-700 mb-6 leading-relaxed">
                            <span className="font-bold text-biro-blue-dark">Benin Tech Fest 2.0</span> is Edo State Tech Festival, a high impact, community powered gathering dedicated to connecting talented young professionals with opportunities and helping ambitious founders build successful Startups right here in  Edo State.
                        </motion.p>

                        <motion.p variants={fadeUp} className="text-lg text-slate-700 mb-8 leading-relaxed">
                            From developers and designers to founders and ecosystem leaders, policy makers and government bodies, this is where Benin&apos;s tech future is shaped through real conversations, collaboration, and shared vision.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            className="bg-slate-50 border-l-4 border-biro-blue p-6 rounded-sm"
                        >
                            <p className="text-lg text-biro-blue-dark leading-relaxed italic font-medium">
                                &quot;We&apos;re not just hosting an event. We&apos;re building a connected, thriving tech ecosystem in Edo State.&quot;
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

