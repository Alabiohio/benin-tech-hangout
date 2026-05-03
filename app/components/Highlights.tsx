'use client';

const highlightItems = [
    "3000+ Attendees",
    "100+ Communities",
    "Tech Exhibition",
    "Networking",
    "Startup Pitch",
    "Tech Money Sessions",
    "Creative Economy",
    "Policy & Regulations",
];

export default function Highlights() {
    return (
        <section id="highlights" className="py-10 bg-slate-50 relative z-20 -mt-4 overflow-hidden border-t border-slate-200">
            <div className="container mx-auto relative z-10 mt-8">
                <div className="flex items-center gap-4 justify-center mb-10">
                    <div className="h-px w-16 bg-biro-blue"></div>
                    <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[14px]">Event Highlights</p>
                    <div className="h-px w-16 bg-biro-blue"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto px-4 relative">
                    {highlightItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="group relative overflow-hidden flex items-center justify-center px-5 py-5 rounded-xl bg-white border border-l-4 border-biro-blue transition-all duration-300 cursor-default hover:border-slate-300 hover:shadow-sm"
                        >
                            <span className="relative text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-slate-700 group-hover:text-slate-900 transition-colors opacity-90 leading-tight z-10 text-center">
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
