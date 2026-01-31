export default function EventDetails() {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-biro-blue-dark via-black to-biro-blue-dark opacity-100"></div>
            <div className="container mx-auto px-6 py-12 relative z-10">
                <div
                    data-aos="fade-up"
                    className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 md:p-10 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10"
                >
                    <div className="flex items-center gap-5 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-biro-blue/20 transition-all shadow-inner">📍</div>
                        <div>
                            <p className="text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-1">Location</p>
                            <p className="font-bold text-xl text-white">Benin City, Edo State</p>
                            <p className="text-sm text-blue-200/50">Venue Announced Soon</p>
                        </div>
                    </div>

                    <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block"></div>

                    <div className="flex items-center gap-5 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-biro-blue/20 transition-all shadow-inner">📅</div>
                        <div>
                            <p className="text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-1">Timeline</p>
                            <p className="font-bold text-xl text-white">Coming Late 2026</p>
                            <p className="text-sm text-blue-200/50">Saturday, 10:00 AM WAT</p>
                        </div>
                    </div>

                    <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block"></div>

                    <div className="flex items-center gap-5 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-biro-blue/20 transition-all shadow-inner">🎟️</div>
                        <div>
                            <p className="text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-1">Access</p>
                            <p className="font-bold text-xl text-white">Free Registration</p>
                            <p className="text-sm text-blue-200/50">Strictly by Registration</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
