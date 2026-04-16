import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-24 relative bg-gradient-to-br from-[#04091A] to-[#0C1531] border-y border-white/[0.02]">
            {/* Ambient Background */}
            <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <div className="w-full h-[400px] rounded-2xl border border-white/10 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
                                <Image
                                    src="/BTH-9-1.jpg"
                                    alt="Benin Tech Hangout Community"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                                {/* Decorative elements */}
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-highlight-yellow rounded-full blur-2xl opacity-40 animate-pulse"></div>
                                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-30"></div>
                            </div>


                            {/* Floating card */}
                            <div className="absolute -bottom-10 -left-10 md:left-10 bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/10 max-w-xs hidden md:block group hover:-translate-y-2 transition-transform duration-500">
                                <p className="text-highlight-yellow font-black font-righteous text-4xl mb-1">3000+</p>
                                <p className="text-blue-100/70 font-bold uppercase tracking-wider text-sm">Attendees</p>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-[0.3em] text-highlight-yellow uppercase bg-white/5 border border-white/10 rounded-lg drop-shadow-md">
                            More Than an Event. A Movement.
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black font-righteous text-white mb-6 leading-tight">
                            Uniting Benin's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-lg">Tech Future</span>
                        </h2>
                        <p className="text-lg text-blue-100/70 mb-6 leading-relaxed">
                            <span className="font-bold text-white">Benin Tech Hangout 2.0</span> is a community-driven gathering designed to bring together builders, thinkers, and doers across the tech ecosystem.
                        </p>
                        <p className="text-lg text-blue-100/70 mb-6 leading-relaxed">
                            From developers and designers to founders and ecosystem leaders, Policy Makers and Government bodies, this is where Benin’s tech future is being shaped through real conversations, collaboration, and shared vision.
                        </p>
                        <p className="text-lg text-white mb-8 leading-relaxed italic font-medium border-l-[3px] border-highlight-yellow pl-5 py-1">
                            We’re not just hosting an event. We’re building a connected, thriving tech ecosystem in Edo State.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
