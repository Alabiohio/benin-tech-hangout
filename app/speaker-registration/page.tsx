'use client';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SpeakerRegistrationPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans relative bg-[#f8fbff]">
            <BackgroundWrapper />
            <Navbar />
            <main className="flex-grow relative z-10 pt-24 md:pt-32 pb-16">
                <section className="relative overflow-hidden py-12">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                className="mb-10"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Link href="/" className="inline-flex items-center gap-2 text-biro-blue font-bold hover:text-highlight-yellow transition-colors group">
                                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Home
                                </Link>
                            </motion.div>

                            <motion.div
                                className="text-center mb-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-5xl md:text-7xl font-black font-righteous text-biro-blue-dark mb-6 leading-tight">
                                    Take The <span className="text-biro-blue">Stage</span>
                                </h1>
                                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                                    Whether you want to share your expertise or recommend a visionary leader, help us shape the conversations at <span className="text-biro-blue-dark font-bold">BTF 2.0</span>.
                                </p>
                            </motion.div>

                            <motion.div
                                className="rounded-[2.5rem] overflow-hidden border border-blue-100 flex flex-col lg:flex-row"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="lg:w-2/5 p-10 md:p-14 bg-[#0f2f6b] flex flex-col justify-center text-white relative overflow-hidden">
                                    <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10 font-righteous text-white">Why Speak at BTH?</h2>
                                    <p className="text-blue-100/80 mb-10 leading-relaxed text-lg relative z-10">
                                        Sharing your story at Benin Tech Fest connects you with thousands of developers, founders, and investors.
                                    </p>

                                    <div className="space-y-5 relative z-10">
                                        {[
                                            "Influence the next generation of builders",
                                            "Network with international tech leaders",
                                            "Maximum visibility across ecosystem channels",
                                            "Exclusive speaker lounge & VIP access",
                                            "Professional photography & recordings"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-4 group">
                                                <div className="w-8 h-8 shrink-0 rounded-lg bg-white/10 border border-white/15 text-white flex items-center justify-center font-bold transition-all">
                                                    ✓
                                                </div>
                                                <span className="text-base font-semibold text-blue-50 leading-tight pt-1">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 p-6 rounded-2xl bg-white/10 border border-white/10 relative z-10">
                                        <p className="text-sm text-[#fecaca] font-black uppercase tracking-widest mb-2">Selection Process</p>
                                        <p className="text-xs text-white/70 leading-relaxed font-bold">
                                            Our editorial team reviews all suggestions and applications. Selected speakers will be contacted via email.
                                        </p>
                                    </div>
                                </div>

                                <div className="lg:w-3/5 p-10 md:p-16 bg-white">
                                    <h3 className="text-3xl font-black text-biro-blue-dark mb-8 font-righteous">Speaker Nomination</h3>
                                    <form className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">I am...</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <label className="flex items-center gap-3 p-4 border border-blue-100 rounded-xl cursor-pointer hover:border-biro-blue transition-all has-[:checked]:border-biro-blue has-[:checked]:bg-blue-50/50">
                                                    <input type="radio" name="application_type" value="self" className="w-5 h-5 accent-blue-600" defaultChecked />
                                                    <span className="font-bold text-gray-900">Applying to speak</span>
                                                </label>
                                                <label className="flex items-center gap-3 p-4 border border-blue-100 rounded-xl cursor-pointer hover:border-biro-blue transition-all has-[:checked]:border-biro-blue has-[:checked]:bg-blue-50/50">
                                                    <input type="radio" name="application_type" value="suggest" className="w-5 h-5 accent-blue-600" />
                                                    <span className="font-bold text-gray-900">Suggesting a speaker</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Your Name</label>
                                                <input type="text" className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="John Doe" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Your Email</label>
                                                <input type="email" className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="john@example.com" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Speaker Name (if suggesting)</label>
                                            <input type="text" className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="Name of the person you're suggesting" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Talk Topic / Areas of Expertise</label>
                                            <input type="text" className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="e.g. AI, FinTech, Creative Economy, Scaling Tech Roles" required />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Why should they/you speak?</label>
                                            <textarea rows={4} className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 resize-none font-medium placeholder:text-gray-400" placeholder="Tell us briefly about the impact and relevance..."></textarea>
                                        </div>

                                        <button type="submit" className="w-full py-5 bg-biro-blue hover:bg-biro-blue-dark text-white font-black text-xl rounded-2xl transition-all active:scale-95 font-righteous">
                                            Submit Nomination
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
