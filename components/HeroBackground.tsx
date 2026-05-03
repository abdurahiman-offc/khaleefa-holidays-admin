"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroBackground() {
    const floatAnimation = {
        y: [0, -10, 0],
        rotate: [0, 2, 0],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const reverseFloat = {
        y: [0, 10, 0],
        rotate: [0, -2, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#E6EBFF]">
            {/* World Map Background (Actual Image) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] scale-110">
                <Image 
                    src="/images/world-map.png" 
                    alt="World Map" 
                    fill 
                    className="object-contain"
                />
            </div>

            {/* Decorative Dashed Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1440 800">
                <path d="M100 600 C 200 500, 300 700, 400 600" stroke="black" strokeWidth="2" strokeDasharray="8 8" fill="none" />
                <path d="M1000 200 C 1100 100, 1200 300, 1300 200" stroke="black" strokeWidth="2" strokeDasharray="8 8" fill="none" />
                <path d="M1100 700 C 1200 800, 1300 600, 1400 700" stroke="black" strokeWidth="2" strokeDasharray="8 8" fill="none" />
            </svg>

            {/* Illustrations (Strictly following the layout of the reference image) */}
            
            {/* Left Side Group */}
            <motion.div 
                animate={floatAnimation}
                className="absolute left-[5%] top-[20%] w-[220px] h-[220px] z-10 hidden lg:block rotate-[-12deg]"
            >
                <Image src="/images/pink-suitcase.png" alt="Suitcase" fill className="object-contain" />
            </motion.div>

            <motion.div 
                animate={reverseFloat}
                className="absolute left-[15%] bottom-[22%] w-[160px] h-[160px] z-10 hidden lg:block rotate-[8deg]"
            >
                <Image src="/images/passport-tickets.png" alt="Passport" fill className="object-contain" />
            </motion.div>

            <motion.div 
                animate={floatAnimation}
                className="absolute left-[8%] bottom-[8%] w-[140px] h-[140px] z-10 hidden lg:block"
            >
                <Image src="/images/camera.png" alt="Camera" fill className="object-contain" />
            </motion.div>

            {/* Right Side Group */}
            <motion.div 
                animate={reverseFloat}
                className="absolute right-[10%] top-[20%] w-[200px] h-[200px] z-10 hidden lg:block rotate-[15deg]"
            >
                <Image src="/images/street-map.png" alt="Street Map" fill className="object-contain" />
            </motion.div>

            <motion.div 
                animate={floatAnimation}
                className="absolute right-[5%] bottom-[28%] w-[240px] h-[240px] z-10 hidden lg:block rotate-[-5deg]"
            >
                <Image src="/images/green-suitcase.png" alt="Green Suitcase" fill className="object-contain" />
            </motion.div>

            <motion.div 
                animate={reverseFloat}
                className="absolute right-[18%] bottom-[12%] w-[100px] h-[100px] z-10 hidden lg:block"
            >
                <Image src="/images/compass.png" alt="Compass" fill className="object-contain" />
            </motion.div>

            {/* Scattered Leaves/Plants */}
            <div className="absolute inset-0 z-0">
                <div className="absolute left-[20%] top-[35%] w-16 h-16 opacity-40 blur-[1px]">
                     <Image src="/images/leaves-plants.png" alt="Plant" fill className="object-contain" />
                </div>
                <div className="absolute right-[12%] bottom-[8%] w-24 h-24 opacity-40 blur-[1px]">
                     <Image src="/images/leaves-plants.png" alt="Plant" fill className="object-contain" />
                </div>
                <div className="absolute left-[40%] bottom-[15%] w-12 h-12 opacity-30 rotate-45">
                     <Image src="/images/leaves-plants.png" alt="Plant" fill className="object-contain" />
                </div>
            </div>
        </div>
    );
}
