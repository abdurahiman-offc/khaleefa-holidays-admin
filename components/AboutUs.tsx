"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionBackground from "./SectionBackground";
export default function AboutUs() {
    return (
        <section id="about-us" className="pt-[100px] pb-7 md:pb-[100px] bg-[#F5F5F5] overflow-hidden relative contain-paint">
            <SectionBackground />
            {/* Scattered Small White Shapes */}

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative h-[500px] rounded-[40px] overflow-hidden shadow-xl border-4 border-white/40"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
                            alt="Breathtaking travel destination curated by Khaleefa Holidays"
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
                        <h2 className="text-[10px] font-black text-[#2D3E33]/40 uppercase tracking-[0.2em] mb-4">
                            About Us
                        </h2>
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-[#18189C] to-black">
                            Dream Vacations Into Reality
                        </h2>
                        <p className="text-sm md:text-lg text-[#2D3E33]/60 mb-8 leading-relaxed font-black uppercase tracking-tight">
                            At Khalifa Holidays, we believe travel is more than just moving from place to place—it's about the memories you create and the experiences that shape you.
                            Born from a passion for exploration, we specialize in crafting personalized journeys that cater to your unique desires.
                        </p>


                    </motion.div>
                </div>
            </div>
        </section>
    );
}
