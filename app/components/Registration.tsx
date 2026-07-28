'use client';

import React, { useState } from 'react';

export default function Registration() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        primaryInterest: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/submissions/registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✓ Registration successful! Check your email for confirmation.');
                setFormData({ name: '', email: '', primaryInterest: '' });
            } else {
                setMessage(`✗ Error: ${data.error || 'Failed to submit'}`);
            }
        } catch (error) {
            setMessage('✗ Error submitting registration. Please try again.');
            console.error('Submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="register" className="py-24 md:py-32 bg-biro-blue-dark relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-biro-blue-dark to-[#050a14] opacity-100"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                    {/* Left Info Panel */}
                    <div className="md:w-[45%] p-10 md:p-14 bg-biro-blue-dark flex flex-col justify-center text-white">
                        <h2 className="text-3xl md:text-4xl font-black font-cabinet-grotesk mb-6 leading-tight">
                            Secure Your <span className="text-highlight-yellow">Spot</span>
                        </h2>
                        <p className="text-blue-100/60 text-base md:text-lg mb-10 leading-relaxed font-medium">
                            Join the definitive gathering of builders, founders, and innovators in Benin City.
                        </p>

                        <div className="space-y-6">
                            {[
                                "Ecosystem Networking",
                                "Strategic Workshops",
                                "Limited Edition Access",
                                "Main Stage Sessions"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-highlight-yellow"></div>
                                    <span className="text-sm md:text-base font-bold tracking-wide uppercase text-blue-100/80">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-12 border-t border-white/5">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                                Location: Benin City, Edo State
                            </p>
                        </div>
                    </div>

                    {/* Right Form Panel */}
                    <div className="p-10 md:p-14 bg-white">
                        {message && (
                            <div className={`mb-6 p-5 rounded-2xl border-2 shadow-lg transform transition-all duration-300 ${message.startsWith('✓') ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-500 text-green-800' : 'bg-gradient-to-r from-red-50 to-red-100 border-red-500 text-red-800'}`}>
                                <p className="font-semibold leading-snug text-center">{message}</p>
                                {message.startsWith('✓') && (
                                    <div className="flex justify-center mt-3">
                                        <a
                                            href="https://whatsapp.com/channel/0029VbCyw0P9mrGciiEpD71G"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#1da851] transition-colors"
                                        >
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                            </svg>
                                            Join Channel
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Primary Interest</label>
                                    <select
                                        name="primaryInterest"
                                        value={formData.primaryInterest}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-biro-blue outline-none transition-all bg-white text-gray-900 font-medium cursor-pointer"
                                        required
                                    >
                                        <option value="">Select Interest</option>
                                        <option value="Development">Development</option>
                                        <option value="Design">Design</option>
                                        <option value="Entrepreneurship">Entrepreneurship</option>
                                        <option value="Investment">Investment</option>
                                        <option value="Sponsorship">Sponsorship</option>
                                    </select>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full py-5 bg-biro-blue-dark text-white font-black font-cabinet-grotesk text-lg rounded-xl hover:bg-highlight-yellow hover:text-biro-blue-dark transition-all active:scale-95 shadow-lg shadow-blue-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Submitting...' : 'COMPLETE REGISTRATION'}
                            </button>

                            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">
                                Limited seats available for BTF 2.0
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
