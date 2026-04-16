import Image from "next/image";

export default function Organizer() {
    return (
        <section className="py-24 bg-gradient-to-br from-[#0C1531] to-[#050A1F] border-t border-white/[0.02]">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-black font-righteous text-white mb-8">Organized By</h2>

                <div className="max-w-md mx-auto bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col items-center hover:-translate-y-2 transition-transform duration-500">
                    <div className="relative w-64 h-32 mb-6">
                        <Image
                            src="/prolineDarkLogo.png"
                            alt="Proline Groups Logo"
                            fill
                            className="object-contain brightness-0 invert opacity-80"
                        />
                    </div>
                    <h3 className="text-xl font-black font-righteous text-white mb-2 uppercase tracking-wider">Proline Groups</h3>
                    <p className="text-blue-100/60 font-medium">
                        Driving tech excellence and community growth in Benin City.
                    </p>
                </div>
            </div>
        </section>
    );
}
