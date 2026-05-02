export default function EventDetails() {
    return (
        <section className="relative overflow-hidden bg-white">
            <div className="container mx-auto px-6 py-12 relative z-10">
                <div className="bg-[#f8fbff] rounded-3xl border border-blue-100 p-8 md:px-16 md:py-12 flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
                    <div className="flex items-center gap-6 group">
                        <div className="w-16 h-16 rounded-[1.25rem] bg-white border border-blue-100 flex items-center justify-center text-3xl transition-all duration-300">
                            📍
                        </div>
                        <div>
                            <p className="text-biro-blue text-xs font-black font-righteous uppercase tracking-[0.2em] mb-1.5">Location</p>
                            <p className="font-bold text-2xl text-biro-blue-dark tracking-tight">Benin City, Edo State</p>
                            <div className="mt-2 h-0.5 w-8 bg-highlight-yellow/60 rounded-full"></div>
                        </div>
                    </div>

                    <div className="h-20 w-px bg-blue-100 hidden md:block"></div>
                    <div className="w-full h-px bg-blue-100 md:hidden"></div>

                    <div className="flex items-center gap-6 group">
                        <div className="w-16 h-16 rounded-[1.25rem] bg-white border border-blue-100 flex items-center justify-center text-3xl transition-all duration-300">
                            📅
                        </div>
                        <div>
                            <p className="text-biro-blue text-xs font-black font-righteous uppercase tracking-[0.2em] mb-1.5">Date</p>
                            <p className="font-bold text-2xl text-biro-blue-dark tracking-tight">October 2, 2026</p>
                        </div>
                    </div>

                    <div className="h-20 w-px bg-blue-100 hidden md:block"></div>
                    <div className="w-full h-px bg-blue-100 md:hidden"></div>

                    <div className="flex items-center gap-6 group">
                        <div className="w-16 h-16 rounded-[1.25rem] bg-white border border-blue-100 flex items-center justify-center text-3xl transition-all duration-300">
                            🎟️
                        </div>
                        <div>
                            <p className="text-biro-blue text-xs font-black font-righteous uppercase tracking-[0.2em] mb-1.5">Access</p>
                            <p className="font-bold text-2xl text-biro-blue-dark tracking-tight">Free & Paid Passes</p>
                            <p className="text-sm text-slate-500 mt-1 font-medium italic">Available now</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
