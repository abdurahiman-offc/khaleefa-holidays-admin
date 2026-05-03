"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SectionBackground from "./SectionBackground";
import { Plane, Calendar, Clock, MapPin, Hash, User, Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { isValidPhone, PHONE_ERROR_MESSAGE } from "@/lib/utils";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState("");

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
                    type: "Contact",
                    name: formData.name,
                    phone: formData.phone,
                    message: formData.message,
                }),
            });
        } catch (error) {
            console.error("Failed to save submission", error);
        }
        setSubmitted(true);
    };

    const [pnr, setPnr] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setPnr("KH" + Math.floor(Math.random() * 90000 + 10000));
    }, []);

    const today = mounted
        ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
        : "--- --- ---";

    return (
        <section id="contact" className="pt-[100px] pb-[94px] md:pb-[200px] bg-[#F5F5F5] relative overflow-hidden contain-paint">
            <SectionBackground />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black tracking-[0.2em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#18189C] to-black">Contact Us</h2>
                    </div>

                    {/* Flight Ticket Container */}
                    <div className="flex flex-col lg:flex-row bg-white/60 backdrop-blur-3xl rounded-[40px] shadow-xl relative border border-[#18189C]/5">

                        {/* Cutouts for Mobile */}
                        <div className="lg:hidden absolute -left-[20px] top-[60%] w-[40px] h-[40px] bg-white rounded-full z-20 pointer-events-none" />
                        <div className="lg:hidden absolute -right-[20px] top-[60%] w-[40px] h-[40px] bg-white rounded-full z-20 pointer-events-none" />

                        {/* Cutouts for Desktop */}
                        <div className="hidden lg:block absolute left-[70%] -top-[20px] w-[40px] h-[40px] bg-white rounded-full z-20 transform -translate-x-1/2 pointer-events-none" />
                        <div className="hidden lg:block absolute left-[70%] -bottom-[20px] w-[40px] h-[40px] bg-white rounded-full z-20 transform -translate-x-1/2 pointer-events-none" />

                        {/* --- LEFT SECTION: MAIN TICKET --- */}
                        <div className="w-full lg:w-[70%] p-6 md:p-10 border-b-2 lg:border-b-0 lg:border-r-2 border-dashed border-[#18189C]/10 relative bg-transparent lg:rounded-l-[40px] max-lg:rounded-t-[40px]">

                            {/* Header */}
                            <div className="flex justify-between items-center mb-8 border-b-2 border-[#18189C]/5 pb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[#18189C] text-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12">
                                        <Plane size={24} className="transform rotate-45" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-[#18189C] tracking-tighter uppercase">Khaleefa Holidays</h3>
                                        <p className="text-[10px] font-black text-[#18189C]/40 tracking-[0.2em] uppercase">First Class Travel</p>
                                    </div>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-[10px] font-black text-[#18189C]/30 tracking-widest uppercase mb-1">Boarding Status</p>
                                    <span className="px-4 py-1.5 bg-[#FF85A1]/10 text-[#FF85A1] border border-[#FF85A1]/20 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm inline-block">
                                        On Time
                                    </span>
                                </div>
                            </div>

                            {/* Flight Route Display */}
                            <div className="flex items-center justify-between mb-8 bg-[#18189C]/5 rounded-[32px] p-6 border border-[#18189C]/5 relative overflow-hidden">
                                {/* Decorative background pattern */}
                                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#18189C_1px,transparent_1px)] [background-size:16px_16px]"></div>

                                <div className="text-center relative z-10 w-24">
                                    <p className="text-4xl md:text-5xl font-black text-[#18189C] tracking-tighter">HME</p>
                                    <p className="text-[11px] text-[#18189C]/30 font-black tracking-widest uppercase mt-1">Origin</p>
                                </div>

                                <div className="flex-1 px-4 md:px-8 flex flex-col items-center justify-center relative z-10">
                                    <div className="flex items-center justify-between w-full text-[10px] text-[#18189C]/30 font-black tracking-widest uppercase mb-2">
                                        <span>Flight KH-786</span>
                                        <span>Direct</span>
                                    </div>
                                    <div className="w-full relative flex items-center">
                                        <div className="w-3 h-3 rounded-full border-2 border-[#18189C] bg-white z-10"></div>
                                        <div className="flex-1 h-[2px] border-b-2 border-dashed border-[#18189C]/20 relative">
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#18189C] bg-white px-2 rounded-full">
                                                <Plane size={20} className="transform rotate-90" />
                                            </div>
                                        </div>
                                        <div className="w-3 h-3 rounded-full border-2 border-[#18189C] bg-[#18189C] z-10"></div>
                                    </div>
                                </div>

                                <div className="text-center relative z-10 w-24">
                                    <p className="text-4xl md:text-5xl font-black text-[#18189C] tracking-tighter">KHL</p>
                                    <p className="text-[11px] text-[#18189C]/30 font-black tracking-widest uppercase mt-1">Destination</p>
                                </div>
                            </div>

                            {/* Passenger Details Form or Thank You */}
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center relative z-10">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle2 size={32} className="text-green-600" />
                                    </div>
                                    <h4 className="text-2xl font-black text-[#18189C] uppercase tracking-tight mb-2">Thank You!</h4>
                                    <p className="text-[#18189C]/60 font-black uppercase tracking-tight">We've received your message and will get back to you shortly.</p>
                                </div>
                            ) : (
                                <form id="ticket-form" onSubmit={handleSubmit} className="space-y-4 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white/40 border-2 border-[#18189C]/10 rounded-2xl p-3 focus-within:ring-2 focus-within:ring-[#18189C]/10 transition-all shadow-sm group">
                                            <label className="flex items-center gap-2 text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest mb-1 group-focus-within:text-[#18189C]">
                                                <User size={14} /> Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full text-lg font-black text-[#18189C] focus:outline-none bg-transparent placeholder-[#18189C]/20 uppercase tracking-tight"
                                                placeholder="JANE DOE"
                                            />
                                        </div>
                                        <div className={`bg-white/40 border-2 rounded-2xl p-3 focus-within:ring-2 focus-within:ring-[#18189C]/10 transition-all shadow-sm group ${phoneError ? "border-red-400" : "border-[#18189C]/10"}`}>
                                            <label className="flex items-center gap-2 text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest mb-1 group-focus-within:text-[#18189C]">
                                                <Phone size={14} /> Phone
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full text-lg font-black text-[#18189C] focus:outline-none bg-transparent placeholder-[#18189C]/20 uppercase tracking-tight"
                                                placeholder="+91 00000 00000"
                                            />
                                            {phoneError && <p className="text-red-500 text-[10px] mt-1 font-black">{phoneError}</p>}
                                        </div>
                                    </div>

                                    <div className="bg-white/40 border-2 border-[#18189C]/10 rounded-2xl p-3 focus-within:ring-2 focus-within:ring-[#18189C]/10 transition-all shadow-sm group">
                                        <label className="flex items-center gap-2 text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest mb-1 group-focus-within:text-[#18189C]">
                                            <MessageSquare size={14} /> Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={3}
                                            className="w-full text-lg font-black text-[#18189C] focus:outline-none bg-transparent placeholder-[#18189C]/20 uppercase tracking-tight resize-none"
                                            placeholder="ANY SPECIAL REQUESTS?"
                                        />
                                    </div>

                                    {/* Mobile Confirm Button */}
                                    {!submitted && (
                                        <button
                                            type="submit"
                                            className="w-full lg:hidden bg-[#18189C] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all duration-300 flex justify-center items-center gap-2 group mt-6 shadow-lg"
                                        >
                                            Confirm <Plane size={16} className="transform group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    )}
                                </form>
                            )}

                        </div>

                        {/* --- RIGHT SECTION: TICKET STUB --- */}
                        <div className="w-full lg:w-[30%] bg-[#18189C]/5 p-6 md:p-10 flex flex-col justify-between relative lg:rounded-r-[40px] max-lg:rounded-b-[40px] text-[#18189C]">

                            <div className="space-y-6">
                                {/* Stub Header */}
                                <div className="border-b-2 border-[#18189C]/5 pb-4 flex justify-between items-start">
                                    <div>
                                        <p className="text-[10px] font-black text-[#18189C]/30 tracking-widest uppercase mb-1">Boarding Pass</p>
                                        <h4 className="font-black text-xl text-[#18189C] uppercase tracking-tighter truncate max-w-[150px]">
                                            {formData.name || "PASSENGER"}
                                        </h4>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border-2 border-[#18189C]/10 flex items-center justify-center text-[#18189C]/20">
                                        <User size={18} />
                                    </div>
                                </div>

                                {/* Stub Details */}
                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    <div>
                                        <p className="text-[9px] font-black text-[#18189C]/30 uppercase tracking-widest flex items-center gap-1 mb-1"><Calendar size={10} /> Date</p>
                                        <p className="font-black text-[#18189C]/80 text-xs sm:text-sm truncate uppercase tracking-tight">{today}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-[#18189C]/30 uppercase tracking-widest flex items-center gap-1 mb-1"><Clock size={10} /> Boarding</p>
                                        <p className="font-black text-[#FF85A1] text-xs sm:text-sm animate-pulse uppercase tracking-tight">NOW</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-[#18189C]/30 uppercase tracking-widest flex items-center gap-1 mb-1"><MapPin size={10} /> Gate</p>
                                        <p className="font-black text-[#18189C]/80 text-xl uppercase tracking-tighter">A1</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-[#18189C]/30 uppercase tracking-widest flex items-center gap-1 mb-1"><Hash size={10} /> Seat</p>
                                        <p className="font-black text-[#18189C]/80 text-xl uppercase tracking-tighter">14A</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-6">
                                {/* Barcode Visual */}
                                <div className="flex justify-between items-end h-12 w-full opacity-60">
                                    {[...Array(24)].map((_, i) => {
                                        const width = [2, 4, 1, 3, 2, 5, 1, 2, 4][i % 9];
                                        const height = i % 3 === 0 ? '100%' : '80%';
                                        return (
                                            <div
                                                key={i}
                                                className="bg-[#18189C] rounded-[1px]"
                                                style={{
                                                    width: `${width}px`,
                                                    height: height
                                                }}
                                            />
                                        )
                                    })}
                                </div>

                                <div className="flex justify-between items-center text-[10px] font-mono text-[#18189C]/30 tracking-[0.2em] border-b-2 border-dashed border-[#18189C]/10 pb-4">
                                    <span>PNR: {mounted ? pnr : "KH00000"}</span>
                                </div>

                                {!submitted && (
                                    <button
                                        type="submit"
                                        form="ticket-form"
                                        className="w-full hidden lg:flex bg-[#18189C] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] hover:shadow-xl active:scale-95 transition-all duration-300 justify-center items-center gap-2 group shadow-lg"
                                    >
                                        Confirm <Plane size={16} className="transform group-hover:translate-x-1 transition-transform" />
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div >
        </section >
    );
}
