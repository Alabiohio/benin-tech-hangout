import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-24 relative bg-white border-y border-blue-100">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <div className="w-full h-[400px] rounded-2xl border border-blue-100 relative overflow-hidden group">
                                <Image
                                    src="/BTH-9-1.jpg"
                                    alt="Benin Tech Hangout Community"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-[#0f2f6b]/20 group-hover:bg-[#0f2f6b]/10 transition-colors"></div>
                            </div>

                            <div className="absolute -bottom-10 -left-10 md:left-10 bg-white p-6 rounded-2xl border border-blue-100 max-w-xs hidden md:block group hover:-translate-y-2 transition-transform duration-500">
                                <p className="text-biro-blue font-black font-righteous text-4xl mb-1">3000+</p>
                                <p className="text-slate-600 font-bold uppercase tracking-wider text-sm">Attendees</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl md:text-6xl font-black font-righteous text-biro-blue-dark mb-6 leading-tight">
                            Uniting Benin&apos;s <span className="text-biro-blue">Tech Future</span>
                        </h2>
                        <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                            <span className="font-bold text-biro-blue-dark">Benin Tech Hangout 2.0</span> is a community-driven gathering designed to bring together builders, thinkers, and doers across the tech ecosystem.
                        </p>
                        <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                            From developers and designers to founders and ecosystem leaders, policy makers and government bodies, this is where Benin&apos;s tech future is shaped through real conversations, collaboration, and shared vision.
                        </p>
                        <p className="text-lg text-biro-blue-dark mb-8 leading-relaxed italic font-medium border-l-[3px] border-highlight-yellow pl-5 py-1">
                            We&apos;re not just hosting an event. We&apos;re building a connected, thriving tech ecosystem in Edo State.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
