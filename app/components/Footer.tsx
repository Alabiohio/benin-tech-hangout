import Link from "next/link";
import Image from "next/image";

export default function Footer({ onRegisterClick }: { onRegisterClick?: () => void }) {
    return (
        <footer id="contact" className="relative z-10 bg-[#020617] text-white pt-24 pb-12 border-t border-white/5 overflow-hidden">
            {/* Background decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-8 items-start mb-24">

                    {/* Left: Navigation & Context */}
                    <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-12">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">Navigation</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Home / Hero', link: '/' },
                                    { name: 'About BTH', link: '#about' },
                                    { name: 'Ticket Pass', link: '#tickets' },
                                    { name: 'Common FAQ', link: '#faq' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.link} className="text-white/60 hover:text-blue-400 font-medium transition-colors text-sm">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">Location</h3>
                            <p className="text-white font-medium text-sm mb-2">Benin City, Edo State.</p>
                            <p className="text-white/40 text-[10px] font-medium leading-relaxed max-w-[200px]">Physical event hub location details to be shared with registered attendees.</p>
                        </div>
                    </div>

                    {/* Center: Brand Identity */}
                    <div className="order-1 lg:order-2 flex flex-col items-center text-center">
                        <Link href="/" className="inline-block mb-10 group transition-transform hover:scale-105 active:scale-95">
                            <Image
                                src="/logo.png"
                                alt="BTH 2.0 Logo"
                                width={320}
                                height={200}
                                className="h-24 w-auto object-contain drop-shadow-[0_0_30px_rgba(37,99,235,0.2)]"
                            />
                        </Link>
                        <p className="text-white/40 leading-relaxed mb-10 max-w-sm font-medium text-base">
                            The definitive tech experience in Benin City. Empowering builders, founders, and the next generation of African tech talent.
                        </p>
                        <div className="flex gap-4">
                            {['twitter', 'instagram', 'linkedin', 'youtube'].map((social) => (
                                <Link
                                    key={social}
                                    href="#"
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-blue-600 hover:border-blue-400 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <span className="sr-only">{social}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right: Get Involved & Support */}
                    <div className="order-3 lg:order-3 flex flex-col items-center lg:items-end text-center lg:text-right space-y-12">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">Participate</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Become a Volunteer', link: '/volunteer' },
                                    { name: 'Exhibition Slot', link: '/exhibitor' },
                                    { name: 'Pitch Showcase', link: '/pitch' },
                                    { name: 'Sponsorship', link: '/sponsors' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.link} className="text-white/60 hover:text-indigo-400 font-medium transition-colors text-sm">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">Contact</h3>
                            <p className="text-blue-400 font-bold hover:underline cursor-pointer text-sm mb-2">hello@benintechhangout.com</p>
                            <button
                                onClick={onRegisterClick}
                                className="inline-block px-8 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-black tracking-widest hover:bg-white hover:text-black transition-all"
                            >
                                REGISTER NOW
                            </button>
                        </div>
                    </div>
                </div>


                {/* Organizational Segment */}
                <div className="pt-16 border-t border-white/5 flex flex-col items-center gap-12">
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-40 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all">
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Organized by</span>
                            <span className="text-xs font-black tracking-wider border border-white/20 px-3 py-1 rounded-md text-white/60">PROLINE GROUP</span>
                        </div>
                        <div className="w-px h-6 bg-white/10"></div>
                        <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all">
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Developed by</span>
                            <Link href="https://ohiocodespace.vercel.app" className="text-xs font-black tracking-wider underline underline-offset-4 text-white/60 hover:text-blue-400 transition-colors">OHIO CODESPACE</Link>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between w-full items-center gap-6">
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} Benin Tech Hangout 2.0</p>
                    </div>
                </div>
            </div>

            {/* Decorative huge background text */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-[15rem] md:text-[25rem] font-black font-righteous text-white/[0.02] select-none pointer-events-none whitespace-nowrap uppercase italic tracking-tighter">
                BE PART OF IT
            </div>
        </footer>
    );
}
