import Link from 'next/link';
import { motion } from 'framer-motion';

interface WhyAttendProps {
    onRegisterClick?: () => void;
}

export default function WhyAttend({ onRegisterClick }: WhyAttendProps) {
    return (
        <section id="ecosystem-cta" className="relative py-24 md:py-32 bg-[#f8fbff] overflow-hidden isolate">
            {/* Background Marquee Text */}
            <div className="absolute inset-0 flex flex-col justify-center opacity-3 pointer-events-none -z-10 overflow-hidden">
                <motion.div 
                    animate={{ x: [0, -1000] }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="whitespace-nowrap"
                >
                    <span className="text-[10rem] md:text-[15rem] font-black font-righteous text-slate-900 leading-none">
                        ECOSYSTEM ECOSYSTEM ECOSYSTEM ECOSYSTEM 
                    </span>
                </motion.div>
                <motion.div 
                    animate={{ x: [-1000, 0] }} 
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="whitespace-nowrap"
                >
                    <span className="text-[10rem] md:text-[15rem] font-black font-righteous text-transparent stroke-text leading-none" style={{ WebkitTextStroke: '4px #0f172a' }}>
                        BUILDERS BUILDERS BUILDERS BUILDERS
                    </span>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black font-righteous text-slate-900 leading-[0.9] mb-8 uppercase"
                    >
                        Be a Part <br />
                        Of The <span className="text-highlight-yellow relative inline-block">
                            Ecosystem
                            <svg className="absolute w-full h-4 -bottom-2 left-0 text-slate-900" viewBox="0 0 100 20" preserveAspectRatio="none">
                                <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="4"/>
                            </svg>
                        </span>
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-xl md:text-xl text-slate-700 max-w-2xl mx-auto mb-8 font-medium leading-relaxed"
                    >
                        Connect with builders, innovators, and leaders shaping the future of technology in Edo State.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <button
                            onClick={onRegisterClick}
                            className="group relative w-full sm:w-auto px-8 py-3 bg-highlight-yellow text-white font-black font-oswald uppercase tracking-widest border-4 border-highlight-yellow hover:bg-transparent hover:text-highlight-yellow transition-colors duration-300 shadow-[10px_10px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:translate-y-1 hover:translate-x-1"
                        >
                            Register Now
                        </button>
                        
                        <Link
                            href="/volunteer"
                            className="w-full sm:w-auto px-8 py-3 bg-transparent border-4 border-slate-900 text-slate-900 font-black font-oswald uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-colors duration-300 shadow-[10px_10px_0px_rgba(15,23,42,0.2)] hover:shadow-[4px_4px_0px_rgba(15,23,42,0.2)] hover:translate-y-1 hover:translate-x-1 text-center"
                        >
                            Volunteer
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
