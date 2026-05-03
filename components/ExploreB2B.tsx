"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, X, User, Phone, MessageSquare, Plane, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { isValidPhone, PHONE_ERROR_MESSAGE } from "@/lib/utils";
import SectionBackground from "./SectionBackground";
import { Dosis } from "next/font/google";

const dosis = Dosis({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
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

    // Body scroll lock on modal open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isModalOpen]);

    return (
        <section id="b2b" className={`py-[80px] md:py-[120px] bg-[#F5F5F5] relative transition-colors duration-300 ${isModalOpen ? 'z-[100]' : 'z-10'}`}>
            <SectionBackground />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Side: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative order-2 lg:order-1"
                    >
                        <div className="relative aspect-square rounded-[40px] overflow-hidden">
                            <Image
                                src="/images/b2b-2.png"
                                alt="Khaleefa Holidays B2B Travel Partnership Opportunities"
                                fill
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 text-left order-1 lg:order-2"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-[#18189C] to-black">
                            Let's join hand together
                        </h2>
                        <p className={`text-xl md:text-2xl lg:text-3xl text-black/60 leading-relaxed mb-10 normal-case ${dosis.className} font-medium italic`}>
                            Explore B2B opportunity with Khaleefa Holiday. Join our exclusive network of travel partners and grow your business with us.
                        </p>
                        
                        <div className="relative group/btn w-fit">
                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 transition-transform" />
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="relative bg-[#18189C] text-white px-10 py-4 rounded-full border-2 border-black text-sm font-black uppercase tracking-widest flex items-center gap-3"
                            >
                                Partner with Us
                                <MoveRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Enquiry Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 pt-20 pb-10">
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
                            className="bg-[#F5F5F5] rounded-[40px] shadow-[0_10px_25px_rgba(0,0,0,0.08),_0_4px_10px_rgba(0,0,0,0.05)] w-full max-w-4xl relative z-10 overflow-hidden text-[#18189C] border-[10px] border-white flex flex-col md:flex-row min-h-[500px]"
                        >
                            {/* Visual Cutouts for Ticket Effect */}
                            <div className="hidden md:block absolute left-[33%] -top-[20px] w-10 h-10 bg-white rounded-full z-20 pointer-events-none shadow-[inset_0_-4px_10px_rgba(0,0,0,0.05)]" />
                            <div className="hidden md:block absolute left-[33%] -bottom-[20px] w-10 h-10 bg-white rounded-full z-20 pointer-events-none shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)]" />

                            {/* Sticky Close Button (Inside) */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 w-10 h-10 bg-white shadow-xl rounded-full border border-[#18189C]/10 flex items-center justify-center text-[#18189C] hover:text-red-500 transition-all z-[110] group"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform" />
                            </button>

                            {/* Left Section: Partnership Branding (Stub) */}
                            <div className="w-full md:w-1/3 bg-[#18189C] p-8 md:p-10 flex flex-col justify-between text-white border-b-2 md:border-b-0 md:border-r-2 border-dashed border-white/20">
                                <div>
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-inner transform -rotate-12">
                                        <Plane size={32} className="transform rotate-45" />
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4">B2B<br />Partner</h3>
                                    <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.1em] leading-relaxed max-w-[150px]">
                                        Please fill out the form, and our team will contact you soon.
                                    </p>
                                </div>

                                {/* Visual Barcode for Stub Effect */}
                                <div className="mt-12 pt-6 border-t border-white/10 hidden md:block">
                                    <div className="flex justify-between items-center text-[10px] font-mono text-white/20 tracking-widest uppercase mb-4">
                                        <span>Partner ID</span>
                                        <span>B2B-KH-2024</span>
                                    </div>
                                    <div className="flex gap-1 h-12 overflow-hidden opacity-30">
                                        {[...Array(15)].map((_, i) => {
                                            const width = Math.floor(Math.random() * 3) + 1;
                                            const height = Math.floor(Math.random() * 40) + 60;
                                            return (
                                                <div
                                                    key={i}
                                                    className="bg-white rounded-[1px]"
                                                    style={{
                                                        width: `${width}px`,
                                                        height: `${height}%`
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Right Section: Form Body */}
                            <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center text-center py-10"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                            <CheckCircle2 size={40} className="text-green-600" />
                                        </div>
                                        <h4 className="text-2xl font-black uppercase tracking-tighter text-[#18189C] mb-3">Request Sent!</h4>
                                        <p className="text-[#18189C]/60 text-sm font-black uppercase max-w-xs mx-auto">
                                            Thank you for your interest. Our B2B team will contact you shortly.
                                        </p>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="mt-8 text-[#18189C] text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-[#18189C]/20 pb-1 hover:border-[#18189C] transition-all"
                                        >
                                            Return to Site
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="max-w-md mx-auto w-full">
                                        <div className="mb-10">
                                            <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">Join the Elite</h4>
                                            <p className="text-[#18189C]/40 text-xs font-black uppercase tracking-widest italic">Complete the enquiry to start your journey.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest px-1 flex items-center gap-2">
                                                    <User size={12} /> Full Name
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-5 py-4 bg-white border border-[#18189C]/10 rounded-2xl focus:ring-2 focus:ring-[#18189C]/10 outline-none text-sm font-black uppercase transition-all text-[#18189C] tracking-tight"
                                                    placeholder="NAME / COMPANY"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest px-1 flex items-center gap-2">
                                                    <Phone size={12} /> Mobile Number
                                                </label>
                                                <input
                                                    required
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className={`w-full px-5 py-4 bg-white border rounded-2xl focus:ring-2 focus:ring-[#18189C]/10 outline-none text-sm font-black uppercase transition-all text-[#18189C] tracking-tight ${phoneError ? "border-red-400" : "border-[#18189C]/10"}`}
                                                    placeholder="+91 0000 0000"
                                                />
                                                {phoneError && <p className="text-red-500 text-[10px] mt-1 font-black px-1">{phoneError}</p>}
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest px-1 flex items-center gap-2">
                                                    <MessageSquare size={12} /> Partnership Note
                                                </label>
                                                <textarea
                                                    required
                                                    name="message"
                                                    rows={3}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    className="w-full px-5 py-4 bg-white border border-[#18189C]/10 rounded-2xl focus:ring-2 focus:ring-[#18189C]/10 outline-none text-sm font-black uppercase resize-none transition-all text-[#18189C] tracking-tight"
                                                    placeholder="Tell us about your business..."
                                                />
                                            </div>

                                            <div className="relative group w-full pt-4">
                                                <div className="absolute -inset-1 bg-black rounded-2xl transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                                <button
                                                    type="submit"
                                                    className="relative w-full bg-[#18189C] text-white px-8 py-4 rounded-2xl border-2 border-black text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                                                >
                                                    Partner with us now
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
