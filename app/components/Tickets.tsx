'use client';

const ticketTiers = [
    {
        name: "Regular Pass",
        price: "Free",
        features: [
            "Access to all general sessions",
            "Networking sessions"
        ],
        highlight: false,
    },
    {
        name: "Builders Pass",
        price: "₦15,000",
        features: [
            "Priority seating",
            "VIP access",
            "Exclusive sessions",
            "Branded Merch",
            "Refreshments",
            "Exclusive networking opportunities"
        ],
        highlight: true,
    },
    {
        name: "Startup/ Founders Pass",
        price: "₦30,000",
        features: [
            "Showcase your startup",
            "Connect with investors",
            "Access high-level sessions",
            "Access to Speakers",
            "Branded Merch",
            "Investors and Mentorship Program",
            "Refreshment with your PA"
        ],
        highlight: false,
    }
];

export default function Tickets({ onRegisterClick }: { onRegisterClick: () => void }) {
    return (
        <section id="tickets" className="py-24 bg-[#f8fbff] relative overflow-hidden isolate z-20">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black font-righteous text-biro-blue-dark mb-6">
                        Choose Your <span className="text-biro-blue">Experience</span>
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
                    {ticketTiers.map((tier, idx) => (
                        <div
                            key={idx}
                            className={`w-full md:w-[380px] relative p-10 rounded-xl border flex flex-col group hover:-translate-y-2 transition-transform duration-500 ${tier.highlight ? 'border-biro-blue bg-white' : 'border-blue-100 bg-white'}`}
                        >
                            <h3 className="text-2xl font-black font-righteous text-biro-blue-dark mb-2 uppercase">{tier.name}</h3>
                            <div className="mb-8">
                                <span className={`text-4xl font-black ${tier.highlight ? 'text-highlight-yellow' : 'text-biro-blue'}`}>{tier.price}</span>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow relative z-10">
                                {tier.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] mt-0.5 shrink-0 ${tier.highlight ? 'bg-red-50 text-highlight-yellow border border-red-100' : 'bg-blue-50 text-biro-blue border border-blue-100'}`}>
                                            ✓
                                        </div>
                                        <p className="text-slate-700 font-bold text-sm leading-relaxed">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={onRegisterClick}
                                className={`w-full py-4 rounded-2xl font-black font-righteous uppercase tracking-widest transition-all relative z-10 ${tier.highlight ? 'bg-highlight-yellow text-white hover:scale-105' : 'bg-[#f8fbff] border border-blue-100 text-biro-blue-dark hover:bg-blue-50 hover:scale-105'}`}
                            >
                                Get Your Pass
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
