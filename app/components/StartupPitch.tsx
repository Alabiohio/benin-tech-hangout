'use client';

import { motion } from 'framer-motion';
import Button from './Button';

export default function StartupPitch() {
    return (
        <section id="pitch" className="w-full md:px-4 py-24 pb-28 relative bg-gradient-to-b from-black via-black to-black">
            <div className="container mx-auto relative z-40 py-10 px-4 bg-black border-t border-t-2 border-b border-b-2 border-white ml-8 md:ml-12 shadow-2xl">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-stretch">
                    <div className="lg:flex-1 flex flex-col justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8 uppercase italic tracking-tight">
                                The Stage <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 not-italic">is Yours.</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            className="text-lg text-slate-300 font-medium leading-relaxed mb-6 max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Are you building the future of the Benin tech ecosystem? Showcase your innovation, gain unparalleled visibility, and connect with strategic investors.
                        </motion.p>
                    </div>

                    <div className="lg:flex-1 flex items-center justify-center lg:justify-end">
                        <div className="relative w-full max-w-sm">
                            <div className="absolute inset-0 rounded-xl bg-white/0"></div>
                            <motion.div
                                className="relative rounded-xl p-5 space-y-5 shadow-2xl bg-slate-950"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <Button href="/exhibitor" variant="biro" className="px-2 !py-2 hover:scale-105 transition-all font-bold text-lg w-full text-center">
                                    Apply to Pitch
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
