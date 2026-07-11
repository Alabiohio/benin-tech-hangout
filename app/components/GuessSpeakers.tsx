'use client';

import { useState } from 'react';
import Button from './Button';

const GuessSpeakers = () => {
    //const filters = ['All Speakers', 'Keynote', 'Panelists', 'Facilitators'];
    //const [selectedFilter, setSelectedFilter] = useState<string>('All Speakers');
    const [selectedFilter] = useState<string>('All Speakers');

    const speakers = [
        { id: 1, category: 'Keynote' },
    ];

    const filteredSpeakers =
        selectedFilter === 'All Speakers' ? speakers : speakers.filter(s => s.category === selectedFilter);

    return (
        <section className="py-32 px-2 bg-white relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-2 relative z-10">
                {/* Heading */}
                <div
                    className="text-left mb-12"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    data-aos-once="true"
                >
                    <h2 className="text-5xl md:text-7xl font-black font-cabinet-grotesk text-biro-blue-dark mb-6">
                        Guess the{' '} <br />
                        <span className="text-biro-blue">
                            Speakers
                        </span>
                    </h2>
                    <p className="text-gray-700 text-lg md:text-xl mx-auto leading-relaxed">
                        The stage is being set for Benin&apos;s brightest minds. Can you guess who will be sharing their vision at BTF 2.0?
                    </p>
                </div>

                {/* Filter controls 
                <div className="flex flex-wrap items-start justify-start gap-2 mb-10">
                    {filters.map((f, i) => (
                        <div key={f} className="relative" style={{ zIndex: selectedFilter === f ? 10 : filters.length - i }}>
                            <Button
                                onClick={() => setSelectedFilter(f)}
                                variant={selectedFilter === f ? 'biro' : 'outline'}
                                className="!w-auto !px-4 sm:!px-5 !py-2 !text-xs sm:!text-sm hover:!translate-y-0 hover:!translate-x-0 !border-4 -ml-[4px] first:ml-0"
                            >
                                {f}
                            </Button>
                        </div>
                    ))}
                </div> */}

                {/* Speaker Grid */}
                {filteredSpeakers.length === 0 ? (
                    <p className="text-center text-gray-500 py-12">No speakers match this filter yet.</p>
                ) : (
                    <div className="flex justify-center mb-16">
                        {filteredSpeakers.map((speaker, idx) => (
                            <div
                                key={speaker.id}
                                className="group w-full max-w-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
                                data-aos="fade-up"
                                data-aos-duration="600"
                                data-aos-delay={idx * 80}
                                data-aos-once="true"
                            >
                                <div className="relative w-full h-[270px] sm:h-[380px] md:h-[380px] bg-gradient-to-br rounded-4xl from-black to-biro-blue overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-9xl font-black font-cabinet-grotesk text-white/45 group-hover:text-blue-500/20 transition-all duration-700 select-none animate-float">
                                            ?
                                        </span>
                                    </div>

                                    {/* Decorative Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-[#020617]/40 to-transparent">
                                        <div className="h-2 w-12 bg-blue-500/30 rounded-full mb-4 group-hover:w-20 group-hover:bg-blue-500 transition-all duration-500"></div>
                                        <h3 className="text-2xl font-black font-cabinet-grotesk text-white/50 group-hover:text-white/40 transition-all duration-500 uppercase tracking-tighter">
                                            Unknown Icons
                                        </h3>
                                        <p className="text-white/90 text-xs font-bold uppercase font-oswald tracking-widest group-hover:text-blue-400/40 transition-all duration-500">
                                            Revealing Soon
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <div
                    className="flex flex-col items-center gap-6 text-center"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-once="true"
                >
                    <div>
                        <h3 className="text-2xl font-black font-cabinet-grotesk text-gray-900 mb-2">Want to Speak at BTF 2.0?</h3>
                        <p className="text-gray-500 font-medium">Share your expertise with 3,000+ attendees.</p>
                    </div>

                    <Button href="/speaker-registration" variant="biro">
                        Apply to Speak / Suggest a Speaker
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default GuessSpeakers;