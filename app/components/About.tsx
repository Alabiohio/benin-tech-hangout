import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <div className="w-full h-[400px] rounded-2xl border border-biro-blue/10 relative overflow-hidden shadow-2xl group">
                                <Image
                                    src="/BTH-9-1.jpg"
                                    alt="Benin Tech Hangout Community"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-biro-blue/40 to-transparent"></div>

                                {/* Decorative elements */}
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-highlight-yellow rounded-full blur-2xl opacity-40 animate-pulse"></div>
                                <div className="absolute -top-6 -left-6 w-32 h-32 bg-biro-blue rounded-full blur-3xl opacity-20"></div>
                            </div>


                            {/* Floating card */}
                            <div className="absolute -bottom-10 -left-10 md:left-10 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-xs hidden md:block">
                                <p className="text-biro-blue font-bold text-4xl mb-1">3000+</p>
                                <p className="text-gray-600 font-medium">Attendees</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-biro-blue uppercase bg-blue-50 rounded-full">
                            About The Event
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black font-righteous text-gray-900 mb-6 leading-tight">
                            Uniting Benin's <span className="text-biro-blue">Tech Community</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            <span className="font-bold text-biro-blue">Benin Tech Hangout 2.0</span> is a free tech community event focused on bringing together tech talents, founders, students, brands, companies, and organizations to strengthen and grow Benin City’s tech ecosystem.
                        </p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Our goal is to create a collaborative environment where innovation thrives. By connecting the various stakeholders in the tech space, we are building a foundation for sustainable growth and positioning Benin City as a leading tech hub in Nigeria.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "Connect with industry leaders and mentors",
                                "Discover career-changing opportunities",
                                "Showcase your innovations to a wider audience"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-highlight-yellow flex items-center justify-center text-biro-blue font-bold text-xs">
                                        ✓
                                    </span>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
