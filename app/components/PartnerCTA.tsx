import Button from "./Button";

export default function PartnerCTA() {
    return (
        <div className="w-full px-6 py-32 relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
            <div className="container mx-auto relative z-10 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-stretch">
                    <div className="lg:flex-1 flex flex-col justify-between">
                        <h2 className="text-5xl md:text-7xl font-black font-righteous text-gray-900 leading-tight mb-8">
                            Grow With the <span className="text-transparent bg-clip-text bg-gradient-to-r from-biro-blue to-blue-600">Ecosystem</span>
                        </h2>
                        <p className="text-lg text-gray-600 font-medium leading-relaxed mb-6 max-w-xl">
                            Partner with us to reach a fast-growing tech audience and position your brand at the center of innovation in Benin City.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
                            Align your brand with cutting-edge technology and thought leadership. Showcase your commitment to innovation.
                        </p>
                    </div>

                    <div className="lg:flex-1 flex items-center justify-center lg:justify-end">
                        <div className="relative w-full max-w-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-biro-blue to-blue-600 rounded-3xl blur-2xl opacity-30"></div>
                            <div className="relative bg-white border-2 border-biro-blue/20 rounded-3xl p-10 space-y-5 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                <Button href="/sponsor" variant="biro" className="px-10 py-5 rounded-xl hover:scale-105 transition-all font-bold text-lg w-full text-center">Become a Sponsor →</Button>
                                <Button href="/partners" variant="outline" className="px-10 py-5 rounded-xl hover:scale-105 transition-all font-bold text-lg w-full text-center border-2 border-biro-blue text-biro-blue hover:bg-biro-blue hover:text-white">View all Partners</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
