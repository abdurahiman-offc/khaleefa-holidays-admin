"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, X, User, Phone, MessageSquare, Plane, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { isValidPhone, PHONE_ERROR_MESSAGE } from "@/lib/utils";
import ScatteredShapes from "./ScatteredShapes";
import { Dosis, Satisfy } from "next/font/google";

const dosis = Dosis({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const satisfy = Satisfy({
    subsets: ["latin"],
    weight: ["400"],
});

export default function ExploreB2B() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });

    useEffect(() => {
        if (isModalOpen) setSubmitted(false);
    }, [isModalOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === "phone") setPhoneError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPhoneError("");
        if (!isValidPhone(formData.phone)) {
            setPhoneError(PHONE_ERROR_MESSAGE);
            return;
        }
        // Save to DB
        try {
            await fetch("/api/submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "B2B",
                    name: formData.name,
                    phone: formData.phone,
                    message: formData.message,
                }),
            });
        } catch (error) {
            console.error("Failed to save submission", error);
        }

        setSubmitted(true);
        setFormData({ name: "", phone: "", message: "" });
    };

    return (
        <section id="b2b" className="pt-[100px] pb-7 md:pb-[100px] bg-[#151794] relative overflow-hidden">
            {/* Background Effect */}
            <ScatteredShapes />

            <div className="container mx-auto px-6 relative z-10">
                <div onClick={() => setIsModalOpen(true)} className="block group cursor-pointer">
                    <motion.div
                        className="bg-transparent overflow-hidden relative border-[10px] border-white rounded-[40px] transition-all duration-500"
                        whileHover={{ scale: 0.98 }}
                    >
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                        <div className="flex flex-col items-center justify-center relative min-h-[400px] lg:min-h-[550px]">
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src="https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Khaleefa Holidays B2B Travel Partnership Opportunities"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Initial Black Overlay (0.8 Opacity) */}
                                <div className="absolute inset-0 bg-black/80 transition-opacity duration-500 group-hover:opacity-0" />

                                {/* Hover Black Overlay (0.9 Opacity) */}
                                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                    <div className={`text-white text-4xl lg:text-5xl font-bold flex items-center gap-4 text-center px-4 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-100 ${satisfy.className}`}>
                                        Click to Reach Us
                                        <MoveRight className="w-10 h-10 lg:w-12 lg:h-12" />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-3/4 p-8 lg:p-20 relative z-10 text-center lg:text-left transition-opacity duration-500 group-hover:opacity-0">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className={`text-4xl md:text-[42px] font-normal text-white mb-4 md:mb-6 leading-tight ${satisfy.className}`}>
                                        Let's join hand together
                                    </h2>
                                    <p className={`text-2xl md:text-3xl lg:text-[46px] text-white/90 mb-0 leading-relaxed max-w-2xl font-medium ${dosis.className}`}>
                                        Explore B2B opportunity with Khaleefa Holiday. Join our exclusive network of travel partners.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Enquiry Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-20 pb-10">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-[#151794] p-6 text-white relative flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold mb-1">B2B Partnership</h3>
                                    <p className="text-white/80 text-sm">Join our exclusive network</p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
                                    className="p-2 hover:bg-white/20 rounded-full transition-colors relative z-20"
                                >
                                    <X size={24} />
                                </button>

                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                            </div>

                            {/* Form or Thank You */}
                            <div className="p-6 md:p-8 bg-slate-50 relative z-20" onClick={(e) => e.stopPropagation()}>
                                {submitted ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle2 size={28} className="text-green-600" />
                                        </div>
                                        <h4 className="text-xl font-bold text-[#151794] mb-2">Thank You!</h4>
                                        <p className="text-gray-600 text-sm">We&apos;ve received your enquiry and will get back to you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="bg-white border-2 border-gray-100 rounded-xl p-3 focus-within:ring-1 focus-within:ring-[#151794] focus-within:border-[#151794] transition-all shadow-sm group">
                                            <label className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 group-focus-within:text-[#151794]">
                                                <User size={14} /> Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full text-base font-bold text-gray-900 focus:outline-none bg-transparent placeholder-gray-400"
                                                placeholder="Your name or company"
                                            />
                                        </div>

                                        <div className={`bg-white border-2 rounded-xl p-3 focus-within:ring-1 focus-within:ring-[#151794] transition-all shadow-sm group ${phoneError ? "border-red-400 focus-within:border-red-400" : "border-gray-100 focus-within:border-[#151794]"}`}>
                                            <label className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 group-focus-within:text-[#151794]">
                                                <Phone size={14} /> Phone
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full text-base font-bold text-gray-900 focus:outline-none bg-transparent placeholder-gray-400"
                                                placeholder="+91 00000 00000"
                                            />
                                            {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                                        </div>

                                        <div className="bg-white border-2 border-gray-100 rounded-xl p-3 focus-within:ring-1 focus-within:ring-[#151794] focus-within:border-[#151794] transition-all shadow-sm group">
                                            <label className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 group-focus-within:text-[#151794]">
                                                <MessageSquare size={14} /> Enquiry
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={3}
                                                className="w-full text-base font-bold text-gray-900 focus:outline-none bg-transparent placeholder-gray-400 resize-none"
                                                placeholder="How can we help you?"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full mt-4 bg-[#151794] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#1a1cba] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2 group shadow-md"
                                        >
                                            Submit Enquiry <Plane size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
