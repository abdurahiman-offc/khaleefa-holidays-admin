"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScatteredShapes from "./ScatteredShapes";
export default function AboutUs() {
    return (
        <section id="about-us" className="pt-[100px] pb-[100px] bg-[#151794] overflow-hidden relative">
            {/* Scattered Small White Shapes */}
            <ScatteredShapes />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
                            alt="Traveler looking at mountains"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        <div className="absolute bottom-8 left-8 text-white">
                            <p className="text-lg font-medium">Established 2024</p>
                            <p className="text-sm opacity-80">Kerala, India</p>
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2"
                    >
                        <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                            About Us
                        </h2>
                        <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-[family-name:var(--font-yomogi)]">
                            We Turn Your Dream Vacations Into Reality
                        </h3>
                        <p className="text-lg text-white/80 mb-8 leading-relaxed">
                            At Khalifa Holidays, we believe travel is more than just moving from place to place—it's about the memories you create and the experiences that shape you.
                            Born from a passion for exploration, we specialize in crafting personalized journeys that cater to your unique desires.
                        </p>


                    </motion.div>
                </div>
            </div>
        </section>
    );
}
