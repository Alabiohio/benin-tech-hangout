'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Tickets from '../components/Tickets';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function TicketsPage() {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col font-sans relative">
            <BackgroundWrapper />
            <Navbar onRegisterClick={() => setIsRegisterModalOpen(true)} />
            <main className="flex-grow relative z-10">
                <Tickets onRegisterClick={() => setIsRegisterModalOpen(true)} />
            </main>
            <Footer onRegisterClick={() => setIsRegisterModalOpen(true)} />
        </div>
    );
}
