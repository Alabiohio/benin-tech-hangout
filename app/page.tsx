'use client';

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Partners from "./components/Partners";
import About from "./components/About";
import WhyAttend from "./components/WhyAttend";
import WhatToExpect from "./components/WhatToExpect";
import Tickets from "./components/Tickets";
import Shocase from "./components/Shocase";
import Countdown from "./components/Countdown";
import FAQ from "./components/FAQ";
import Legacy from "./components/Legacy";
import Organizer from "./components/Organizer";
import StartupPitch from "./components/StartupPitch";
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import BackgroundWrapper from "./components/BackgroundWrapper";
import GuessSpeakers from "./components/GuessSpeakers";
import Link from 'next/link';
import PartnerCTA from "./components/PartnerCTA";
import ExhibitionCTA from "./components/ExhibitionCTA";

export default function Home() {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col font-sans relative overflow-x-hidden">
            <BackgroundWrapper />
            <Navbar onRegisterClick={() => setIsRegisterModalOpen(true)} />
            <main className="flex-grow relative z-10">
                <Hero onRegisterClick={() => setIsRegisterModalOpen(true)} />
                <Highlights />
                <About />
                <Countdown />
                <WhatToExpect isModalOpen={isRegisterModalOpen} setIsModalOpen={setIsRegisterModalOpen} />
                <ExhibitionCTA/>
                <Partners />
                <Tickets onRegisterClick={() => setIsRegisterModalOpen(true)} />                
                <Shocase setIsModalOpen={setIsRegisterModalOpen} />
                <GuessSpeakers />
                <WhyAttend onRegisterClick={() => setIsRegisterModalOpen(true)} />
                <Legacy />               
                <PartnerCTA />
                <StartupPitch />
                <FAQ />
                <Organizer />
            </main>
            <Footer onRegisterClick={() => setIsRegisterModalOpen(true)} />

            <RegisterModal 
                isOpen={isRegisterModalOpen} 
                onClose={() => setIsRegisterModalOpen(false)} 
            />
        </div>
    );
}
