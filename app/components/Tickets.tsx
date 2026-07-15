'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import ticketBg from '../../assets/images/1696.jpg';
import Button from './Button';

const ticketTiers = [
    {
        name: "Community Pass",
        price: "Free Access",
        features: [
            "Access to all general sessions",
            "Networking sessions",
            "Exhibitions booths",
            "Registration is Compulsory",
        ],
        aosAnime: "fade-right",
        highlight: false,
    },
    {
        name: "Explorer Pass",
        price: "₦3,500",
        features: [
            "Everything in Community Pass + Event badge",
            "Exhibitions booths",
            "Priority registration",
            "Digital certificate of attendance",
            "Limited seats",
        ],
        aosAnime: "fade-right",
        highlight: false,
    },
    {
        name: "Builders Pass",
        price: "₦10,000",
        features: [
            "Everything in Explorer Pass",
            "Access to Talent Matching Company ",
            "Exclusive networking opportunities",
            "Workshops",
            "Tech Skill Scholarship",
            "Access to Partners Merch",
            "Refreshments",
        ],
        aosAnime: "fade-up",
        highlight: true,
    },
    {
        name: "Founders Pass",
        price: "₦20,000",
        features: [
            "Everything in Builder Pass + Startup showcase",
            "Reserved Seat",
            "Connect with investors",
            "founders roundtable, startup resources",
            "Access high-level sessions & Recordings",
            "Mentorship Programs",
            "Access to the Founders Network in Edo State",
            "Access to Startup Mentorship Programs",
            "Access to the Founders Network in Benin",
            "Event Branded merch",
            "Branded merch",
            "Refreshments"
        ],
        aosAnime: "fade-up",
        highlight: false,
    },
    {
        name: "VIP Pass",
        price: "₦50,000",
        features: [
            "Priority Seat",
            "Connect with investors",
            "Access to speaker meet-and-greet",
            "Refreshment & Gift Pack",
            "Branded Merch",
            "Access to After Party",
            "Priority Media Coverage",
            "With one free regular ticket",
            "business networking",
        ],
        aosAnime: "fade-up",
        highlight: false,
    },
    {
        name: "Investors Pass",
        price: "₦200,000",
        features: [
            "Curated meetings with selected startups",
            "Priority Seat at front",
            "Access to Deal Room",
            "Access to VIP Lounge",
            "Access to all Startups",
            "Assigned PA at the Event",
            "Access to Investors Guide Deck"
        ],
        aosAnime: "fade-left",
        highlight: false,
    }
];

export default function Tickets({ onRegisterClick }: { onRegisterClick: () => void }) {
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const refreshTimer = window.setTimeout(() => {
            AOS.refresh();
        }, 200);

        return () => {
            window.clearTimeout(refreshTimer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section id="tickets" className="py-24 bg-[#f8fbff] relative overflow-hidden isolate z-20 items-center justify-center">
            <div
                className="absolute grayscale inset-0 -z-10"
                style={{
                    backgroundImage: `url(${ticketBg.src || ticketBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.12,
                }}
            />
            <div className="container mx-auto px-4 sm:px-4 md:px-12 lg:px-26 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-7xl font-black font-cabinet-grotesk text-biro-blue-dark mb-6">
                        Get Your <span className="text-biro-blue">Event Pass</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2" style={{ perspective: '1200px' }}>
                    {ticketTiers.map((tier, idx) => {
                        const tiltRotation = isLargeScreen ? (idx === 0 ? '0deg' : idx === 4 ? '0deg' : '0deg') : '0deg';
                        const sideShift = idx === 0 ? '0rem' : idx === 4 ? '0rem' : '0';
                        const cardStyle = idx === 0 || idx === 4
                            ? {
                                transform: `perspective(1200px) rotateY(${tiltRotation}) translateX(${sideShift})`,
                                transformOrigin: 'center center',
                            }
                            : undefined;

                        return (
                            <div
                                key={idx}
                                data-ticket-card
                                data-ticket-index={idx}
                                className="relative h-full"
                                data-aos={tier.aosAnime}
                                data-aos-duration="1000"
                                data-aos-easing="ease-out-cubic"
                                data-aos-once="true"
                                data-aos-delay={idx * 120}
                            >
                                {tier.highlight && (
                                    <div className="absolute -top-3 -right-4 z-50">
                                        <div className="inline-flex items-center bg-brand-red text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.15em]">
                                            Most Popular
                                        </div>
                                    </div>
                                )}
                                <div
                                    style={cardStyle}
                                    className={`relative h-full py-10 px-6 md:px-6 rounded-3xl border overflow-hidden flex flex-col group hover:-translate-y-2 transition-all duration-700 ease-out ${tier.highlight ? 'border-biro-blue bg-biro-blue-dark' : 'border-blue-100 bg-white'}`}
                                >
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="mb-1">
                                            <span className={`text-4xl md:text-5xl font-oswald font-black flex items-start ${tier.highlight ? 'text-white' : 'text-biro-blue'}`}>
                                                {tier.price.startsWith('₦') ? (
                                                    <>
                                                        <sup className="text-xl md:text-2xl mt-2 mr-1">₦</sup>
                                                        {tier.price.substring(1)}
                                                    </>
                                                ) : (
                                                    tier.price
                                                )}
                                            </span>
                                        </div>
                                        <h3 className={`text-2xl mb-8 font-black opacity-75 font-oswald ${tier.highlight ? 'text-white' : 'text-biro-blue-dark'} mb-2 uppercase`}>{tier.name}</h3>


                                        <div className="space-y-4 mb-10 flex-grow relative z-10">
                                            {tier.features.map((feature, fIdx) => {
                                                const isIncludes = feature.startsWith('Everything in');
                                                return (
                                                    <div
                                                        key={fIdx}
                                                        className={`flex gap-3 ${isIncludes ? '-ml-10 md:-ml-6 mr-4 rounded-l-none rounded-r-xl px-3 pl-9 py-3 border-2 border-l-4 font-bold shadow-md' : ''} ${isIncludes ? (tier.highlight ? 'border-white bg-white' : 'border-biro-blue bg-biro-blue text-white') : ''}`}
                                                    >
                                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] mt-0.5 shrink-0 ${isIncludes ? (tier.highlight ? 'bg-biro-blue-dark text-white' : 'bg-white text-biro-blue') : (tier.highlight ? 'bg-blue-50 text-highlight-yellow border border-blue-100' : 'bg-blue-50/50 text-biro-blue border border-blue-100/50')}`}>
                                                            ✓
                                                        </div>
                                                        <p className={`text-sm leading-relaxed ${isIncludes ? (tier.highlight ? 'text-biro-blue-dark font-extrabold' : 'text-white font-extrabold') : (tier.highlight ? 'text-white font-bold' : 'text-slate-700 font-bold')}`}>
                                                            {feature}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <Button
                                            onClick={onRegisterClick}
                                            variant={tier.highlight ? 'primary' : 'outline'}
                                            className="w-full relative z-10 hover:!text-white hover:!border-white !px-4 !py-3 text-sm whitespace-nowrap"
                                        >
                                            Get Your Pass
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
