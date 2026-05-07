'use client';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { motion } from "framer-motion";

export default function ExhibitorPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans relative bg-[#f8fbff]">
            <BackgroundWrapper />
            <Navbar />
            <main className="flex-grow relative z-10 pt-14 md:pt-32 pb-16">
                <section className="relative overflow-hidden py-12">
                    <div className="container mx-auto px-2 relative z-10">
                        <div className="max-w-6xl mx-auto">

                            <motion.div
                                className="text-center mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-4xl md:text-6xl font-black font-righteous text-biro-blue-dark mb-4">
                                    Showcase Your <span className="text-biro-blue">Brand</span>
                                </h1>
                                <p className="text-md text-slate-600 max-w-2xl mx-auto font-medium">
                                    Expose your products, services, and innovations to over 1000+ tech enthusiasts, founders, and leaders at Benin Tech Fest 2.0.
                                </p>
                            </motion.div>

                            <div className="bg-white rounded-[1.5rem] overflow-hidden border border-blue-100 flex flex-col lg:flex-row-reverse">
                                <div className="lg:w-2/5 p-10 md:p-14 bg-[#0f2f6b] flex flex-col justify-center text-white relative">
                                    <h2 className="text-2xl md:text-3xl font-black mb-6 text-white font-righteous">Exhibitor Perks</h2>
                                    <p className="text-blue-100/80 mb-8 leading-relaxed font-medium">
                                        Position your brand at the epicenter of innovation. Connect with your target audience where they learn, network, and grow.
                                    </p>

                                    <div className="space-y-6">
                                        {[
                                            "Premium Booth Location",
                                            "Brand exposure across event media",
                                            "Direct customer acquisition",
                                            "Demo products to live audience",
                                            "Exclusive networking with VIPs"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 group">
                                                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center font-bold transition-all">
                                                    ✓
                                                </div>
                                                <span className="text-lg font-semibold text-blue-50">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:w-3/5 p-10 md:p-14 bg-white">
                                    <h3 className="text-2xl font-black text-biro-blue-dark mb-6 font-righteous">Exhibitor Registration</h3>
                                    <form className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Company / Brand Name</label>
                                            <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900" placeholder="Acme Corp" required />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Contact Person</label>
                                                <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900" placeholder="Jane Doe" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Phone Number</label>
                                                <input type="tel" className="w-full px-5 py-3.5 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900" placeholder="+234 XXX XXXX" required />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
                                                <input type="email" className="w-full px-5 py-3.5 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900" placeholder="jane@acmecorp.com" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Industry Sector</label>
                                                <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900" placeholder="e.g. Fintech, Edtech..." required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Additional Requirements or Details</label>
                                            <textarea rows={3} className="w-full px-5 py-3.5 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 resize-none" placeholder="Any specific power requirements, display arrangements, etc."></textarea>
                                        </div>

                                        <button type="submit" className="w-full py-4 bg-biro-blue hover:bg-biro-blue-dark text-white font-black text-lg rounded-xl transition-all active:scale-95 border border-blue-700">
                                            Request Exhibitor Package
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
