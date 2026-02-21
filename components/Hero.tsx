"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScatteredShapes from "./ScatteredShapes";
import { Dancing_Script, Dosis } from "next/font/google";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const dosis = Dosis({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full bg-[#151794] overflow-hidden flex items-center justify-center pt-[100px] pb-[100px] lg:pt-[100px] lg:pb-[100px] font-sans">

            {/* Scattered Small White Shapes */}
            <ScatteredShapes />



            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col lg:flex-row items-center justify-between z-10 relative mt-8 lg:mt-0">

                {/* Left Column - Text Content */}
                <div className="lg:w-[55%] flex flex-col items-start text-left text-white space-y-6 lg:space-y-8 bg-transparent z-10 w-full relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-transparent"
                    >
                        <div className={`flex flex-col items-start tracking-tight drop-shadow-2xl bg-transparent ${dancingScript.className}`}>
                            <h1 className="text-[5rem] sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] font-bold text-white bg-transparent leading-[0.85] relative z-10 w-full">
                                Khaleefa
                            </h1>
                            <h2 className="text-[4rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] text-blue-100 bg-transparent relative z-0 md:ml-12 leading-[0.85] mt-2 w-full">
                                Holidays
                            </h2>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`max-w-xl text-lg sm:text-xl md:text-2xl text-blue-50/90 leading-relaxed drop-shadow-md bg-transparent w-full pr-8 md:pr-16 lg:pr-20 xl:pr-24 ${dosis.className}`}
                    >
                        Uncover secluded shores and hidden gems. Experience the world&apos;s most breathtaking destinations with zero hassle.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-6 w-full pt-4"
                    >
                        <button
                            type="button"
                            onClick={() => document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" })}
                            className="group relative w-full sm:w-auto px-10 py-5 bg-white text-[#151794] border border-gray-100 rounded-full font-bold text-xl transition-all duration-200 transform hover:-translate-y-[2px] active:translate-y-[6px] shadow-[0_6px_0_#cbd5e1,0_15px_20px_rgba(0,0,0,0.3)] active:shadow-[0_0px_0_#cbd5e1,0_0px_0px_rgba(0,0,0,0)] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                View Destinations
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-blue-50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                        </button>

                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="hidden sm:flex mx-2"
                        >
                            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-1 backdrop-blur-md shadow-lg">
                                <motion.div
                                    animate={{ height: ["20%", "60%", "20%"], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                                />
                            </div>
                        </motion.div>

                        <button
                            type="button"
                            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                            className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-full font-bold text-xl transition-all duration-200 transform hover:-translate-y-[2px] hover:bg-white/20 active:translate-y-[6px] shadow-[0_6px_0_rgba(255,255,255,0.4),0_15px_20px_rgba(0,0,0,0.2)] active:shadow-[0_0px_0_rgba(255,255,255,0.4),0_0px_0px_rgba(0,0,0,0)]"
                        >
                            Our Services
                        </button>
                    </motion.div>
                </div>

                {/* Right Column - Images */}
                <div className="lg:w-[45%] h-[400px] sm:h-[500px] lg:h-[700px] w-full relative flex items-center justify-center z-10 mt-12 lg:mt-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 45 }}
                        className="absolute w-full h-full max-w-[600px] max-h-[600px] xl:max-w-[800px] xl:max-h-[800px] z-20"
                    >
                        <motion.div
                            animate={{
                                y: [0, -25, 0]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-full h-full relative"
                        >
                            <Image
                                src="/images/bg22.png"
                                alt="Hero Foreground"
                                fill
                                className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)] scale-125 md:scale-150 lg:scale-[1.6]"
                                priority
                            />
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
