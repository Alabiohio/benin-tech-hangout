import React from 'react';

export default function WhatToExpect() {
    const expectations = [
        {
            title: "Insightful Conversations",
            desc: "Tech conversations and panel sessions providing deep industry insights.",
            bgColor: "bg-[#A855F7]",
            textColor: "text-white"
        },
        {
            title: "Networking 2.0",
            desc: "Connect with tech professionals, brands, and companies driving the ecosystem.",
            bgColor: "bg-[#EC4899]",
            textColor: "text-white"
        },
        {
            title: "Community & Ecosystem",
            desc: "Engage in vital ecosystem discussions and shared community growth.",
            bgColor: "bg-[#F97316]",
            textColor: "text-white"
        },
        {
            title: "Exhibition Series",
            desc: "Explore a welcoming space to learn, share, and connect with builders.",
            bgColor: "bg-[#84CC16]",
            textColor: "text-gray-900"
        },
        {
            title: "Live Performance & Fun",
            desc: "Tech events don't always have to be boring. Experience the vibe.",
            bgColor: "bg-[#0EA5E9]",
            textColor: "text-white"
        }
    ];

    return (
        <section className="py-24 bg-[#0B0A11] overflow-hidden" id="what-to-expect">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16" data-aos="fade-down">
                    <h2
                        className="text-3xl md:text-5xl font-black font-righteous text-white tracking-tight"
                    >
                        What to <span className="text-white/70">expect at BTH 2.0</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                    {expectations.map((item, idx) => (
                        <div
                            key={idx}
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                            className={`relative px-8 py-3 md:p-10 lg:p-12 rounded-[2rem] md:rounded-[2.5rem] ${item.bgColor} ${item.textColor} transition-all duration-500 hover:scale-[1.02] cursor-default flex flex-col justify-center items-center text-center group border border-white/5 shadow-xl overflow-hidden ${idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                        >
                            {/* Subtle Glow Overlay */}
                            <div className="absolute -inset-24 bg-white/10 opacity-0 group-hover:opacity-20 blur-[60px] transition-opacity duration-700 rounded-full"></div>
                            
                            <h3 className="relative z-10 text-xl md:text-3xl lg:text-4xl font-black font-righteous mb-3 leading-tight uppercase tracking-tight">
                                {item.title}
                            </h3>
                            <p className="relative z-10 text-sm md:text-lg lg:text-xl font-medium opacity-90 max-w-lg leading-relaxed">
                                {item.desc}
                            </p>

                            {/* Floating Decorative Element (Smaller) */}
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <div className="text-4xl md:text-5xl lg:text-6xl font-bold font-righteous">0{idx + 1}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}





