"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, User, Loader2 } from "lucide-react";
import SectionBackground from "./SectionBackground";

interface Feedback {
    _id?: string;
    name: string;
    place: string;
    stars: number;
    feedback: string;
    createdAt?: string;
}

const fallbackTestimonials: Feedback[] = [
    {
        name: "Sarah Mitchell",
        place: "New York, USA",
        stars: 5,
        feedback: "Bookease revolutionized how I plan my trips. The curated locations are simply breathtaking, and the booking process is seamless.",
    },
    {
        name: "David Chen",
        place: "Toronto, Canada",
        stars: 5,
        feedback: "I've never had a smoother travel experience. The tailored itineraries were spot on for my family's needs.",
    },
    {
        name: "Elena Rodriguez",
        place: "Madrid, Spain",
        stars: 4,
        feedback: "Great app with amazing customer support. Highly recommend for anyone looking to explore new places without the hassle.",
    },
    {
        name: "James Wilson",
        place: "London, UK",
        stars: 5,
        feedback: "Absolutely incredible service. From visa processing to the actual tour, everything was handled professionally.",
    },
    {
        name: "Ananya Rao",
        place: "Mumbai, India",
        stars: 5,
        feedback: "Khaleefa Holidays made our dream vacation a reality. Their attention to detail is unmatched in the industry.",
    },
    {
        name: "Marcus Weber",
        place: "Berlin, Germany",
        stars: 5,
        feedback: "Fast, reliable, and premium. The B2B options are especially impressive for corporate travel needs.",
    }
];

export default function Testimonials() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await fetch("/api/testimonials");
                const data = await res.json();
                if (data.success && data.data.length > 0) {
                    setFeedbacks(data.data);
                } else {
                    setFeedbacks(fallbackTestimonials);
                }
            } catch (error) {
                console.error("Failed to fetch feedbacks", error);
                setFeedbacks(fallbackTestimonials);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    // Duplicate feedbacks for seamless loop on desktop
    const displayFeedbacks = feedbacks.length > 0 ? feedbacks : fallbackTestimonials;
    const doubledFeedbacks = [...displayFeedbacks, ...displayFeedbacks];

    // Auto-swipe logic for mobile
    useEffect(() => {
        if (displayFeedbacks.length === 0) return;

        const interval = setInterval(() => {
            if (scrollRef.current) {
                const nextIndex = (activeIndex + 1) % displayFeedbacks.length;
                const scrollAmount = scrollRef.current.offsetWidth * nextIndex;

                scrollRef.current.scrollTo({
                    left: scrollAmount,
                    behavior: "smooth"
                });
                setActiveIndex(nextIndex);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [activeIndex, displayFeedbacks.length]);

    if (loading) {
        return (
            <section className="py-24 bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#18189C]" />
            </section>
        );
    }

    return (
        <section id="reviews" className="pt-[100px] pb-7 md:pb-[100px] bg-[#F5F5F5] relative overflow-hidden contain-paint">
            {/* Background Effect */}
            <SectionBackground />

            <div className="relative z-10 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 px-6"
                >
                    <h2 className="text-2xl md:text-4xl font-black mb-4 uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-[#18189C] to-black">
                        Trusted Stories
                    </h2>
                </motion.div>

                {/* Desktop: Free Moving Carousel (Marquee) */}
                <div className="hidden md:block relative overflow-hidden py-10 px-10">
                    <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

                    <div className="flex justify-center">
                        <motion.div
                            className="flex gap-10 w-fit"
                            animate={displayFeedbacks.length > 3 ? {
                                x: [0, -2500],
                            } : {}}
                            transition={{
                                duration: 50,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            whileHover={{ animationPlayState: 'paused' }}
                        >
                            {(displayFeedbacks.length > 3 ? doubledFeedbacks : displayFeedbacks).map((item, index) => (
                                <FeedbackCard key={index} item={item} />
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Mobile View: Swipeable Carousel */}
                <div className="md:hidden px-4">
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-8"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {displayFeedbacks.map((item, index) => (
                            <div key={index} className="w-full flex-shrink-0 snap-center">
                                <FeedbackCard item={item} />
                            </div>
                        ))}
                    </div>

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2">
                        {displayFeedbacks.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? "w-6 bg-[#18189C]" : "w-1.5 bg-[#18189C]/20"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeedbackCard({ item }: { item: Feedback }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="relative flex flex-col bg-[#F5F5F5] p-8 rounded-[40px] shadow-[0_10px_25px_rgba(0,0,0,0.08),_0_4px_10px_rgba(0,0,0,0.05)] border-[10px] border-white h-full w-[300px] md:w-[380px] flex-shrink-0"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F5F5F5] rounded-2xl flex items-center justify-center text-[#18189C] shrink-0 shadow-sm border border-slate-100">
                    <User size={28} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-tight">{item.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.place}</p>
                </div>
            </div>

            <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={i < item.stars ? "fill-[#FFB800] text-[#FFB800]" : "text-slate-200"}
                    />
                ))}
            </div>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium italic">
                "{item.feedback}"
            </p>
        </motion.div>
    );
}
