'use client';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SponsorPage() {
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
                                    Partner With <span className="text-biro-blue">Innovation</span>
                                </h1>
                                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                                    Position your brand at the center of Benin City&apos;s fastest-growing tech community. Let&apos;s build the future together.
                                </p>
                            </motion.div>

                            <motion.div 
                                className="rounded-[2.5rem] overflow-hidden border border-blue-100 flex flex-col lg:flex-row"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="lg:w-2/5 p-10 md:p-14 bg-[#0f2f6b] flex flex-col justify-center text-white relative overflow-hidden">
                                    <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10 font-righteous text-white">Why Sponsor BTH?</h2>
                                    <p className="text-blue-100/80 mb-10 leading-relaxed text-lg relative z-10">
                                        Join a network of visionary brands supporting thousands of developers, founders, and tech enthusiasts.
                                    </p>
                                </div>

                                <div className="lg:w-3/5 p-10 md:p-16 bg-white">
                                    <h3 className="text-3xl font-black text-biro-blue-dark mb-8 font-righteous">Sponsorship Inquiry</h3>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Company Name</label>
                                                <input type="text" className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="Your Brand Ltd." required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Industry</label>
                                                <input type="text" className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="e.g. Fintech, EdTech, Venture Capital" required />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Contact Person</label>
                                                <input type="text" className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="John Doe" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Work Email</label>
                                                <input type="email" className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="john@brand.com" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Estimated Budget (Optional)</label>
                                            <select className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium appearance-none cursor-pointer">
                                                <option value="">Select a range</option>
                                                <option value="bronze">₦1,000,000 - ₦2,500,000</option>
                                                <option value="silver">₦2,500,000 - ₦5,000,000</option>
                                                <option value="gold">₦5,000,000 - ₦10,000,000+</option>
                                                <option value="other">Others / Partnership</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">How can we partner?</label>
                                            <textarea rows={4} className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 resize-none font-medium placeholder:text-gray-400" placeholder="Tell us about your brand objectives and what you're looking for..."></textarea>
                                        </div>

                                        <button type="submit" className="w-full py-5 bg-biro-blue hover:bg-biro-blue-dark text-white font-black text-xl rounded-2xl transition-all active:scale-95 font-righteous">
                                            Send Partnership Inquiry
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
