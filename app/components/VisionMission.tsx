import Image from "next/image";

export default function VisionMission() {
    return (
        <section className="py-24 bg-biro-blue relative overflow-hidden text-white mission-bg">
            {/* Mesh Gradient / Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400 opacity-20 blur-[120px] rounded-full animate-drift"></div>

                <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-highlight-yellow opacity-10 blur-[100px] rounded-full animate-drift-slow"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                    {/* Vision Section */}
                    <div
                        data-aos="fade-right"
                        className="group relative flex flex-col justify-center bg-black/30 backdrop-blur-md rounded-[2.5rem] p-10 md:p-14 border border-white/10 shadow-2xl overflow-hidden transition-all duration-500 hover:border-highlight-yellow/30"
                    >
                        {/* Decorative Gradient Glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-highlight-yellow opacity-5 blur-[60px] rounded-full group-hover:opacity-10 transition-opacity"></div>

                        <div className="inline-block px-4 py-1.5 mb-10 text-xs font-black font-righteous tracking-[0.2em] text-highlight-yellow uppercase bg-white/5 rounded-xl border border-white/10 backdrop-blur-md w-fit ring-1 ring-white/5">
                            Our Vision
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black font-righteous mb-8 leading-[1.15] text-white">
                            To <span className="text-highlight-yellow underline decoration-highlight-yellow/40 underline-offset-[12px] decoration-4">strengthen and grow</span> <br />
                            Benin City’s tech ecosystem.
                        </h2>

                        <p className="text-blue-50/80 text-xl font-medium leading-relaxed max-w-xl">
                            To see Benin City grow into a connected, supportive, and thriving tech ecosystem where everyone has a place, a voice, and an opportunity to grow.
                        </p>

                        {/* Bottom Decoration */}
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-highlight-yellow/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                    </div>

                    {/* Mission Section */}
                    <div
                        data-aos="fade-left"
                        data-aos-delay="200"
                        className="group relative bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 border border-white/20 shadow-2xl overflow-hidden transition-all duration-500 hover:border-white/40"
                    >
                        {/* Glass reflection effect */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[2.5rem]"></div>

                        <div className="inline-block px-4 py-1.5 mb-10 text-xs font-black font-righteous tracking-[0.2em] text-white uppercase bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm w-fit ring-1 ring-white/10">
                            Our Mission
                        </div>

                        <ul className="space-y-8 relative z-10">
                            {[
                                "To bring tech people together under one roof",
                                "To encourage collaboration instead of competition",
                                "To create visibility for talents, startups, and organizations",
                                "To strengthen the tech ecosystem in Benin, one connection at a time"
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-6 group/item">
                                    <div className="mt-1.5 flex-shrink-0 w-2.5 h-2.5 rounded-full bg-highlight-yellow ring-4 ring-highlight-yellow/20 group-hover/item:scale-150 transition-transform duration-300"></div>
                                    <p className="text-blue-100 font-bold text-lg leading-snug">{item}</p>
                                </li>
                            ))}
                        </ul>

                        {/* Corner Accent */}
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 blur-[40px] rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}


