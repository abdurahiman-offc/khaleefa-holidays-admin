"use client";

import { motion } from "framer-motion";

export default function SectionBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-70">
            {/* Organic Blobs mimicking Shader Gradient */}
            <motion.div
                animate={{
                    x: ["-10%", "10%", "-10%"],
                    y: ["-10%", "20%", "-10%"],
                    scale: [1, 1.2, 1],
                    rotate: [0, 45, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-br from-blue-900/10 to-transparent blur-[60px] will-change-transform transform-gpu"
            />

            <motion.div
                animate={{
                    x: ["10%", "-20%", "10%"],
                    y: ["10%", "-10%", "10%"],
                    scale: [1, 1.1, 1],
                    rotate: [0, -30, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-1/4 -right-1/4 w-[70%] h-[70%] rounded-[60%_40%_30%_70%/50%_60%_40%_60%] bg-gradient-to-tr from-indigo-900/10 to-transparent blur-[50px] will-change-transform transform-gpu"
            />

            <motion.div
                animate={{
                    x: ["-5%", "15%", "-5%"],
                    y: ["20%", "-5%", "20%"],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -bottom-1/4 left-1/4 w-[75%] h-[75%] rounded-[50%_50%_20%_80%/40%_40%_60%_60%] bg-gradient-to-r from-blue-950/5 to-transparent blur-[70px] will-change-transform transform-gpu"
            />

            {/* Grain/Noise Overlay for that premium "shader" look */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}
