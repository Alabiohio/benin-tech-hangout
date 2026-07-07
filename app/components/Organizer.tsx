import Image from "next/image";

export default function Organizer() {
    return (
        <section className="relative">
            {/* Background split for overlapping effect */}
            <div className="absolute inset-0 flex flex-col">
                <div className="w-full h-1/2 bg-[#f8fbff]"></div>
                <div className="w-full h-1/2 bg-white"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="bg-slate-900 rounded-4xl p-6 md:p-10 text-center max-w-2xl mx-auto shadow-2xl">
                    <h2 className="text-2xl md:text-3xl font-black font-righteous text-white mb-1">Powered By</h2>

                    <div className="max-w-md mx-auto flex flex-col items-center hover:-translate-y-1 transition-transform duration-500">
                        <div className="relative w-48 h-24">
                            <Image
                                src="/Proline logo_035534.png"
                                alt="Proline Groups Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
