"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "How does Bookease work?",
        answer:
            "Bookease connects you with curated travel experiences. Simply browse our destinations, select your preferred itinerary, and book instantly through the app.",
    },
    {
        question: "Can I cancel my booking?",
        answer:
            "Yes, cancellations are allowed within the cancellation period specified for each booking. You can manage your bookings directly in the 'My Trips' section.",
    },
    {
        question: "Are there hidden fees?",
        answer:
            "No, we believe in transparency. The price you see includes all taxes and fees. There are no surprise charges at checkout.",
    },
    {
        question: "Is customer support available 24/7?",
        answer:
            "Absolutely! Our dedicated support team is available around the clock to assist you with any questions or issues you may have during your travels.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="pt-[100px] pb-[100px] bg-[#F5F5F5]">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-2xl md:text-3xl font-black mb-4 uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-[#18189C] to-black">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-slate-600 ">
                        Got questions? We&apos;ve got answers.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-[#F5F5F5] rounded-[32px] shadow-[0_10px_25px_rgba(0,0,0,0.08),_0_4px_10px_rgba(0,0,0,0.05)] border-[10px] border-white overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 bg-transparent border-none backdrop-blur-sm hover:bg-bookease-navy/5 transition-colors text-left"
                            >
                                <span className="text-lg font-semibold text-bookease-navy ">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <Minus className="w-5 h-5 text-bookease-navy" />
                                ) : (
                                    <Plus className="w-5 h-5 text-slate-400" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 bg-white  text-slate-600  border-t border-slate-100 ">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
