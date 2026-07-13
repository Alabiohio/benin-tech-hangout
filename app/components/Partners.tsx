'use client';

import Image from 'next/image';

const partners = [
    { name: "Edo Community", logo: "/partners/Edo Community.png" },
    { name: "Edo Innovates", logo: "/partners/Edo Innovates Logo  PNG.png" },
    { name: "GDSC Benin", logo: "/partners/GDSC logo Leftsided.png" },
    { name: "She Code Africa", logo: "/partners/She Code Africa.png" },
    { name: "Superteam Edo", logo: "/partners/Superteam edo.png" },
    { name: "Google", logo: "/partners/images (3).png" },
    { name: "BTH Partner", logo: "/partners/IMG-20230901-WA0047.jpg.jpeg" },
    { name: "BTH Partner", logo: "/partners/IMG-20250327-WA0006.jpg.jpeg" },
    { name: "BTH Partner", logo: "/partners/IMG-20250708-WA0039.jpg.jpeg" },
];

export default function Partners() {
    return (
        <section id="sponsors" className="py-32 pt-22 bg-[#f8f9fa] overflow-hidden">
            <div className="container mx-auto px-1 md:px-4 mb-8">
              <h2 className="text-4xl lg:text-6xl font-black font-cabinet-grotesk text-biro-blue-dark mb-6 text-center">
                        Meet Our <span className="text-biro-blue">Partners</span>
              </h2>
            </div>

            <div className="container mx-auto">
                <div className="relative py-2 bg-[#F8F9FA] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    <div className="animate-marquee">
                        <div className="marquee-content flex items-center gap-4">
                            {[...Array(2)].map((_, setIndex) => (
                                <div key={setIndex} className="flex gap-4 items-center px-2 bg-[#F8F9FA]">
                                    {partners.map((partner, idx) => (
                                        <div key={idx} className="flex items-center transition-all duration-300 bg-[#F8F9FA]">
                                            <div className="relative w-30 h-20 md:w-48 md:h-24 flex items-center justify-center p-1 mx-2 transition-shadow hover:-translate-y-1">
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={partner.logo}
                                                        alt={partner.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    overflow: hidden;
                }

                .marquee-content {
                    display: inline-flex;
                    animation: marquee 8s linear infinite;
                    will-change: transform;
                }

                .marquee-content:hover {
                    animation-play-state: paused;
                }

                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}
