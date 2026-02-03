import Image from "next/image";

const reasons = [
    {
        title: "Cross-field Networking",
        description: "Connect with people in tech across different fields and build meaningful relationships.",
        icon: "🤝",
    },
    {
        title: "Real Conversations",
        description: "Learn from authentic experiences and real-world insights, not just theoretical concepts.",
        icon: "💬",
    },
    {
        title: "New Opportunities",
        description: "Discover exclusive opportunities, strategic collaborations, and supportive communities.",
        icon: "🚀",
    },
    {
        title: "Shape the Future",
        description: "Take an active role in building and defining the future of Benin City’s tech ecosystem.",
        icon: "🏗️",
    },
];

export default function WhyAttend() {
    return (
        <section className="py-24 bg-white/30 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-16">
                    <div className="lg:w-1/2">
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-biro-blue uppercase bg-blue-50 rounded-full">
                            Benefits
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black font-righteous text-gray-900 mb-6 leading-tight">
                            Why You Should <span className="text-biro-blue">Attend</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            You should attend if you want to:
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-700 font-medium">
                                <span className="w-2 h-2 rounded-full bg-highlight-yellow"></span>
                                Connect with people in tech across different fields
                            </li>
                            <li className="flex items-center gap-3 text-gray-700 font-medium">
                                <span className="w-2 h-2 rounded-full bg-highlight-yellow"></span>
                                Learn from real conversations, not just theory
                            </li>
                            <li className="flex items-center gap-3 text-gray-700 font-medium">
                                <span className="w-2 h-2 rounded-full bg-highlight-yellow"></span>
                                Discover opportunities, collaborations, and communities
                            </li>
                            <li className="flex items-center gap-3 text-gray-700 font-medium">
                                <span className="w-2 h-2 rounded-full bg-highlight-yellow"></span>
                                Be part of building Benin’s tech future
                            </li>
                        </ul>
                        <p className="text-xl font-semibold text-biro-blue italic">
                            Whether you’re just starting out or already deep in the tech space, this event is for you.
                        </p>
                    </div>
                    <div className="lg:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 group border-4 border-white">
                        <Image
                            src="/BTH-30-1.jpg"
                            alt="Attendees at Benin Tech Hangout"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason, index) => (
                        <div
                            key={index}
                            className="relative group p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Card Background with Glass Effect */}
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(28,57,187,0.1)] group-hover:bg-white/60"></div>

                            {/* Decorative background number */}
                            <span className="absolute top-6 right-8 text-6xl font-righteous text-biro-blue/5 select-none transition-colors duration-500 group-hover:text-biro-blue/10">
                                0{index + 1}
                            </span>

                            <div className="relative z-10">
                                <div className="w-16 h-16 mb-8 relative">
                                    {/* Icon Container with Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-biro-blue to-indigo-600 rounded-2xl rotate-6 transition-transform duration-500 group-hover:rotate-12 blur-sm opacity-20"></div>
                                    <div className="relative w-full h-full bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:bg-biro-blue group-hover:text-white">
                                        {reason.icon}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black font-righteous text-gray-900 mb-4 group-hover:text-biro-blue transition-colors duration-300">
                                    {reason.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    {reason.description}
                                </p>

                                {/* Bottom Accent Line */}
                                <div className="mt-6 w-12 h-1 bg-highlight-yellow/30 rounded-full transition-all duration-500 group-hover:w-full group-hover:bg-highlight-yellow"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
