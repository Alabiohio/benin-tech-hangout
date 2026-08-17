'use client';

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Tickets from "./components/Tickets";
import Sponsors from "./components/Sponsor";
import Pitch from "./components/Pitch";
import Volunteer from "./components/Volunteer";
import FAQ from "./components/FAQ";
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import Speaker from "./components/Speaker";

export default function Home() {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col font-sans relative overflow-x-hidden">
            <Navbar onRegisterClick={() => setIsRegisterModalOpen(true)} />
            <main className="flex-grow relative z-10">
                <Hero />
                <About />
                <Tickets />                
                <Speaker />
                <Sponsors />
                <Pitch />
                <Volunteer />
                <FAQ />
            </main>
            <Footer />

            <RegisterModal 
                isOpen={isRegisterModalOpen} 
                onClose={() => setIsRegisterModalOpen(false)} 
            />
        </div>
    );
}
