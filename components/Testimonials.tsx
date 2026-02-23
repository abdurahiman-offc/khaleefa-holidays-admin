"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import ScatteredShapes from "./ScatteredShapes";

const testimonials = [
    {
        name: "Sarah Mitchell",
        location: "New York, USA",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        text: "Bookease revolutionized how I plan my trips. The curated locations are simply breathtaking, and the booking process is seamless.",
    },
    {
        name: "David Chen",
        location: "Toronto, Canada",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        text: "I've never had a smoother travel experience. The tailored itineraries were spot on for my family's needs.",
    },
    {
        name: "Elena Rodriguez",
        location: "Madrid, Spain",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        rating: 4,
        text: "Great app with amazing customer support. Highly recommend for anyone looking to explore new places without the hassle.",
    },
    {
        name: "James Wilson",
        location: "London, UK",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        text: "Absolutely incredible service. From visa processing to the actual tour, everything was handled professionally.",
    },
    {
        name: "Ananya Rao",
        location: "Mumbai, India",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        text: "Khaleefa Holidays made our dream vacation a reality. Their attention to detail is unmatched in the industry.",
    },
    {
        name: "Marcus Weber",
        location: "Berlin, Germany",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        text: "Fast, reliable, and premium. The B2B options are especially impressive for corporate travel needs.",
    }
];

export default function Testimonials() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Duplicate testimonials for seamless loop on desktop
    const doubledTestimonials = [...testimonials, ...testimonials];

    // Auto-swipe logic for mobile
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const nextIndex = (activeIndex + 1) % testimonials.length;
                const scrollAmount = scrollRef.current.offsetWidth * nextIndex;

                scrollRef.current.scrollTo({
                    left: scrollAmount,
                    behavior: "smooth"
                });
                setActiveIndex(nextIndex);
            }
        }, 4000); // Swipe every 4 seconds

        return () => clearInterval(interval);
    }, [activeIndex]);

    return (
        <section id="reviews" className="pt-[100px] pb-7 md:pb-[100px] bg-[#151794] relative overflow-hidden">
            {/* Scattered Small White Shapes */}
            <ScatteredShapes />

            <div className="relative z-10 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 px-6"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-yomogi)]">
                        Experiences from Our Adventurers
                    </h2>
                </motion.div>

                {/* Desktop: Free Moving Carousel (Marquee) */}
                <div className="hidden md:block relative overflow-hidden py-10">
                    {/* Gradient Overlays for Fade Effect */}
                    <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#151794] to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#151794] to-transparent z-20 pointer-events-none" />

                    <motion.div
                        className="flex gap-6 w-fit"
                        animate={{
                            x: [0, -1920], // Adjusted based on card width + gap
                        }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            display: 'flex',
                        }}
                        whileHover={{ animationPlayState: 'paused' }}
                    >
                        {doubledTestimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white p-5 md:p-6 rounded-3xl shadow-lg border border-slate-100/50 w-[280px] md:w-[340px] flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]"
                            >
                                <div className="flex items-center gap-3 md:gap-4 mb-4">
                                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-sm">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={`${testimonial.name} - Verified Traveler at Khaleefa Holidays`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-bookease-navy text-sm md:text-base truncate">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest truncate">
                                            {testimonial.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={12}
                                            className={`${i < testimonial.rating
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-4 italic border-l-2 border-[#151794]/10 pl-3">
                                    &quot;{testimonial.text}&quot;
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Mobile: Swipeable Carousel (Snap Scroller) */}
                <div className="md:hidden relative px-6 py-6">
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-5 snap-x snap-mandatory scrollbar-hide pb-8"
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100/50 w-[85vw] flex-shrink-0 snap-center"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={`${testimonial.name} - Happy Traveler with Khaleefa Holidays`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-bookease-navy text-sm truncate">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">
                                            {testimonial.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={12}
                                            className={`${i < testimonial.rating
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-600 text-xs leading-relaxed italic border-l-2 border-[#151794]/10 pl-3">
                                    &quot;{testimonial.text}&quot;
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Hint Dots */}
                    <div className="flex justify-center gap-2 -mt-4">
                        {testimonials.map((_, i) => (
                            <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-white w-4" : "bg-white/20"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
