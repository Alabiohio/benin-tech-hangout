'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import ticketBg from '../../assets/images/patterns1.png';
import Button from './Button';
import { ticketTiersList as ticketTiers } from '../data/tickets';


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

                        const colors = [
                            { bg: 'bg-brand-green', text: 'text-brand-green', border: 'border-brand-green/30' },
                            { bg: 'bg-brand-blue', text: 'text-brand-blue', border: 'border-brand-blue/30' },
                            { bg: 'bg-brand-purple', text: 'text-brand-purple', border: 'border-brand-purple/30' },
                            { bg: 'bg-brand-red/80', text: 'text-brand-red', border: 'border-brand-red/30' },
                            { bg: 'bg-brand-amber', text: 'text-brand-amber', border: 'border-brand-amber/30' },
                            { bg: 'bg-biro-blue-dark', text: 'text-biro-blue-dark', border: 'border-biro-blue-dark/30' }
                        ];
                        const tierColor = colors[idx % colors.length];

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
                                    <div className="absolute -top-1 right-6 md:right-8 z-50" style={{ filter: 'drop-shadow(0px 6px 6px rgba(0,0,0,0.2))' }}>
                                        <div 
                                            className={`w-16 md:w-20 bg-[#316a1b] text-white font-black uppercase text-center pt-3 pb-6 md:pt-4 md:pb-8 border-b-0`}
                                            style={{
                                                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)'
                                            }}
                                        >
                                            <span className="block text-[9px] md:text-[11px] leading-tight tracking-widest opacity-90">Most</span>
                                            <span className="block text-[9px] md:text-[11px] leading-tight tracking-widest opacity-90">Popular</span>
                                        </div>
                                    </div>
                                )}
                                <div
                                    style={cardStyle}
                                    className={`relative h-full rounded-3xl border ${tierColor.border} overflow-hidden flex flex-col group hover:-translate-y-2 transition-all duration-700 ease-out bg-white shadow-xl hover:shadow-2xl`}
                                >
                                    {/* Header Banner */}
                                    <div className={`relative px-6 py-6 flex items-center ${tierColor.bg} overflow-hidden`}>
                                        <div 
                                            className="absolute inset-0 opacity-50 mix-blend-overlay"
                                            style={{
                                                backgroundImage: `url(${ticketBg.src || ticketBg})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        />
                                        <h3 className="relative z-10 text-2xl font-black font-oswald text-white uppercase m-0">{tier.name}</h3>
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full py-8 px-6 md:px-6">
                                        <div className="mb-8">
                                            <span className={`text-4xl md:text-5xl font-oswald font-black flex items-start ${tierColor.text}`}>
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

                                        <div className="space-y-4 mb-10 flex-grow relative z-10">
                                            {tier.features.map((feature, fIdx) => {
                                                const isIncludes = feature.startsWith('Everything in');
                                                return (
                                                    <div
                                                        key={fIdx}
                                                        className={`flex gap-3 ${isIncludes ? `-ml-10 md:-ml-6 mr-4 rounded-l-none rounded-r-xl px-3 pl-9 py-3 border-2 border-l-4 font-bold shadow-md border-white ${tierColor.bg} text-white` : ''}`}
                                                    >
                                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] mt-0.5 shrink-0 ${isIncludes ? 'bg-white ' + tierColor.text : tierColor.bg + '/10 ' + tierColor.text + ' border ' + tierColor.border}`}>
                                                            ✓
                                                        </div>
                                                        <p className={`text-sm leading-relaxed ${isIncludes ? 'text-white font-extrabold' : 'text-slate-700 font-bold'}`}>
                                                            {feature}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {(() => {
                                            const tierSlug = tier.name === 'Community Pass' ? 'community'
                                                : tier.name === 'Explorer Pass' ? 'explorer'
                                                : tier.name === 'Builders Pass' ? 'builders'
                                                : tier.name === 'Founders Pass' ? 'founders'
                                                : tier.name === 'VIP Pass' ? 'vip'
                                                : tier.name === 'Investors Pass' ? 'investors'
                                                : tier.name.toLowerCase();

                                            return (
                                                <Button
                                                    href={`/registration?tier=${tierSlug}`}
                                                    variant='outline'
                                                    className={`w-full relative z-10 !px-4 !py-3 text-sm whitespace-nowrap text-white !bg-black hover:!bg-transparent hover:!text-black`}
                                                >
                                                    Get Your Pass
                                                </Button>
                                            );
                                        })()}
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
