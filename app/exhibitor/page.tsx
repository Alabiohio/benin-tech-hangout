import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";
import Link from "next/link";

export default function ExhibitorPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans relative bg-[#f8fbff]">
            <BackgroundWrapper />
            <Navbar />
            <main className="flex-grow relative z-10 pt-24 md:pt-32 pb-16">
                <section className="relative overflow-hidden py-12">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-10" data-aos="fade-right">
                                <Link href="/" className="inline-flex items-center gap-2 text-biro-blue font-bold hover:text-highlight-yellow transition-colors group">
                                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Home
                                </Link>
                            </div>

                            <div className="text-center mb-16" data-aos="fade-up">
                                <h1 className="text-5xl md:text-7xl font-black font-righteous text-biro-blue-dark mb-4">
                                    Showcase Your <span className="text-biro-blue">Brand</span>
                                </h1>
                                <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                                    Expose your products, services, and innovations to over 1000+ tech enthusiasts, founders, and leaders at Benin Tech Hangout 2.0.
                                </p>
                            </div>

                            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-blue-100 flex flex-col lg:flex-row-reverse">
                                <div className="lg:w-2/5 p-10 md:p-14 bg-[#0f2f6b] flex flex-col justify-center text-white relative">
                                    <h2 className="text-3xl md:text-4xl font-black mb-6 text-white font-righteous">Exhibitor Perks</h2>
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
                                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Preferred Booth Size</label>
                                            <select className="w-full px-5 py-3.5 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 appearance-none" required>
                                                <option value="">Select a package</option>
                                                <option>Standard Booth (3x3m)</option>
                                                <option>Premium Booth (6x3m)</option>
                                                <option>Custom Island / Large Setup</option>
                                                <option>Startup Desk (Mini)</option>
                                            </select>
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
