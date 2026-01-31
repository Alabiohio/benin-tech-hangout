'use client';

import Link from "next/link";
import dynamic from "next/dynamic";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-white/50" />
});

export default function Hero() {
    return (
        <section className="relative bg-white text-gray-900 overflow-hidden pt-20 h-[800px] flex items-center justify-center">
            {/* 3D Background */}
            <ThreeBackground />

            {/* Grid Pattern Overlay - lighter opacity to let 3D show through */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none z-10"></div>

            <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-20">
                <div
                    data-aos="fade-down"
                    data-aos-delay="600"
                    className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-biro-blue bg-blue-50/80 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm"
                >
                    📅 Coming Soon - 2026
                </div>

                <div className="flex flex-col gap-2 mb-6 overflow-hidden">
                    <h1
                        data-aos="fade-right"
                        data-aos-delay="0"
                        className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight leading-none text-biro-blue-dark drop-shadow-sm"
                    >
                        Benin Tech Hangout
                    </h1>
                    <h1
                        data-aos="fade-left"
                        data-aos-delay="800"
                        className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight leading-tight text-biro-blue drop-shadow-sm"
                    >
                        2.0 is here
                    </h1>
                </div>

                <p
                    data-aos="fade-up"
                    data-aos-delay="1000"
                    className="max-w-2xl text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-medium bg-white/30 backdrop-blur-sm p-4 rounded-xl"
                >
                    A free tech community event bringing together talents, founders, and organizations to strengthen and grow Benin City’s tech ecosystem.
                </p>

                <div
                    data-aos="fade-up"
                    data-aos-delay="1200"
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Link
                        href="#register"
                        className="px-8 py-4 bg-biro-blue text-white text-lg font-bold rounded-full hover:bg-biro-blue-dark transition-all shadow-lg hover:shadow-biro-blue/20 transform hover:-translate-y-1"
                    >
                        Secure Your Seat
                    </Link>
                    <Link
                        href="#about"
                        className="px-8 py-4 bg-white/80 border-2 border-biro-blue text-biro-blue text-lg font-semibold rounded-full hover:bg-biro-blue hover:text-white transition-all backdrop-blur-sm"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
}
