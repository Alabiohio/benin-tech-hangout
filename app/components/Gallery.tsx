import Image from "next/image";

const images = [
    { src: "/BTH-32.JPG.jpeg", alt: "Tech enthusiasts at Benin Tech Hangout 1.0", className: "w-full aspect-[4/3] rounded-2xl shadow-2xl relative z-10 scale-105" },
    { src: "/BTH-6.JPG.jpeg", alt: "Networking session", className: "w-full aspect-[3/4] rounded-2xl shadow-xl relative z-20 -mt-12 md:-mt-24 ml-6 md:ml-12 border-4 border-white" },
    { src: "/BTH-7.JPG.jpeg", alt: "Industry leaders speaking", className: "w-full aspect-square rounded-2xl shadow-lg relative z-0 -ml-8 md:-ml-16 mt-4 opacity-80" },
    { src: "/BTH-3-1.JPG.jpeg", alt: "Community engagement", className: "w-full aspect-video rounded-2xl shadow-2xl relative z-30 -mt-16 md:-mt-32 -mr-4 md:-mr-8 border-4 border-white" },
];

export default function Gallery() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content Section */}
                    <div className="lg:w-1/2">
                        <div
                            data-aos="fade-up"
                            className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-biro-blue uppercase bg-blue-50 rounded-full"
                        >
                            A Look Back
                        </div>
                        <h2
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
                        >
                            Benin Tech Hangout <span className="text-biro-blue"> 1.0</span>
                        </h2>

                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p data-aos="fade-up" data-aos-delay="400">
                                The first edition of Benin Tech Hangout held last year brought together tech enthusiasts,
                                professionals, and community leaders from different parts of the ecosystem.
                            </p>
                            <p
                                data-aos="fade-up"
                                data-aos-delay="600"
                                className="font-medium text-gray-900 italic border-l-4 border-highlight-yellow pl-4"
                            >
                                It sparked conversations, built new connections, and proved one thing clearly &gt; Benin is
                                ready.
                            </p>
                            <p data-aos="fade-up" data-aos-delay="800">
                                Benin Tech Hangout 2.0 builds on that foundation, with more partners, more voices, and
                                a bigger vision.
                            </p>
                        </div>
                    </div>

                    {/* Overlapping Image Grid */}
                    <div className="lg:w-1/2 relative mt-16 lg:mt-0">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-12">
                                <div
                                    data-aos="zoom-in-up"
                                    data-aos-delay="200"
                                    className="relative group transition-all duration-500 hover:z-40"
                                >
                                    <Image
                                        src={images[0].src}
                                        alt={images[0].alt}
                                        width={400}
                                        height={300}
                                        className={images[0].className + " object-cover transition-transform duration-500 group-hover:scale-110"}
                                    />
                                </div>
                                <div
                                    data-aos="zoom-in-up"
                                    data-aos-delay="400"
                                    className="relative group transition-all duration-500 hover:z-40"
                                >
                                    <Image
                                        src={images[1].src}
                                        alt={images[1].alt}
                                        width={400}
                                        height={533}
                                        className={images[1].className + " object-cover transition-transform duration-500 group-hover:scale-110"}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div
                                    data-aos="zoom-in-up"
                                    data-aos-delay="600"
                                    className="relative group transition-all duration-500 hover:z-40"
                                >
                                    <Image
                                        src={images[2].src}
                                        alt={images[2].alt}
                                        width={400}
                                        height={400}
                                        className={images[2].className + " object-cover transition-transform duration-500 group-hover:scale-110"}
                                    />
                                </div>
                                <div
                                    data-aos="zoom-in-up"
                                    data-aos-delay="800"
                                    className="relative group transition-all duration-500 hover:z-40"
                                >
                                    <Image
                                        src={images[3].src}
                                        alt={images[3].alt}
                                        width={400}
                                        height={225}
                                        className={images[3].className + " object-cover transition-transform duration-500 group-hover:scale-110"}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Decorative Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-biro-blue/5 rounded-full blur-[120px] -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
