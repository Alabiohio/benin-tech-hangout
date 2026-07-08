import Button from './Button';

export default function ExhibitionCTA() {
    return (
        <section className="relative py-14 bg-black md:py-14 pb-24 md:pb-26">
            {/* Animated geometric background grid */}
            <div className="absolute inset-0 opacity-15">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(90deg, #007cf9 1px, transparent 1px), linear-gradient(#007cf9 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Glowing network accent lines */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#007cf9] rounded-full blur-3xl opacity-10 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#007cf9] rounded-full blur-3xl opacity-10 translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative -mt-32 md:-mt-40">
                <div className="mx-auto max-w-4xl" data-aos="flip-left" data-aos-duration="3000" data-aos-easing="ease-out-cubic" data-aos-once="true">
                    {/* Top accent bar */}
                  
                    {/* Main card with premium design - positioned absolutely to overlap */}
                    <div className="relative group absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-full max-w-4xl z-50" style={{transform: 'skewX(-6deg)'}} data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-out-cubic" data-aos-once="true">
                        {/* Gradient border effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#007cf9] via-[#007cf9] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                        {/* Main content container */}
                        <div className="relative rounded-2xl border border-[#007cf9]/30 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f1e] to-[#000000] p-8 md:p-12 backdrop-blur-xl overflow-hidden">
                            {/* Geometric corner accent - top right */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 border-2 border-[#007cf9]/20 rounded-full opacity-50"></div>
                            
                            {/* Geometric corner accent - bottom left */}
                            <div className="absolute -bottom-32 -left-32 w-64 h-64 border-2 border-[#007cf9]/10 opacity-30"></div>

                            <div className="relative z-10 w-full text-center" style={{transform: 'skewX(6deg)'}} data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200" data-aos-once="true">
                                <h3 className="mb-4 text-3xl md:text-4xl font-black font-cabinet-grotesk text-white leading-tight">
                                    Apply for Exhibition
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#007cf9] to-[#00d9ff]">
                                        Booth Slot or Vendors Slot
                                    </span>
                                </h3>

                                <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-gray-300 mb-8 font-medium">
                                    Showcase your brand, products, and services to attendees and partners at Benin Tech Fest 2.0. Be part of the biggest tech ecosystem uniting in Edo State.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <Button 
                                        href="/exhibitor" 
                                        variant="primary" 
                                        className="px-8 py-3 hover:from-[#0099ff] hover:to-[#00d9ff] text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,124,249,0.3)] hover:shadow-[0_0_30px_rgba(0,124,249,0.5)]"
                                    >
                                        Apply Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom accent bar - hidden in this layout as card is positioned absolutely */}
                    <div className="hidden mt-8 h-1 w-20 ml-auto bg-gradient-to-l from-[#007cf9] to-transparent rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
