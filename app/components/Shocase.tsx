'use client';

import { motion, Variants } from 'framer-motion';
import Button from './Button';

const fade: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' } })
};

export default function Shocase({ setIsModalOpen }: { setIsModalOpen: (open: boolean) => void }) {
    const tiles = [
        { title: 'SHOWCASE. PITCH. GROW.', desc: 'Showcase your product, business or startup idea at BTF 2.0. Get funding, business training & mentorship and connect with potential investors and customers.', colored: true, bgColor: 'blue-600 to-blue-800', borderColor: 'border-blue-500/50', shadowColor: 'hover:shadow-blue-500/20' },
        { title: '₦5M PRIZE POOL', desc: 'Compete to access cash prizes and funding from angels, VCs, and government agencies.', colored: false, stackBg1: 'bg-slate-800', stackBg2: 'bg-slate-700', bgColor: 'blue-800', borderColor: 'border-purple-500/50', shadowColor: 'hover:shadow-purple-500/20' },
        { title: 'BUSINESS MENTORSHIP', desc: 'Intensive training by Metaspace Consulting with mentors and experts before the event.', colored: false, stackBg1: 'bg-slate-800', stackBg2: 'bg-slate-700', bgColor: 'amber-800', borderColor: 'border-amber-500/50', shadowColor: 'hover:shadow-amber-500/20' },
        { title: 'MARKET VISIBILITY', desc: 'Present to 1,000+ attendees, 50+ communities, and corporate partners at BTF 2.0.', colored: false, stackBg1: 'bg-slate-800', stackBg2: 'bg-slate-700', bgColor: 'emerald-800', borderColor: 'border-emerald-500/50', shadowColor: 'hover:shadow-emerald-500/20' },
    ];

    return (
        <section id="shocase" className="py-20 bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* First tile - regular div on the left */}
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fade}
                        className="p-1 max-w-md mx-auto w-full"
                    >
                        <h3 className="font-black font-cabinet-grotesk leading-none text-white mb-4 flex flex-col gap-1">
                            <span className="text-6xl md:text-[5.2rem]">SHOWCASE.</span>
                            <span className="text-6xl md:text-[5.2rem]">PITCH.</span>
                            <span className="text-6xl md:text-[5.2rem] text-biro-blue">GROW.</span>
                        </h3>
                        <p className="text-lg text-white/90 mb-6">
                            {tiles[0].desc}
                        </p>
                        <div className="flex flex-col sm:flex-row lg:flex-col lg:items-start gap-3">
                            <Button onClick={() => setIsModalOpen(true)} variant="primary">
                                Apply to Pitch
                            </Button>
                            <Button onClick={() => setIsModalOpen(true)} variant="outline" className='border-white text-white hover:!bg-white hover:!text-black !shadow-[6px_6px_0px_rgba(255,255,255,0.4)] hover:!shadow-[3px_3px_0px_rgba(255,255,255,0.4)]'>
                                Be an Exhibitor
                            </Button>
                        </div>
                    </motion.div>

                    {/* Cards section - on the right */}
                    <div className="flex flex-col gap-6 mt-28 max-w-md mx-auto w-full">
                    {tiles.slice(1).map((t, i) => {
                        const cardIndex = i + 1;
                        const rotA = cardIndex % 2 === 0 ? '-rotate-2' : '-rotate-1';
                        const rotB = cardIndex % 2 === 0 ? 'rotate-2' : 'rotate-1';

                        return (
                            <div
                                key={t.title}
                                className="relative w-full"
                            >
                                <div className={`absolute -inset-3 rounded-xl transform ${rotA} bg-slate-700`} />
                                <div className={`absolute -inset-2 rounded-xl transform ${rotB} bg-slate-600`} />

                                <motion.div
                                    custom={cardIndex}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fade}
                                    className={`relative rounded-xl p-4 border transition-shadow duration-300 bg-${t.bgColor} border-none hover:shadow-2xl ${t.shadowColor}`}
                                >
                                    <div className="flex gap-6 h-full">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 border border-white/30">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl md:text-2xl font-black font-cabinet-grotesk leading-tight text-white">
                                                {t.title}
                                            </h3>
                                            <p className="mt-3 text-base text-white/90">
                                                {t.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </section>
    );
}

