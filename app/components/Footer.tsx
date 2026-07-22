import Link from "next/link";
import Image from "next/image";

export default function Footer({ }: { onRegisterClick?: () => void }) {
    return (
        <footer id="contact" className="relative z-10 bg-white text-white py-4 overflow-hidden">
            {/* Grayscale Background Logo */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
                <Image
                    src="/logo/logo.png"
                    alt=""
                    width={800}
                    height={800}
                    className="w-[150%] md:w-[600px] lg:w-[800px] h-auto object-contain grayscale"
                />
            </div>
            
            <div className="container mx-auto relative z-10 px-4 md:px-8 pt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 text-center sm:text-left">
                    {/* Brand & Socials */}
                    <div className="flex flex-col items-center sm:items-start gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                                {[
                                    { id: 'x', url: 'https://x.com/benintechfest', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298L17.607 20.65z"/></svg> },
                                    { id: 'instagram', url: 'https://instagram.com/benintechfest', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.013 3.584-.07 4.85c-.054 1.17-.249 1.805-.413 2.227-.217.561-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.013-4.85-.07c-1.17-.054-1.805-.249-2.227-.413-.561-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.217-.56.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.328 1.078 2.126 1.384c.765.297 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384s1.078-1.328 1.384-2.126c.297-.765.499-1.636.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126s-1.328-1.078-2.126-1.384c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> }
                                ].map((social) => (
                                    <Link key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-highlight-yellow transition-all">
                                        <span className="sr-only">{social.id}</span>
                                        {social.icon}
                                    </Link>
                                ))}
                            </div>
                            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-500">@benintechfest</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center sm:items-start gap-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Quick Links</span>
                        <nav className="grid grid-cols-2 gap-x-8 gap-y-3">
                            {['Volunteer', 'Exhibitor', 'Tickets', 'Sponsor', 'Privacy Policy'].map((item) => (
                                <Link key={item} href={item === 'Privacy Policy' ? '/privacy-policy' : `/${item.toLowerCase()}`} className="text-[12px] font-black uppercase tracking-widest text-slate-400 hover:text-highlight-yellow transition-colors text-left">
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact & CTA */}
                    <div className="flex flex-col items-center sm:items-start lg:items-end gap-4 text-center lg:text-right">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Contact Us</span>
                        <div className="flex flex-col gap-2">
                            <a href="mailto:benintechfest@gmail.com" className="text-[12px] font-black uppercase tracking-widest text-slate-400 hover:text-highlight-yellow transition-colors">benintechfest@gmail.com</a>
                            <a href="tel:+2347012341561" className="text-[12px] font-black uppercase tracking-widest text-slate-400 hover:text-highlight-yellow transition-colors">+234 701 234 1561</a>
                        </div>
                    </div>
                </div>
                {/* WhatsApp Channel CTA — permanent */}
                <div className="relative my-6 rounded-2xl overflow-hidden border shadow shadow-lg bg-[#ffffff]">
                    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4">
                        <div className="flex items-center gap-4">
                            <div className="relative flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 transition-all">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Stay Updated</p>
                                <p className="text-sm font-black uppercase tracking-wide text-slate-700">Join our WhatsApp channel for live updates &amp; announcements</p>
                            </div>
                        </div>

                        <a
                            href="https://whatsapp.com/channel/0029VbCyw0P9mrGciiEpD71G"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="footer-whatsapp-cta"
                            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-biro-blue-dark text-white font-black font-oswald uppercase tracking-widest text-sm hover:bg-biro-blue hover:shadow-[0_0_20px_rgba(25,118,210,0.4)] transition-all duration-300 group"
                        >
                            Join Channel
                            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Bottom Row */}

                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center py-6 md:py-4 mt-4 md:mt-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-center md:text-left">
                        <p className="text-slate-500 text-[11px] md:text-[12px] font-black uppercase tracking-widest">&copy; {new Date().getFullYear()} Benin Tech Fest</p>
                    </div>
                 </div>
            </div>
        </footer>
    );
}
