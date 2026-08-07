'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { motion } from 'framer-motion';
import Button from '../../../components/Button';

interface BadgePayload {
    badgeFound: boolean;
    badge?: {
        source: 'ticket' | 'free-pass' | 'registration';
        id: number;
        fullName: string;
        ticketType: string;
        email: string;
        createdAt: string;
    };
    email?: string;
}

function BadgeDownloadContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email') || '';
    const source = searchParams.get('source') || '';
    const id = searchParams.get('id') || '';

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [badge, setBadge] = useState<null | BadgePayload>(null);

    useEffect(() => {
        if (!email) {
            setError('Missing email address.');
            return;
        }

        const fetchBadge = async () => {
            setLoading(true);
            setError('');

            try {
                const requestBody: Record<string, string> = { email };
                if (source) requestBody.source = source;
                if (id) requestBody.id = id;

                const response = await fetch('/api/registration/badge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody),
                });
                const json = await response.json();
                if (!response.ok) {
                    setError(json.error || 'Unable to fetch badge details.');
                    setBadge(null);
                } else {
                    setBadge(json);
                }
            } catch (err) {
                console.error(err);
                setError('Unable to fetch badge details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBadge();
    }, [email, source, id]);

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
                                <p className="text-sm uppercase tracking-[0.3em] text-biro-blue font-bold mb-3">Badge Download</p>
                                <h1 className="text-4xl md:text-5xl font-black font-cabinet-grotesk text-biro-blue-dark mb-4">
                                    Your badge download is waiting.
                                </h1>
                            </motion.div>

                            <div className="bg-white rounded-[32px] border border-blue-100 shadow-sm p-8">
                                {loading ? (
                                    <div className="py-16 text-center text-slate-500">Loading badge details…</div>
                                ) : error ? (
                                    <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
                                        <p className="text-base font-semibold mb-3">Unable to load badge details</p>
                                        <p className="text-sm">{error}</p>
                                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                            <Button onClick={() => router.push('/registration/badge')} variant="outline">
                                                Lookup another email
                                            </Button>
                                            <Button onClick={() => router.push('/')} variant="primary">
                                                Home
                                            </Button>
                                        </div>
                                    </div>
                                ) : badge ? (
                                    badge.badgeFound ? (
                                        <div className="space-y-6">
                                            <div className="rounded-3xl border border-blue-100 bg-slate-50 p-6">
                                                <p className="text-sm uppercase tracking-[0.25em] text-biro-blue font-bold mb-3">Badge details</p>
                                                <h2 className="text-3xl font-black text-slate-900 mb-2">{badge.badge?.fullName}</h2>
                                                <p className="text-sm text-slate-600 mb-1"><strong>Email:</strong> {badge.badge?.email}</p>
                                                <p className="text-sm text-slate-600"><strong>Badge Type:</strong> {badge.badge?.ticketType}</p>
                                            </div>

                                            <div className="rounded-3xl border border-blue-100 bg-white p-6">
                                                <p className="text-slate-700 mb-4">
                                                    The badge design is still in progress, but your registration details have been safely saved.
                                                    You can return to this page later to download the final badge.
                                                </p>
                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    <Button onClick={() => router.push('/registration/badge')} variant="outline">
                                                        Search another email
                                                    </Button>
                                                    <Button onClick={() => router.push('/')} variant="primary">
                                                        Back to Home
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="rounded-3xl border border-orange-100 bg-orange-50 p-6">
                                            <p className="text-sm uppercase tracking-[0.25em] text-orange-600 font-bold mb-3">No badge found</p>
                                            <p className="text-slate-700">
                                                We couldn&apos;t find a badge for <strong>{email}</strong>. If you registered with a different email, try again.
                                            </p>
                                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                                <Button onClick={() => router.push('/registration/badge')} variant="outline">
                                                    Try another email
                                                </Button>
                                                <Button onClick={() => router.push('/')} variant="primary">
                                                    Home
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className="py-16 text-center text-slate-500">
                                        Enter an email address on the badge lookup page to get started.
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

export default function BadgeDownloadPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#f8fbff] text-biro-blue font-bold">Loading badge details...</div>}>
            <BadgeDownloadContent />
        </Suspense>
    );
}
