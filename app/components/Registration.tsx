export default function Registration() {
    return (
        <section id="register" className="py-24 bg-biro-blue relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-biro-blue-dark via-biro-blue to-biro-blue-dark opacity-100"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] mix-blend-overlay"></div>
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-highlight-yellow opacity-10 blur-[120px] rounded-full animate-drift"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div
                    className="max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col md:flex-row"
                >
                    <div className="md:w-1/2 p-12 bg-white/5 flex flex-col justify-center text-white relative">
                        {/* Decorative side accent */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-highlight-yellow to-transparent opacity-50"></div>

                        <h2 className="text-5xl md:text-6xl font-black font-righteous mb-6">Secure Your Spot</h2>
                        <p className="text-blue-100/80 text-lg mb-8 leading-relaxed">
                            Don't miss out on the biggest tech event in the city. Seats are limited and filling up fast!
                        </p>

                        <div className="space-y-5">
                            {[
                                "Free Access to all sessions",
                                "Targeted Networking Opportunities",
                                "Limited Edition Swags",
                                "Evolving Ecosystem Dialogues"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-highlight-yellow/10 border border-highlight-yellow/20 text-highlight-yellow flex items-center justify-center font-bold shadow-inner group-hover:bg-highlight-yellow group-hover:text-biro-blue transition-all">
                                        ✓
                                    </div>
                                    <span className="text-lg font-medium text-blue-50/90">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:w-1/2 p-12 bg-white">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Full Name</label>
                                <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-biro-blue/10 focus:border-biro-blue outline-none transition-all text-gray-900 shadow-sm" placeholder="John Doe" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Email Address</label>
                                <input type="email" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-biro-blue/10 focus:border-biro-blue outline-none transition-all text-gray-900 shadow-sm" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Role / Interest</label>
                                <select className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-biro-blue/10 focus:border-biro-blue outline-none transition-all bg-white text-gray-900 shadow-sm">
                                    <option>Select your role</option>
                                    <option>Developer</option>
                                    <option>Designer</option>
                                    <option>Founder / Student</option>
                                    <option>Brand / Organization</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <button className="w-full py-5 bg-gradient-to-r from-biro-blue to-biro-blue-dark text-white font-black text-lg rounded-xl hover:shadow-[0_20px_40px_-10px_rgba(28,57,187,0.4)] hover:-translate-y-1 transition-all active:scale-95 shadow-xl">
                                Register Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
