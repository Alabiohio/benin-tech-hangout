import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";

export default function VolunteerPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans relative">
            <BackgroundWrapper />
            <Navbar />
            <main className="flex-grow relative z-10 pt-24 md:pt-32 pb-16">
                
                <section className="relative overflow-hidden py-12">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[80px] opacity-50"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-highlight-yellow/10 rounded-full blur-[60px] opacity-40"></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-6xl mx-auto">
                            
                            <div className="text-center mb-16" data-aos="fade-up">
                                <h1 className="text-5xl md:text-7xl font-black font-righteous text-white mb-4">
                                    Join The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Team</span>
                                </h1>
                                <p className="text-xl text-blue-100/70 max-w-2xl mx-auto font-light">
                                    Become a vital part of Benin Tech Hangout 2.0. Help us create an unforgettable experience for thousands of innovators in the city.
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col lg:flex-row">
                                
                                <div className="lg:w-2/5 p-10 md:p-14 bg-white/5 flex flex-col justify-center text-white relative">
                                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-50"></div>
                                    
                                    <h2 className="text-3xl md:text-4xl font-black mb-6">Why Volunteer?</h2>
                                    <p className="text-blue-100/80 mb-8 leading-relaxed">
                                        Volunteering at Benin Tech Hangout is more than just lending a hand—it's an opportunity to grow, network, and be at the core of the city's tech evolution.
                                    </p>

                                    <div className="space-y-6">
                                        {[
                                            "Exclusive access to behind-the-scenes",
                                            "Direct networking with industry leaders",
                                            "Certificate of Volunteering",
                                            "Special team swags & merch",
                                            "Free meals and team hangout"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 group">
                                                <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold shadow-inner group-hover:bg-blue-500 group-hover:text-white transition-all">
                                                    ✓
                                                </div>
                                                <span className="text-lg font-medium text-blue-50/90">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:w-3/5 p-10 md:p-14 bg-white">
                                    <h3 className="text-2xl font-black text-gray-900 mb-6 font-righteous">Volunteer Application</h3>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">First Name</label>
                                                <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-900" placeholder="John" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Last Name</label>
                                                <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-900" placeholder="Doe" required />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
                                                <input type="email" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-900" placeholder="john@example.com" required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Phone Number</label>
                                                <input type="tel" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-900" placeholder="+234 XXX XXXX" required />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Preferred Area of Volunteering</label>
                                            <select className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-900 appearance-none" required>
                                                <option value="">Select an area</option>
                                                <option>Logistics & Operations</option>
                                                <option>Media & Public Relations</option>
                                                <option>Technical Support</option>
                                                <option>Ushering & Guest Management</option>
                                                <option>Photography & Videography</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Why do you want to volunteer?</label>
                                            <textarea rows={4} className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-gray-900 resize-none" placeholder="Tell us briefly about your motivation and any relevant experience..." required></textarea>
                                        </div>

                                        <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-xl hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all active:scale-95 shadow-lg">
                                            Submit Application
                                        </button>
                                        
                                        <p className="text-xs text-gray-400 text-center mt-4">
                                            By submitting this form, you agree to our terms of service and privacy policy. 
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
