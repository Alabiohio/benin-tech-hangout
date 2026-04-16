import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";
import Link from "next/link";

export default function VolunteerPage() {
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
                                    className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-white transition-colors group"
                                >
                                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Home
                                </Link>
                            </div>

                            {/* Page Header */}
                            <div className="text-center mb-16" data-aos="fade-up">
                                <h1 className="text-5xl md:text-7xl font-black font-righteous text-black mb-6 leading-tight">
                                    Join The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Team</span>
                                </h1>
                                <p className="text-lg md:text-xl text-black/80 max-w-2xl mx-auto font-medium leading-relaxed">
                                    Become a vital part of <span className="text-black font-bold">Benin Tech Hangout 2.0</span>. Help us create an unforgettable experience for thousands of innovators.
                                </p>
                            </div>

                            {/* Main Card */}
                            <div className="rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.7)] border border-white/10 flex flex-col lg:flex-row" data-aos="zoom-in" data-aos-delay="200">
                                
                                {/* Left — Benefits Panel (Dark) */}
                                <div className="lg:w-2/5 p-10 md:p-14 bg-[#0d1526] flex flex-col justify-center text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-60"></div>
                                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"></div>
                                    
                                    <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10 font-righteous text-white">Why Volunteer?</h2>
                                    <p className="text-gray-300 mb-10 leading-relaxed text-lg relative z-10">
                                        Volunteering at BTH is more than just lending a hand — it's an opportunity to grow, network, and lead the change.
                                    </p>

                                    <div className="space-y-5 relative z-10">
                                        {[
                                            "Exclusive backstage access",
                                            "Network with industry leaders",
                                            "Official Certificate of Contribution",
                                            "Limited edition team merch",
                                            "Team meals & after-party"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-4 group">
                                                <div className="w-8 h-8 shrink-0 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 flex items-center justify-center font-bold group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all">
                                                    ✓
                                                </div>
                                                <span className="text-base font-semibold text-gray-200 leading-tight pt-1">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right — Form Panel (White) */}
                                <div className="lg:w-3/5 p-10 md:p-16 bg-white">
                                    <h3 className="text-3xl font-black text-gray-900 mb-8 font-righteous">Application Form</h3>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider">First Name</label>
                                                <input type="text" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="John" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider">Last Name</label>
                                                <input type="text" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="Doe" required />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider">Email Address</label>
                                                <input type="email" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="john@example.com" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider">Phone Number</label>
                                                <input type="tel" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" placeholder="+234 XXX XXXX" required />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider">Preferred Area</label>
                                            <div className="relative">
                                                <select className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-gray-900 appearance-none font-medium" required>
                                                    <option value="" className="text-gray-500">Select an area of interest</option>
                                                    <option className="text-gray-900">Logistics & Operations</option>
                                                    <option className="text-gray-900">Media & Public Relations</option>
                                                    <option className="text-gray-900">Technical Support</option>
                                                    <option className="text-gray-900">Ushering & Guest Management</option>
                                                    <option className="text-gray-900">Photography & Videography</option>
                                                    <option className="text-gray-900">Other</option>
                                                </select>
                                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider">Why do you want to volunteer?</label>
                                            <textarea rows={4} className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-gray-900 resize-none font-medium placeholder:text-gray-400" placeholder="Tell us briefly about your motivation and any relevant experience..."></textarea>
                                        </div>

                                        <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-2xl hover:shadow-[0_20px_50px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-1 transition-all active:scale-95 shadow-xl">
                                            Send Application
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
