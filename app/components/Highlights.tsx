"use client";

import { motion, Variants } from "framer-motion";

const highlightItems = [
    "3000+ Attendees",
    "100+ Communities",
    "Tech Exhibition",
    "Networking",
    "Startup Pitch",
    "Tech Money Sessions",
    "Creative Economy",
    "Policy & Regulations",
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

export default function Highlights() {
    return (
        <section id="highlights" className="py-12 bg-slate-50 relative z-20 -mt-4 overflow-hidden border-t border-slate-200">
            <div className="container mx-auto relative z-10 mt-8">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4 justify-center mb-12"
                >
                    <div className="h-px w-16 bg-biro-blue/30"></div>
                    <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[12px]">Event Highlights</p>
                    <div className="h-px w-16 bg-biro-blue/30"></div>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto px-4 relative"
                >
                    {highlightItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="group relative overflow-hidden flex items-center justify-center px-5 py-6 rounded-sm bg-white border border-slate-100 border-l-4 border-l-biro-blue transition-shadow duration-300 cursor-default hover:shadow-lg hover:shadow-blue-500/5"
                        >
                            <span className="relative text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700 group-hover:text-biro-blue transition-colors leading-tight z-10 text-center">
                                {item}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

