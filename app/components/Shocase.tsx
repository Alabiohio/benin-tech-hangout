'use client';

import { motion, Variants } from 'framer-motion';
import { FiAward, FiUsers, FiGlobe } from 'react-icons/fi';
import Button from './Button';

const fade: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' } })
};

export default function Shocase({ setIsModalOpen }: { setIsModalOpen: (open: boolean) => void }) {
    // Using only allowed colors from design.txt: #ffffff, #000000, #ff0000, #007cf9
    const tiles = [
        { title: 'SHOWCASE. PITCH. GROW.', desc: 'Showcase your product, business or startup idea at BTF 2.0. Get funding, business training & mentorship and connect with potential investors and customers.', colored: true, bg: 'linear-gradient(135deg, #007cf9 0%, #000000 100%)', border: '1px solid rgba(255,255,255,0.08)' },
        { title: '₦5M PRIZE POOL', desc: 'Compete to access cash prizes and funding from angels, VCs, and government agencies.', colored: false, stackBg1: '#000000', stackBg2: '#007cf9', bg: '#000000', border: '1px solid rgba(255,255,255,0.06)', icon: FiAward },
        { title: 'BUSINESS MENTORSHIP', desc: 'Intensive training with our Mentors and Experts before and after the Event, also access to a Community of Founders and Monthly opportunities and trainings.', colored: false, stackBg1: '#000000', stackBg2: '#007cf9', bg: '#000000', border: '1px solid rgba(255,255,255,0.06)', icon: FiUsers },
        { title: 'MARKET VISIBILITY', desc: 'Present to 3,000+ attendees, 100+ communities, and corporate partners at BTF 2.0.', colored: false, stackBg1: '#000000', stackBg2: '#007cf9', bg: '#000000', border: '1px solid rgba(255,255,255,0.06)', icon: FiGlobe },
    ];

    return (
        <section id="shocase" className="py-32" style={{ background: '#000000' }}>
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
                        <h3 className="font-black font-cabinet-grotesk leading-none text-white mb-4 flex flex-col gap-1" data-aos="fade-down" data-aos-duration="1000" data-aos-easing="ease-out-cubic" data-aos-once="true">
                            <span className="text-6xl md:text-[5.2rem]">SHOWCASE.</span>
                            <span className="text-6xl md:text-[5.2rem]">PITCH.</span>
                            <span className="text-6xl md:text-[5.2rem]" style={{ color: '#007cf9' }}>GROW.</span>
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
                                <div className={`absolute -inset-3 rounded-xl transform ${rotA}`} style={{ background: t.stackBg1 }} />
                                <div className={`absolute -inset-2 rounded-xl transform ${rotB}`} style={{ background: t.stackBg2 }} />

                                <motion.div
                                    custom={cardIndex}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fade}
                                    className={`relative rounded-xl p-4 transition-shadow duration-300 border-none hover:shadow-2xl`}
                                    style={{ background: t.bg, border: t.border }}
                                                                
                               >
                                    <div className="flex gap-6 h-full">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                                                {t.icon ? (
                                                    <t.icon className="w-5 h-5 text-white" />
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
                                                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1" data-aos="fade-up" data-aos-duration="1000">
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

