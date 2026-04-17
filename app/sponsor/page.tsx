import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";
import Link from "next/link";

export default function SponsorPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans relative bg-[#020617]">
            <BackgroundWrapper />
            <Navbar />
            <main className="flex-grow relative z-10 pt-24 md:pt-32 pb-16">
                
                <section className="relative overflow-hidden py-12">
                    {/* Background Decorative Glows */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px] opacity-50 animate-pulse"></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-6xl mx-auto">
                            
                            {/* Back Button */}
                            <div className="mb-10" data-aos="fade-right">
                                <Link 
                                    href="/" 
                                    className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-purple-500 transition-colors group"
                                >
                                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Home
                                </Link>
                            </div>

                            {/* Page Header */}
                            <div className="text-center mb-16" data-aos="fade-up">
                                <h1 className="text-5xl md:text-7xl font-black font-righteous text-black mb-6 leading-tight italic">
                                    Partner With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Innovation</span>
                                </h1>
                                <p className="text-lg md:text-xl text-black/70 max-w-2xl mx-auto font-medium leading-relaxed">
                                    Position your brand at the center of Benin City's fastest-growing tech community. Let's build the future together.
                                </p>
                            </div>

                            {/* Main Card */}
                            <div className="rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.7)] border border-white/10 flex flex-col lg:flex-row" data-aos="zoom-in" data-aos-delay="200">
                                
                                {/* Left — Benefits Panel (Dark) */}
                                <div className="lg:w-2/5 p-10 md:p-14 bg-[#0d1526] flex flex-col justify-center text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-60"></div>
                                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"></div>
                                    
                                    <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10 font-righteous text-white italic">Why Sponsor BTH?</h2>
                                    <p className="text-gray-300 mb-10 leading-relaxed text-lg relative z-10">
                                        Join a network of visionary brands supporting thousands of developers, founders, and tech enthusiasts.
                                    </p>                                                       
                                </div>

                                {/* Right — Form Panel (White) */}
                                <div className="lg:w-3/5 p-10 md:p-16 bg-white">
                                    <h3 className="text-3xl font-black text-gray-900 mb-8 font-righteous italic">Sponsorship Inquiry</h3>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider">Company Name</label>
                                                <input type="text" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="Your Brand Ltd." required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider">Industry</label>
                                                <input type="text" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="e.g. Fintech, EdTech, Venture Capital" required />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider">Contact Person</label>
                                                <input type="text" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="John Doe" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider">Work Email</label>
                                                <input type="email" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="john@brand.com" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider">Estimated Budget (Optional)</label>
                                            <select className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-gray-900 font-medium appearance-none cursor-pointer">
                                                <option value="">Select a range</option>
                                                <option value="bronze">₦1,000,000 - ₦2,500,000</option>
                                                <option value="silver">₦2,500,000 - ₦5,000,000</option>
                                                <option value="gold">₦5,000,000 - ₦10,000,000+</option>
                                                <option value="other">Others / Partnership</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider">How can we partner?</label>
                                            <textarea rows={4} className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-gray-900 resize-none font-medium placeholder:text-gray-400" placeholder="Tell us about your brand objectives and what you're looking for..."></textarea>
                                        </div>

                                        <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-2xl hover:shadow-[0_20px_50px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-1 transition-all active:scale-95 shadow-xl font-righteous italic">
                                            Send Partnership Inquiry
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
