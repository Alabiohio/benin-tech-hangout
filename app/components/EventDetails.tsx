export default function EventDetails() {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-biro-blue-dark via-black to-biro-blue-dark opacity-100"></div>
            <div className="container mx-auto px-6 py-12 relative z-10">
                <div
                    className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 md:px-16 md:py-12 shadow-2xl flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24"
                >
                    {/* Location Block */}
                    <div className="flex items-center gap-6 group">
                        <div className="w-16 h-16 rounded-[1.25rem] bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-biro-blue/20 transition-all duration-300 shadow-inner">
                            📍
                        </div>
                        <div>
                            <p className="text-blue-400 text-xs font-black font-righteous uppercase tracking-[0.2em] mb-1.5">Location</p>
                            <p className="font-bold text-2xl text-white tracking-tight">Benin City, Edo State</p>
                            <div className="mt-2 h-0.5 w-8 bg-highlight-yellow/40 rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Designer Divider */}
                    <div className="h-20 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block"></div>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:hidden"></div>

                    {/* Access Block */}
                    <div className="flex items-center gap-6 group">
                        <div className="w-16 h-16 rounded-[1.25rem] bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-biro-blue/20 transition-all duration-300 shadow-inner">
                            🎟️
                        </div>
                        <div>
                            <p className="text-blue-400 text-xs font-black font-righteous uppercase tracking-[0.2em] mb-1.5">Access</p>
                            <p className="font-bold text-2xl text-white tracking-tight">Free Admission</p>
                            <p className="text-sm text-blue-200/50 mt-1 font-medium italic">Strictly via registration</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
