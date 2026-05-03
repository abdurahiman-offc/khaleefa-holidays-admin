"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SHAPES = ["circle", "square", "triangle", "cross", "pill"];

export default function ScatteredShapes() {
    const [shapes, setShapes] = useState<any[]>([]);

    useEffect(() => {
        // Generate random shapes on client to avoid hydration mismatch
        const generated = Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            type: SHAPES[Math.floor(Math.random() * SHAPES.length)],
            top: `${Math.floor(Math.random() * 95)}%`,
            left: `${Math.floor(Math.random() * 95)}%`,
            size: Math.floor(Math.random() * 25) + 15, // 15px to 40px
            opacity: Math.random() * 0.15 + 0.05, // 0.05 to 0.20 light opacity
            delay: Math.random() * 5,
            duration: Math.random() * 15 + 15,
        }));
        setShapes(generated);
    }, []);

    if (shapes.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {shapes.map((shape) => {
                if (shape.type === "circle") {
                    return (
                        <motion.div
                            key={shape.id}
                            animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: 360 }}
                            transition={{ duration: shape.duration, repeat: Infinity, delay: shape.delay, ease: "linear" }}
                            className="absolute bg-[#18189C] rounded-full backdrop-blur-sm"
                            style={{ top: shape.top, left: shape.left, width: shape.size, height: shape.size, opacity: shape.opacity }}
                        />
                    );
                }
                if (shape.type === "square") {
                    return (
                        <motion.div
                            key={shape.id}
                            animate={{ y: [0, 30, 0], x: [0, -20, 0], rotate: -360 }}
                            transition={{ duration: shape.duration, repeat: Infinity, delay: shape.delay, ease: "linear" }}
                            className="absolute bg-[#18189C] backdrop-blur-sm rounded-sm"
                            style={{ top: shape.top, left: shape.left, width: shape.size, height: shape.size, opacity: shape.opacity }}
                        />
                    );
                }
                if (shape.type === "pill") {
                    return (
                        <motion.div
                            key={shape.id}
                            animate={{ y: [0, -20, 0], x: [0, -30, 0], rotate: 360 }}
                            transition={{ duration: shape.duration, repeat: Infinity, delay: shape.delay, ease: "linear" }}
                            className="absolute bg-[#18189C] backdrop-blur-sm rounded-full"
                            style={{ top: shape.top, left: shape.left, width: shape.size * 1.5, height: shape.size * 0.5, opacity: shape.opacity }}
                        />
                    );
                }
                if (shape.type === "triangle") {
                    return (
                        <motion.div
                            key={shape.id}
                            animate={{ y: [0, 40, 0], rotate: 360 }}
                            transition={{ duration: shape.duration, repeat: Infinity, delay: shape.delay, ease: "linear" }}
                            className="absolute flex items-center justify-center backdrop-blur-sm"
                            style={{ top: shape.top, left: shape.left, opacity: shape.opacity }}
                        >
                            <svg width={shape.size} height={shape.size} viewBox="0 0 100 100" className="fill-[#18189C]">
                                <polygon points="50,0 100,100 0,100" />
                            </svg>
                        </motion.div>
                    );
                }
                if (shape.type === "cross") {
                    return (
                        <motion.div
                            key={shape.id}
                            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                            transition={{ duration: shape.duration, repeat: Infinity, delay: shape.delay, ease: "linear" }}
                            className="absolute flex items-center justify-center backdrop-blur-sm"
                            style={{ top: shape.top, left: shape.left, width: shape.size, height: shape.size, opacity: shape.opacity }}
                        >
                            <div className="absolute w-full h-[25%] bg-[#18189C] rounded-sm" />
                            <div className="absolute h-full w-[25%] bg-[#18189C] rounded-sm" />
                        </motion.div>
                    );
                }
                return null;
            })}
        </div>
    );
}
