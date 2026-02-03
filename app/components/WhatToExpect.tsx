import Image from "next/image";

export default function WhatToExpect() {
    const expectations = [
        {
            title: "Insightful Conversations",
            desc: "Tech conversations and panel sessions providing deep industry insights."
        },
        {
            title: "Networking 2.0",
            desc: "Connect with tech professionals, brands, and companies driving the ecosystem."
        },
        {
            title: "Community & Ecosystem",
            desc: "Engage in vital ecosystem discussions and shared community growth."
        },
        {
            title: "Exhibition Series",
            desc: "Explore a welcoming space to learn, share, and connect with builders."
        }
    ];

    return (
        <section className="py-24 bg-white/30 backdrop-blur-sm overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <div
                            className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-biro-blue uppercase bg-blue-50 rounded-full"
                        >
                            The Experience
                        </div>
                        <h2
                            className="text-4xl md:text-6xl font-black font-righteous text-gray-900 mb-6"
                        >
                            What to <span className="text-biro-blue">Expect</span>
                        </h2>
                        <p
                            className="text-lg text-gray-600 mb-10"
                        >
                            Prepare for an immersive experience designed to challenge your thinking and spark creativity.
                        </p>

                        <div className="space-y-8">
                            {expectations.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex group"
                                >
                                    <div className="mr-6 flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full border-2 border-biro-blue flex items-center justify-center relative bg-white">
                                            <div className="w-3 h-3 bg-biro-blue rounded-full group-hover:scale-125 transition-transform"></div>
                                        </div>
                                        {idx !== expectations.length - 1 && <div className="h-full w-0.5 bg-gray-200 my-2 group-hover:bg-biro-blue/50 transition-colors"></div>}
                                    </div>
                                    <div className="pb-8">
                                        <h3 className="text-xl font-black font-righteous text-gray-900 mb-2 group-hover:text-biro-blue transition-colors">{item.title}</h3>
                                        <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            className="mt-6 p-6 bg-biro-blue/5 rounded-2xl border-l-4 border-biro-blue"
                        >
                            <p className="text-xl font-bold text-biro-blue-dark italic">
                                "No pressure. No gatekeeping. Just tech people building together."
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative mt-12 lg:mt-0">
                        {/* Decorative Image area */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-12">
                                <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-blue-100 group">
                                    <Image
                                        src="/BTH-40-1.JPG.jpeg"
                                        alt="Tech event exhibition"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors"></div>
                                </div>
                                <div
                                    className="h-64 bg-biro-blue rounded-2xl w-full shadow-lg flex items-center justify-center text-white/10"
                                >
                                    <span className="text-4xl font-bold rotate-90">EXHIBIT</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div
                                    className="h-64 bg-highlight-yellow rounded-2xl w-full opacity-80 shadow-lg flex items-center justify-center text-biro-blue/20"
                                >
                                    <span className="text-4xl font-bold -rotate-12">SHARE</span>
                                </div>
                                <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-blue-200 group">
                                    <Image
                                        src="/BTH-45.jpg"
                                        alt="Tech community connection"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors"></div>
                                </div>
                            </div>
                        </div>

                        {/* Background decoration */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-highlight-yellow/20 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
