import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";

export default function ExhibitorPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans relative">
            <BackgroundWrapper />
            <Navbar />
            <main className="flex-grow relative z-10 pt-24 md:pt-32 pb-16">
                
                <section className="relative overflow-hidden py-12">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[80px] opacity-50"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-highlight-yellow/10 rounded-full blur-[60px] opacity-40"></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-6xl mx-auto">
                            
                            <div className="text-center mb-16" data-aos="fade-up">
                                <h1 className="text-5xl md:text-7xl font-black font-righteous text-white mb-4">
                                    Showcase Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Brand</span>
                                </h1>
                                <p className="text-xl text-purple-100/70 max-w-2xl mx-auto font-light">
                                    Expose your products, services, and innovations to over 1000+ tech enthusiasts, founders, and leaders at Benin Tech Hangout 2.0.
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col lg:flex-row-reverse">
                                
                                <div className="lg:w-2/5 p-10 md:p-14 bg-white/5 flex flex-col justify-center text-white relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50"></div>
                                    
                                    <h2 className="text-3xl md:text-4xl font-black mb-6">Exhibitor Perks</h2>
                                    <p className="text-purple-100/80 mb-8 leading-relaxed">
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
                                                <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold shadow-inner group-hover:bg-purple-500 group-hover:text-white transition-all">
                                                    ✓
                                                </div>
                                                <span className="text-lg font-medium text-purple-50/90">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:w-3/5 p-10 md:p-14 bg-white">
                                    <h3 className="text-2xl font-black text-gray-900 mb-6 font-righteous">Exhibitor Registration</h3>
                                    <form className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Company / Brand Name</label>
                                            <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-gray-900" placeholder="Acme Corp" required />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Contact Person</label>
                                                <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-gray-900" placeholder="Jane Doe" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Phone Number</label>
                                                <input type="tel" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-gray-900" placeholder="+234 XXX XXXX" required />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
                                                <input type="email" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-gray-900" placeholder="jane@acmecorp.com" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Industry Sector</label>
                                                <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-gray-900" placeholder="e.g. Fintech, Edtech..." required />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Preferred Booth Size</label>
                                            <select className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-gray-900 appearance-none" required>
                                                <option value="">Select a package</option>
                                                <option>Standard Booth (3x3m)</option>
                                                <option>Premium Booth (6x3m)</option>
                                                <option>Custom Island / Large Setup</option>
                                                <option>Startup Desk (Mini)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Additional Requirements or Details</label>
                                            <textarea rows={3} className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-gray-900 resize-none" placeholder="Any specific power requirements, display arrangements, etc."></textarea>
                                        </div>

                                        <button type="submit" className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-black text-lg rounded-xl hover:shadow-[0_20px_40px_-10px_rgba(147,51,234,0.4)] hover:-translate-y-1 transition-all active:scale-95 shadow-lg">
                                            Request Exhibitor Package
                                        </button>

                                        <p className="text-xs text-gray-400 text-center mt-4">
                                            Our team will contact you within 24 hours with package details and pricing.
                                        </p>
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
