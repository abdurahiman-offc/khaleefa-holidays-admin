"use client";

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
        delay: 0,
    },
    {
        name: "David Chen",
        location: "Toronto, Canada",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        text: "I've never had a smoother travel experience. The tailored itineraries were spot on for my family's needs.",
        delay: 0.1,
    },
    {
        name: "Elena Rodriguez",
        location: "Madrid, Spain",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        rating: 4,
        text: "Great app with amazing customer support. Highly recommend for anyone looking to explore new places without the hassle.",
        delay: 0.2,
    },
];

export default function Testimonials() {
    return (
        <section id="reviews" className="pt-[100px] pb-7 md:pb-[100px] bg-[#151794] relative overflow-hidden">
            {/* Scattered Small White Shapes */}
            <ScatteredShapes />

            <div className="container mx-auto px-6 relative z-10 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 relative z-10"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-yomogi)]">
                        Experiences from Our Adventurers
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: testimonial.delay }}
                            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100/50"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-bookease-navy ">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm text-slate-500 ">
                                        {testimonial.location}
                                    </p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-slate-600  italic">
                                &quot;{testimonial.text}&quot;
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
