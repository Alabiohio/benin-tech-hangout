const reasons = [
    {
        title: "Cross-field Networking",
        description: "Connect with people in tech across different fields and build meaningful relationships.",
        icon: "🤝",
    },
    {
        title: "Real Conversations",
        description: "Learn from authentic experiences and real-world insights, not just theoretical concepts.",
        icon: "💬",
    },
    {
        title: "New Opportunities",
        description: "Discover exclusive opportunities, strategic collaborations, and supportive communities.",
        icon: "🚀",
    },
    {
        title: "Shape the Future",
        description: "Take an active role in building and defining the future of Benin City’s tech ecosystem.",
        icon: "�️",
    },
];

export default function WhyAttend() {
    return (
        <section className="py-24 bg-white/30 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2
                        data-aos="fade-up"
                        className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-display"
                    >
                        Why You Should Attend
                    </h2>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="text-lg text-gray-600 mb-4"
                    >
                        You should attend if you want to connect, learn, and be part of a movement.
                    </p>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="400"
                        className="text-xl font-semibold text-biro-blue"
                    >
                        Whether you’re just starting out or already deep in the tech space, this event is for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={600 + (index * 100)}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
                        >
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:bg-biro-blue group-hover:text-white transition-colors duration-300">
                                {reason.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-biro-blue transition-colors">
                                {reason.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
