import Link from 'next/link';

interface WhyAttendProps {
    onRegisterClick?: () => void;
}

export default function WhyAttend({ onRegisterClick }: WhyAttendProps) {
    return (
        <section id="ecosystem-cta" className="relative py-24 bg-biro-blue overflow-hidden isolate shadow-2xl">
            {/* Abstract Glows */}
            <div className="absolute top-1/2 -left-32 w-[500px] h-[500px] bg-highlight-yellow/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Title Side */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-righteous text-white leading-[1.15]">
                        Be a Part of <br />
                        <span className="text-highlight-yellow drop-shadow-sm">Benin Tech Ecosystem</span>
                    </h2>
                </div>

                {/* Buttons Side */}
                <div className="flex flex-col sm:flex-row items-center gap-5 md:w-1/2 md:justify-end w-full">
                    <button
                        onClick={onRegisterClick}
                        className="w-full sm:w-auto px-8 lg:px-10 py-5 bg-highlight-yellow text-biro-blue font-black font-righteous text-lg lg:text-xl rounded-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_30px_rgba(252,211,77,0.3)] uppercase tracking-widest"
                    >
                        Register
                    </button>
                    <Link
                        href="/volunteer"
                        className="w-full sm:w-auto px-8 lg:px-10 py-5 bg-white/10 backdrop-blur-md border-[2px] border-white/20 text-white font-black font-righteous text-lg lg:text-xl rounded-2xl hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl uppercase tracking-widest text-center"
                    >
                        Volunteers
                    </Link>
                </div>

            </div>
        </section>
    );
}
