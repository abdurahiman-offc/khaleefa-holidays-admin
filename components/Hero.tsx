"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MoveRight, Star, Plane, Search } from "lucide-react";

export default function Hero() {
    return (
        <section id="hero" className="hero-section relative min-h-screen w-full overflow-hidden bg-[#F5F5F5] flex items-center pt-20">


            <div className="container mx-auto px-6 lg:px-12 relative z-10 hero-container">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 hero-layout-wrapper">

                    {/* Left Content */}
                    <div className="w-full lg:w-[45%] flex flex-col items-start text-left hero-left-content">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="hero-motion-wrapper"
                        >
                            <div className="hero-header-image-wrapper-tablet hidden">
                                <Image
                                    src="/images/headerimage-4.png"
                                    alt="Travel Illustration"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h1 className="hero-heading text-[50px] md:text-[80px] lg:text-[90px] font-black leading-[1.05] tracking-tight mb-8 uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#18189C] to-black">
                                Your <br />
                                journey <br className="hero-tablet-br hidden" />
                                Begins <br />
                                with <br className="hero-tablet-br hidden" />
                                <span className="text-[#6A9BFF]">us</span>
                            </h1>

                            <div className="flex flex-col sm:flex-row items-center gap-6 mb-12 hero-buttons-tablet">
                                {/* Visa Button */}
                                <div className="relative group min-w-[200px]">
                                    <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="relative w-full bg-gradient-to-r from-[#18189C] to-black px-8 py-4 rounded-full border-2 border-black text-white font-black text-sm uppercase tracking-widest"
                                    >
                                        Visa
                                    </motion.button>
                                </div>

                                {/* Popular Destinations Button */}
                                <div className="relative group min-w-[240px]">
                                    <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="relative w-full bg-gradient-to-r from-[#18189C] to-black px-8 py-4 rounded-full border-2 border-black text-white font-black text-sm uppercase tracking-widest"
                                    >
                                        Popular destinations
                                    </motion.button>
                                </div>
                            </div>

                            {/* Decorative Badge */}
                            <div className="relative mb-12 group adventure-badge-tablet">
                                <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                <div className="relative bg-gradient-to-r from-[#B388FF] to-[#FFA726] px-8 py-3 rounded-full border-2 border-black">
                                    <span className="text-white text-lg md:text-2xl font-bold">Plan your next adventure</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Desktop & Mobile Illustration Area */}
                    <div className="md:hidden lg:block w-full lg:w-[55%] relative h-[500px] lg:h-[800px] scale-110 lg:scale-125 origin-center hero-illustration-desktop">




                        {/* Main Illustration */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-full h-full z-10"
                        >
                            <Image
                                src="/images/headerimage-4.png"
                                alt="Travel Illustrations"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>


                    </div>

                </div>
            </div>
        </section>
    );
}


