import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-biro-blue flex items-center gap-2">
                    <Image src="/logo.png" alt="Logo" width={32} height={32} className="w-8 h-8 object-contain" />
                    Benin Tech Hangout
                </Link>

                <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                    <Link href="#about" className="hover:text-biro-blue transition-colors">About</Link>
                    <Link href="#schedule" className="hover:text-biro-blue transition-colors">Schedule</Link>
                    <Link href="#speakers" className="hover:text-biro-blue transition-colors">Speakers</Link>
                    <Link href="#contact" className="hover:text-biro-blue transition-colors">Contact</Link>
                </nav>

                <Link
                    href="#register"
                    className="px-5 py-2.5 bg-highlight-yellow text-biro-blue font-bold rounded-full hover:bg-yellow-400 transition-all active:scale-95 shadow-sm text-sm"
                >
                    Register Now
                </Link>
            </div>
        </header>
    );
}
