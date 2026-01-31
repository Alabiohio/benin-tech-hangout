export default function VisionMission() {
    return (
        <section className="py-24 bg-biro-blue relative overflow-hidden text-white">
            {/* Mesh Gradient / Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-biro-blue via-biro-blue-dark to-black opacity-90"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400 opacity-20 blur-[120px] rounded-full animate-drift"></div>
                <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-highlight-yellow opacity-10 blur-[100px] rounded-full animate-drift-slow"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Vision */}
                    <div data-aos="fade-right">
                        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-wider text-highlight-yellow uppercase bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
                            Our Vision
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                            To <span className="text-highlight-yellow underline decoration-highlight-yellow/30 underline-offset-8">strengthen and grow</span> <br />
                            Benin City’s tech ecosystem.
                        </h2>
                        <p className="text-blue-100/90 text-xl leading-relaxed mb-8 max-w-xl">
                            We aim to create a world-class environment where tech talents, founders, and organizations collaborate to drive innovation and economic prosperity in Benin City and beyond.
                        </p>
                    </div>

                    {/* Mission */}
                    <div
                        data-aos="fade-left"
                        className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl relative"
                    >
                        {/* Glass reflection effect */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-3xl"></div>

                        <div className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-wider text-white uppercase bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                            Our Mission
                        </div>

                        <ul className="space-y-8">
                            {[
                                { id: 1, title: "Inform", desc: "Providing access to the latest industry trends, tools, and knowledge." },
                                { id: 2, title: "Inspire", desc: "Showcasing success stories to motivate the next generation of builders." },
                                { id: 3, title: "Connect", desc: "Building lasting relationships between talent, employers, and investors." }
                            ].map((item) => (
                                <li key={item.id} className="flex gap-6 group">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-highlight-yellow text-biro-blue flex items-center justify-center font-extrabold text-2xl shadow-[0_0_20px_rgba(255,215,0,0.4)] group-hover:scale-110 transition-transform">
                                        {item.id}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-blue-100/80 text-lg leading-relaxed">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
