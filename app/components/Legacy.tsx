'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const images = [
    { src: "/BTH-38.jpg", alt: "Tech enthusiasts at Benin Tech Hangout 1.0", className: "w-full aspect-[4/3] rounded-2xl shadow-2xl relative z-10 scale-105" },
    { src: "/BTH-3-1.jpg", alt: "Networking session", className: "w-full aspect-[3/4] rounded-2xl shadow-xl relative z-20 -mt-12 md:-mt-24 ml-6 md:ml-12 border-4 border-[#020617]" },
    { src: "/BTH-40-1.JPG.jpeg", alt: "Industry leaders speaking", className: "w-full aspect-square rounded-2xl shadow-lg relative z-0 -ml-8 md:-ml-16 mt-4" },
    { src: "/BTH-30-1.jpg", alt: "Community engagement", className: "w-full aspect-video rounded-2xl shadow-2xl relative z-30 -mt-16 md:-mt-32 -mr-4 md:-mr-8 border-4 border-[#020617]" },
    { src: "/BTH-44.JPG.jpeg", alt: "Event Highlights", className: "w-full aspect-square rounded-2xl shadow-xl hover:z-50 border-4 border-[#020617]" },
    { src: "/BTH-9-1.jpg", alt: "Crowd at BTH 1.0", className: "w-full aspect-[4/3] rounded-2xl shadow-2xl hover:z-50 border-4 border-[#020617]" },
];

export default function Legacy() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (scrollRef.current) {
                        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                        const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
                        setScrollProgress(progress);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll();
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <section id="legacy" className="py-24 bg-[#020617] relative overflow-hidden ring-1 ring-white/5">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
                    {/* Content Section */}
                    <motion.div 
                        className="lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >                     
                        <h2 className="text-4xl md:text-7xl font-black font-righteous text-white mb-8 leading-tight italic">
                            BTH 1.0 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Impact</span>
                        </h2>

                        <div className="space-y-6 text-lg text-white/60 leading-relaxed mb-10">
                            <p>
                                Benin Tech Hangout 1.0 brought together a diverse community of innovators and builders. It sparked real connections across the ecosystem.
                            </p>
                            <p className="font-bold text-white italic border-l-4 border-highlight-yellow pl-4">
                                It proved one thing: Benin is ready for the future.
                            </p>
                        </div>

                        {/* Stats grid integrated from Speakers */}
                        <div className="grid grid-cols-2 gap-6 p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-xl">
                            <div>
                                <p className="text-4xl md:text-5xl font-black font-righteous text-highlight-yellow mb-1">500+</p>
                                <p className="text-white/40 font-black uppercase tracking-widest text-[10px]">Attendees</p>
                            </div>
                            <div>
                                <p className="text-4xl md:text-5xl font-black font-righteous text-blue-400 mb-1">30+</p>
                                <p className="text-white/40 font-black uppercase tracking-widest text-[10px]">Communities</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Overlapping Image Grid from Gallery */}
                    <div className="lg:w-1/2 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-12">
                                {images.filter((_, i) => i % 2 === 0).map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: i * 0.2 }}
                                        className="relative group transition-all duration-500 hover:z-40"
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            width={400}
                                            height={300}
                                            className={img.className + " object-cover transition-all duration-500 group-hover:scale-105"}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            <div className="space-y-4">
                                {images.filter((_, i) => i % 2 !== 0).map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8, y: -30 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: i * 0.2 + 0.1 }}
                                        className="relative group transition-all duration-500 hover:z-40"
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            width={400}
                                            height={300}
                                            className={img.className + " object-cover transition-all duration-500 group-hover:scale-105"}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Past Speakers Slider integrated from Speakers */}
                <div className="pt-16 border-t border-white/5">
                    <motion.div 
                        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="space-y-2">
                            <span className="text-highlight-yellow font-black uppercase tracking-[0.3em] text-[10px]">Previous Editions</span>
                            <h3 className="text-3xl md:text-5xl font-black font-righteous text-white">Past Speakers</h3>
                        </div>
                    </motion.div>

                    <div
                        ref={scrollRef}
                        className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory group"
                    >
                        {[
                            { name: "Uche Eze", role: "CEO, Eki Technologies", image: "/past/speaker1.jpeg" },
                            { name: "Teddy Eragbai", role: "TVET Communication Advisor, ForbesBLK Member", image: "/past/speaker2.jpeg" },
                            { name: "Omokaro Osayi", role: "Founder, Treskaro & Father Startups", image: "/past/speaker3.jpg" },
                            { name: "Nwachukwu Justin Jr", role: "Lead, SuperteamNG Edo State, Founder, Breeeve & Ravolo", image: "/past/speaker5.jpeg" },
                            { name: "Past Speaker", role: "Tech Leader", image: "/past/speaker4.jpeg" }
                        ].map((speaker, idx) => (
                            <motion.div
                                key={idx}
                                className="flex-shrink-0 w-[280px] md:w-[350px] snap-start"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 border border-white/10 bg-white/5 backdrop-blur-md group-hover:border-blue-500/30 transition-all duration-700 hover:scale-[1.02]">
                                    <Image
                                        src={speaker.image}
                                        alt={speaker.name}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-90 z-10"></div>
                                    <div className="absolute bottom-8 left-8 z-20">
                                        <p className="text-highlight-yellow text-[10px] font-black uppercase tracking-widest mb-1">{speaker.role}</p>
                                        <h3 className="text-xl md:text-2xl font-black font-righteous text-white">{speaker.name}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Segmented Dot Indicator */}
                    <motion.div 
                        className="flex justify-center gap-3 mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-500 ${Math.round((scrollProgress / 100) * 4) === i
                                    ? "w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                    : "w-2 bg-white/10"
                                    }`}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
