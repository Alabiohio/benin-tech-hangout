import Link from "next/link";
import Image from "next/image";

export default function Footer({ onRegisterClick }: { onRegisterClick?: () => void }) {
    return (
        <footer id="contact" className="relative z-10 bg-white text-biro-blue-dark pt-24 pb-12 border-t border-blue-100 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-8 items-start mb-24">
                    <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-12">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Navigation</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Home / Hero', link: '/' },
                                    { name: 'About BTH', link: '#about' },
                                    { name: 'Ticket Pass', link: '#tickets' },
                                    { name: 'Common FAQ', link: '#faq' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.link} className="text-slate-600 hover:text-biro-blue font-medium transition-colors text-sm">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Location</h3>
                            <p className="text-biro-blue-dark font-medium text-sm mb-2">Benin City, Edo State.</p>
                            <p className="text-slate-500 text-[10px] font-medium leading-relaxed max-w-[200px]">Physical event hub location details to be shared with registered attendees.</p>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 flex flex-col items-center text-center">
                        <Link href="/" className="inline-block mb-10 group transition-transform hover:scale-105 active:scale-95">
                            <Image src="/logo.png" alt="BTH 2.0 Logo" width={320} height={200} className="h-24 w-auto object-contain" />
                        </Link>
                        <p className="text-slate-500 leading-relaxed mb-10 max-w-sm font-medium text-base">
                            The definitive tech experience in Benin City. Empowering builders, founders, and the next generation of African tech talent.
                        </p>
                        <div className="flex gap-4">
                            {['twitter', 'instagram', 'linkedin', 'youtube'].map((social) => (
                                <Link key={social} href="#" className="w-12 h-12 rounded-2xl bg-[#f8fbff] border border-blue-100 flex items-center justify-center text-slate-500 hover:text-white hover:bg-biro-blue hover:border-biro-blue transition-all duration-300">
                                    <span className="sr-only">{social}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="order-3 lg:order-3 flex flex-col items-center lg:items-end text-center lg:text-right space-y-12">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Participate</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Become a Volunteer', link: '/volunteer' },
                                    { name: 'Exhibition Slot', link: '/exhibitor' },
                                    { name: 'Pitch Showcase', link: '/pitch' },
                                    { name: 'Sponsorship', link: '/sponsors' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.link} className="text-slate-600 hover:text-biro-blue font-medium transition-colors text-sm">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Contact</h3>
                            <p className="text-biro-blue font-bold hover:underline cursor-pointer text-sm mb-2">hello@benintechhangout.com</p>
                            <button onClick={onRegisterClick} className="inline-block px-8 py-3 bg-highlight-yellow border border-red-800 rounded-full text-xs text-white font-black tracking-widest hover:bg-red-800 transition-all">
                                REGISTER NOW
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-16 border-t border-blue-100 flex flex-col items-center gap-12">
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Organized by</span>
                            <span className="text-xs font-black tracking-wider border border-blue-100 px-3 py-1 rounded-md text-slate-600">PROLINE GROUP</span>
                        </div>
                        <div className="w-px h-6 bg-blue-100"></div>
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Developed by</span>
                            <Link href="https://ohiocodespace.vercel.app" className="text-xs font-black tracking-wider underline underline-offset-4 text-slate-600 hover:text-biro-blue transition-colors">OHIO CODESPACE</Link>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between w-full items-center gap-6">
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} Benin Tech Hangout 2.0</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
