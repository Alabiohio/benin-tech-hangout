'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { motion } from 'framer-motion';
import Button from '../../components/Button';

interface BadgeMatch {
    source: 'ticket' | 'free-pass' | 'registration';
    id: number;
    fullName: string;
    ticketType: string;
    email: string;
    createdAt: string;
}

interface BadgeLookupResult {
    badgeFound: boolean;
    matches?: BadgeMatch[];
    email?: string;
}

export default function RegistrationBadgePage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState<BadgeLookupResult | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setResult(null);

        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            setError('Please enter your email address.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/registration/badge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: trimmedEmail }),
            });
            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Unable to lookup badge. Please try again later.');
            } else {
                setResult(json);
            }
        } catch (err) {
            console.error(err);
            setError('Unable to lookup badge. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const firstMatch = result?.matches?.[0] ?? null;

    return (
        <div className="flex min-h-screen flex-col font-sans relative bg-[#f8fbff]">
            <BackgroundWrapper />
            <Navbar />
            <main className="flex-grow relative z-10 pt-14 md:pt-32 pb-16">
                <section className="relative overflow-hidden py-12">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl mx-auto">
                            <motion.div
                                className="text-center mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                   <h1 className="text-4xl md:text-5xl font-black font-cabinet-grotesk text-biro-blue-dark mb-4">
                                    Find your badge and download it here.
                                </h1>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Enter the email address used during registration. If your badge is ready, you can download it from here.
                                </p>
                            </motion.div>

                            <div className="bg-white rounded-[32px] border border-blue-100 shadow-sm px-3 py-8 md:p-8">
                                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                                    <div>
                                        <label htmlFor="badgeEmail" className="block text-sm font-bold text-slate-700 mb-2">
                                            Registered Email Address
                                        </label>
                                        <input
                                            id="badgeEmail"
                                            name="badgeEmail"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full rounded-2xl border border-blue-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-biro-blue focus:outline-none focus:ring-2 focus:ring-biro-blue/10"
                                        />
                                        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
                                    </div>

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                        <Button type="submit" className="w-full sm:w-auto py-3" disabled={loading}>
                                            {loading ? 'Searching...' : 'Lookup Badge'}
                                        </Button>
                                        <button
                                            type="button"
                                            onClick={() => router.push('/registration')}
                                            className="w-full sm:w-auto rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                                        >
                                            Back to Registration
                                        </button>
                                    </div>
                                </form>

                                {result && (
                                    <div className="mt-8 rounded-3xl border border-blue-100 bg-slate-50 p-6 shadow-sm">
                                        {result.badgeFound ? (
                                            <>
                                                {result.matches && result.matches.length > 1 && (
                                                    <div className="mb-5 rounded-3xl bg-white p-6 shadow-sm border border-blue-100">
                                                        <p className="text-sm uppercase tracking-[0.25em] text-biro-blue font-bold mb-3">Multiple badge records found</p>
                                                        <p className="text-sm text-slate-600">
                                                            This email has more than one registration. Showing the most recent registration first.
                                                        </p>
                                                    </div>
                                                )}

                                                {result.matches?.map((match) => (
                                                    <div key={`${match.source}-${match.id}`} className="mb-5 rounded-3xl bg-white p-6 shadow-sm border border-blue-100">
                                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                            <div>                                                                                                            <h2 className="text-2xl font-black text-slate-900 mb-2">{match.fullName}</h2>
                                                                <p className="text-sm text-slate-600 mb-1"><strong>Badge Type:</strong> {match.ticketType}</p>
                                                                <p className="text-sm text-slate-600"><strong>Registered Email:</strong> {match.email}</p>
                                                            </div>
                                                            <div className="flex flex-col gap-3 sm:items-end">
                                                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Registered</p>
                                                                <p className="text-sm text-slate-500">{new Date(match.createdAt).toLocaleString()}</p>
                                                                <button
                                                                    type="button"
                                                                    disabled
                                                                    className="inline-flex cursor-not-allowed items-center justify-center rounded-2xl bg-slate-300 px-5 py-3 text-sm font-bold text-slate-600"
                                                                >
                                                                    Download
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {!result.matches?.length && firstMatch && (
                                                    <div className="rounded-3xl bg-white p-6 shadow-sm border border-blue-100">
                                                        <h2 className="text-2xl font-black text-slate-900 mb-3">{firstMatch.fullName}</h2>
                                                        <p className="text-sm text-slate-600 mb-2"><strong>Badge Type:</strong> {firstMatch.ticketType}</p>
                                                        <p className="text-sm text-slate-600 mb-4"><strong>Registered Email:</strong> {firstMatch.email}</p>
                                                        <button
                                                            type="button"
                                                            disabled
                                                            className="inline-flex cursor-not-allowed items-center justify-center rounded-2xl bg-slate-300 px-6 py-3 text-sm font-bold text-slate-600"
                                                        >
                                                            Download Disabled
                                                        </button>
                                                    </div>
                                                )}

                                                {!result.matches?.length && !firstMatch && (
                                                    <div className="rounded-3xl border border-blue-100 bg-white p-6 text-slate-700">
                                                        <p>Your registration record is available, but details could not be displayed. Please try again or contact support.</p>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="rounded-3xl border border-orange-100 bg-orange-50 p-6">
                                                <p className="text-sm uppercase tracking-[0.25em] text-orange-600 font-bold mb-3">No badge found</p>
                                                <p className="text-slate-700">
                                                    We couldn't find a badge for <strong>{result.email}</strong>. If you registered with a different email, try that address instead.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
