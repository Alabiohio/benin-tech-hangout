import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative z-10 bg-gray-900 text-white py-16 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold mb-6 text-biro-blue-dark">Benin Tech Hangout 2.0</h2>
                        <p className="text-gray-400 max-w-sm mb-6">
                            Strengthening and growing Benin City's tech ecosystem. Join us as we bring together talents, founders, and organizations.
                        </p>
                        <div className="flex gap-4">
                            {/* Social placeholders */}
                            <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-biro-blue transition-colors"></div>
                            <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-biro-blue transition-colors"></div>
                            <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-biro-blue transition-colors"></div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="#about" className="hover:text-highlight-yellow transition-colors">About</Link></li>
                            <li><Link href="#schedule" className="hover:text-highlight-yellow transition-colors">Schedule</Link></li>
                            <li><Link href="#register" className="hover:text-highlight-yellow transition-colors">Register</Link></li>
                            <li><Link href="#" className="hover:text-highlight-yellow transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Contact</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li>Benin City, Edo State</li>
                            <li>hello@benintechhangout.com</li>
                            <li>+234 800 000 0000</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Benin Tech Hangout. All rights reserved.</p>
                    <p>Organized by Proline Groups</p>
                </div>
            </div>
        </footer>
    );
}
