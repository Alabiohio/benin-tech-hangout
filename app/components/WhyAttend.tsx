import Link from 'next/link';

interface WhyAttendProps {
    onRegisterClick?: () => void;
}

export default function WhyAttend({ onRegisterClick }: WhyAttendProps) {
    return (
        <section id="ecosystem-cta" className="relative py-28 md:py-36 bg-[#0a1e3d] overflow-hidden isolate">
            {/* Decorative geometric accents */}
            <div className="absolute top-0 left-0 w-48 h-48 border border-white/[0.04] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-72 h-72 border border-white/[0.04] rounded-full translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 right-[15%] w-32 h-32 border border-white/[0.03] rotate-45 -translate-y-1/2 hidden lg:block" />
            <div className="absolute top-[20%] left-[10%] w-16 h-16 border border-white/[0.05] rotate-12 hidden md:block" />

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Tagline */}
                    <p className="text-sm md:text-base font-bold uppercase tracking-[0.25em] text-[#6b93d4] mb-6">
                        Join the Movement
                    </p>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-righteous text-white leading-[1.1] mb-5">
                        Be a Part of <br className="hidden sm:block" />
                        <span className="text-[#7eb8f0]">Benin Tech Ecosystem</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-[#8aa3c8] max-w-2xl mx-auto mb-10 leading-relaxed">
                        Connect with builders, innovators, and leaders shaping the future of technology in Edo State.
                    </p>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <span className="w-12 h-px bg-white/10" />
                        <span className="w-2 h-2 border border-[#7eb8f0]/40 rotate-45" />
                        <span className="w-12 h-px bg-white/10" />
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <button
                            onClick={onRegisterClick}
                            className="w-full sm:w-auto px-10 lg:px-12 py-3 bg-highlight-yellow text-white font-black font-righteous text-md lg:text-xl rounded-xl hover:bg-white hover:text-highlight-yellow hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-[0.15em]"
                        >
                            Register Now
                        </button>
                        <Link
                            href="/volunteer"
                            className="w-full sm:w-auto px-10 lg:px-12 py-3 bg-white border border-white/15 text-[#0a1e3d] font-black font-righteous text-md lg:text-xl rounded-xl hover:bg-white/20 hover:text-white hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-[0.15em] text-center"
                        >
                            Volunteer
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
        </section>
    );
}
