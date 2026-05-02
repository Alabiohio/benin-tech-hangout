'use client';

const highlightItems = [
    { label: "3000+ Attendees", icon: "🚀", text: "text-biro-blue" },
    { label: "100+ Communities", icon: "🤖", text: "text-biro-blue-dark" },
    { label: "Tech Exhibition", icon: "💼", text: "text-biro-blue" },
    { label: "Networking", icon: "🤝", text: "text-biro-blue-dark" },
    { label: "Startup Pitch", icon: "💡", text: "text-highlight-yellow" },
    { label: "Tech Money Sessions", icon: "💰", text: "text-biro-blue" },
    { label: "Creative Economy", icon: "✅", text: "text-biro-blue-dark" },
    { label: "Policy & Regulations", icon: "📜", text: "text-highlight-yellow" },
];

export default function Highlights() {
    return (
        <section id="highlights" className="py-20 bg-[#f8fbff] relative z-20 -mt-12 overflow-hidden border-t border-blue-100">
            <div className="container mx-auto relative z-10 mt-8">
                <div className="flex items-center gap-4 justify-center mb-10">
                    <div className="h-px w-16 bg-blue-200"></div>
                    <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[10px]">Event Highlights</p>
                    <div className="h-px w-16 bg-blue-200"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto px-4 relative">
                    {highlightItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="group relative overflow-hidden flex items-center justify-between px-5 py-4 rounded-xl bg-white border border-blue-100 transition-colors duration-300 cursor-default hover:border-blue-200"
                        >
                            <span className={`relative text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] ${item.text} opacity-90 leading-tight pr-2 z-10`}>
                                {item.label}
                            </span>
                            <span className="relative text-2xl transition-transform duration-300 z-10 group-hover:scale-110">
                                {item.icon}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
