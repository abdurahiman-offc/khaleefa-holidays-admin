"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScatteredShapes from "./ScatteredShapes";
import { Dancing_Script, Dosis, Outfit } from "next/font/google";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const dosis = Dosis({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full bg-[#151794] overflow-hidden flex items-center justify-center pt-16 pb-12 lg:pt-[100px] lg:pb-[100px] font-sans">

            {/* Scattered Small White Shapes */}
            <ScatteredShapes />

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col lg:flex-row items-center justify-between z-10 relative mt-4 lg:mt-0">

                {/* Text Content - Centered on mobile, Left-aligned on Desktop */}
                <div className="lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left text-white space-y-4 lg:space-y-8 bg-transparent z-10 w-full relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-transparent"
                    >
                        {/* Responsive H1 for SEO (Only one H1 per page) */}
                        <div className="flex flex-col items-center lg:items-start">
                            <h1 className="sr-only">Khaleefa Holidays - Bringing the World Within Reach</h1>

                            {/* Visual Presentation (using aria-hidden to avoid screen reader duplication) */}
                            <div aria-hidden="true" className="block md:hidden text-5xl font-extrabold text-white mb-3 tracking-[-0.04em] leading-[1.05] font-sans">
                                Bringing the World <br />
                                <span className="text-blue-200">Within Reach</span>
                            </div>

                            <div aria-hidden="true" className={`hidden md:flex flex-col items-center lg:items-start tracking-tight drop-shadow-2xl bg-transparent ${dancingScript.className}`}>
                                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] font-bold text-white bg-transparent leading-[0.85] relative z-10 w-full">
                                    Khaleefa
                                </div>
                                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] text-blue-100 bg-transparent relative z-0 leading-[0.85] mt-2 w-full lg:ml-12">
                                    Holidays
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <p
                        className={`max-w-xl text-lg sm:text-xl md:text-2xl text-blue-50/90 leading-relaxed drop-shadow-md bg-transparent w-full ${dosis.className}`}
                    >
                        Uncover secluded shores and hidden gems. Experience the world&apos;s most breathtaking destinations with zero hassle.
                    </p>

                    {/* ... (buttons remain same, skipping for space in replace but I'll make sure to be careful) ... */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6 w-full pt-4"
                    >
                        <button
                            type="button"
                            onClick={() => document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" })}
                            className="group relative px-4 py-3 sm:w-auto sm:px-10 sm:py-5 bg-white text-[#151794] border border-gray-100 rounded-full font-bold text-sm sm:text-xl transition-all duration-200 transform hover:-translate-y-[2px] active:translate-y-[6px] shadow-[0_4px_0_#cbd5e1,0_10px_15px_rgba(0,0,0,0.3)] sm:shadow-[0_6px_0_#cbd5e1,0_15px_20px_rgba(0,0,0,0.3)] active:shadow-[0_0px_0_#cbd5e1,0_0px_0px_rgba(0,0,0,0)] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap">
                                View Destinations
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-blue-50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                        </button>

                        <button
                            type="button"
                            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                            className="px-4 py-3 sm:w-auto sm:px-10 sm:py-5 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-full font-bold text-sm sm:text-xl transition-all duration-200 transform hover:-translate-y-[2px] hover:bg-white/20 active:translate-y-[6px] shadow-[0_4px_0_rgba(255,255,255,0.4),0_10px_15px_rgba(0,0,0,0.2)] sm:shadow-[0_6px_0_rgba(255,255,255,0.4),0_15px_20px_rgba(0,0,0,0.2)] active:shadow-[0_0px_0_rgba(255,255,255,0.4),0_0px_0px_rgba(0,0,0,0)] whitespace-nowrap"
                        >
                            Our Services
                        </button>
                    </motion.div>

                    {/* Quick Call Button - Mobile Only */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="block lg:hidden w-full px-4 pt-2"
                    >
                        <a
                            href="tel:9999999999"
                            className="group relative flex items-center gap-4 w-full px-6 py-4 bg-[#151794] text-white border border-white/10 rounded-full transition-all duration-200 transform hover:-translate-y-[2px] active:translate-y-[6px] shadow-[0_4px_0_#0a0b4d,0_10px_15px_rgba(0,0,0,0.3)] active:shadow-[0_0px_0_#0a0b4d,0_0px_0px_rgba(0,0,0,0)] overflow-hidden"
                        >
                            {/* Icon in Circle */}
                            <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-inner">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>

                            {/* Text Column */}
                            <div className="flex flex-col items-start flex-grow">
                                <span className="text-[10px] uppercase font-black text-white/50 tracking-[0.2em] leading-none mb-1">Click to call now</span>
                                <span className="text-2xl font-black tracking-tight leading-none text-white">9999999999</span>
                            </div>

                            {/* Arrow Indicator */}
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/30 group-hover:translate-x-1 transition-all">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>

                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                        </a>
                    </motion.div>

                    {/* Scroll Down Indicator - Mobile Only */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="flex md:hidden flex-col items-center gap-2 mt-12 cursor-pointer group"
                        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="flex flex-col items-center gap-1"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white/60 transition-colors">Explore</span>
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/30 group-hover:text-white/60 group-hover:border-white/40 transition-all">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Column - Images (Hidden on mobile, visible on lg screens) */}
                <div className="hidden lg:flex lg:w-[45%] h-[400px] sm:h-[500px] lg:h-[700px] w-full relative items-center justify-center z-10 mt-12 lg:mt-0">
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
                                alt="Khaleefa Holidays Travel Experience"
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
