import Image from "next/image";

export default function Organizer() {
    return (
        <section className="relative">
            {/* Background split for overlapping effect */}
            <div className="absolute inset-0 flex flex-col">
                <div className="w-full h-1/2 bg-[#f8fbff]"></div>
                <div className="w-full h-1/2 bg-slate-950"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="bg-[#0A0F24] rounded-[3rem] p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl border border-white/10">
                    <h2 className="text-3xl md:text-4xl font-black font-righteous text-white mb-4">Organized By</h2>

                    <div className="max-w-md mx-auto p-2 flex flex-col items-center hover:-translate-y-2 transition-transform duration-500">
                        <div className="relative w-64 h-32">
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
