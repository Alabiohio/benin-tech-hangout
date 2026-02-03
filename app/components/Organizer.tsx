import Image from "next/image";

export default function Organizer() {
    return (
        <section className="py-24 bg-white/40 backdrop-blur-sm border-t border-gray-100">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-black font-righteous text-gray-900 mb-8">Organized By</h2>

                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-blue-50 flex flex-col items-center">
                    <div className="relative w-64 h-32 mb-4">
                        <Image
                            src="/prolineDarkLogo.png"
                            alt="Proline Groups Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h3 className="text-xl font-black font-righteous text-gray-900 mb-2">Proline Groups</h3>
                    <p className="text-gray-600">
                        Driving tech excellence and community growth in Benin City.
                    </p>
                </div>
            </div>
        </section>
    );
}
