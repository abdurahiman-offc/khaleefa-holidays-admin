"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ScatteredShapes from "./ScatteredShapes";
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

    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

    // Using a static/memoized approach for PNR would prevent hydration mismatch, but since it's just a visual UI, random should be okay. 
    // To prevent hydration errors, we can use a stable ID or useEffect, but for simplicity a static initial is fine.
    // Let's use a simple stable string or hide it initially if it causes mismatch. We'll use a static string for SSR matching, or state for client.
    const [pnr] = useState(() => "KH" + Math.floor(Math.random() * 90000 + 10000));

    return (
        <section id="contact" className="pt-[100px] pb-11 md:pb-[150px] bg-[#151794] relative overflow-hidden">
            <ScatteredShapes />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-wider uppercase font-[family-name:var(--font-yomogi)]">Contact Us</h2>
                    </div>

                    {/* Flight Ticket Container */}
                    <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative">

                        {/* Cutouts for Mobile */}
                        <div className="lg:hidden absolute -left-[20px] top-[60%] w-[40px] h-[40px] bg-[#151794] rounded-full z-20 pointer-events-none" />
                        <div className="lg:hidden absolute -right-[20px] top-[60%] w-[40px] h-[40px] bg-[#151794] rounded-full z-20 pointer-events-none" />

                        {/* Cutouts for Desktop */}
                        <div className="hidden lg:block absolute left-[70%] -top-[20px] w-[40px] h-[40px] bg-[#151794] rounded-full z-20 transform -translate-x-1/2 pointer-events-none" />
                        <div className="hidden lg:block absolute left-[70%] -bottom-[20px] w-[40px] h-[40px] bg-[#151794] rounded-full z-20 transform -translate-x-1/2 pointer-events-none" />

                        {/* --- LEFT SECTION: MAIN TICKET --- */}
                        <div className="w-full lg:w-[70%] p-6 md:p-10 border-b-2 lg:border-b-0 lg:border-r-2 border-dashed border-gray-300 relative bg-white lg:rounded-l-3xl max-lg:rounded-t-3xl">

                            {/* Header */}
                            <div className="flex justify-between items-center mb-8 border-b-2 border-gray-100 pb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[#151794] rounded-xl flex items-center justify-center text-white shadow-md transform -rotate-12">
                                        <Plane size={24} className="transform rotate-45" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-[#151794] tracking-tighter uppercase">Khaleefa Holidays</h3>
                                        <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">First Class Travel</p>
                                    </div>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Boarding Status</p>
                                    <span className="px-4 py-1.5 bg-green-50 text-green-600 border border-green-200 rounded-full text-xs font-black uppercase tracking-widest shadow-sm inline-block">
                                        On Time
                                    </span>
                                </div>
                            </div>

                            {/* Flight Route Display */}
                            <div className="flex items-center justify-between mb-8 bg-slate-50 rounded-2xl p-6 border border-slate-100 relative overflow-hidden">
                                {/* Decorative background pattern */}
                                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#151794_1px,transparent_1px)] [background-size:16px_16px]"></div>

                                <div className="text-center relative z-10 w-24">
                                    <p className="text-4xl md:text-5xl font-black text-[#151794] tracking-tighter">HME</p>
                                    <p className="text-[11px] text-gray-500 font-bold tracking-widest uppercase mt-1">Origin</p>
                                </div>

                                <div className="flex-1 px-4 md:px-8 flex flex-col items-center justify-center relative z-10">
                                    <div className="flex items-center justify-between w-full text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-2">
                                        <span>Flight KH-786</span>
                                        <span>Direct</span>
                                    </div>
                                    <div className="w-full relative flex items-center">
                                        <div className="w-3 h-3 rounded-full border-2 border-[#151794] bg-white z-10"></div>
                                        <div className="flex-1 h-[2px] border-b-2 border-dashed border-[#151794]/30 relative">
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#151794] bg-slate-50 px-2 rounded-full">
                                                <Plane size={20} className="transform rotate-90" />
                                            </div>
                                        </div>
                                        <div className="w-3 h-3 rounded-full border-2 border-[#151794] bg-[#151794] z-10"></div>
                                    </div>
                                </div>

                                <div className="text-center relative z-10 w-24">
                                    <p className="text-4xl md:text-5xl font-black text-[#151794] tracking-tighter">KHL</p>
                                    <p className="text-[11px] text-gray-500 font-bold tracking-widest uppercase mt-1">Destination</p>
                                </div>
                            </div>

                            {/* Passenger Details Form or Thank You */}
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center relative z-10">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle2 size={32} className="text-green-600" />
                                    </div>
                                    <h4 className="text-2xl font-black text-[#151794] uppercase tracking-tight mb-2">Thank You!</h4>
                                    <p className="text-gray-600">We&apos;ve received your message and will get back to you shortly.</p>
                                </div>
                            ) : (
                                <form id="ticket-form" onSubmit={handleSubmit} className="space-y-4 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-gray-50 border-2 border-[#151794] rounded-xl p-3 focus-within:ring-1 focus-within:ring-[#151794] focus-within:bg-white transition-all shadow-sm group">
                                            <label className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 group-focus-within:text-[#151794]">
                                                <User size={14} /> Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full text-lg font-bold text-gray-900 focus:outline-none bg-transparent placeholder-gray-400 uppercase"
                                                placeholder="JANE DOE"
                                            />
                                        </div>
                                        <div className={`bg-gray-50 border-2 rounded-xl p-3 focus-within:ring-1 focus-within:ring-[#151794] focus-within:bg-white transition-all shadow-sm group ${phoneError ? "border-red-400" : "border-[#151794]"}`}>
                                            <label className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 group-focus-within:text-[#151794]">
                                                <Phone size={14} /> Phone
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full text-lg font-bold text-gray-900 focus:outline-none bg-transparent placeholder-gray-400 uppercase"
                                                placeholder="+91 00000 00000"
                                            />
                                            {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 border-2 border-[#151794] rounded-xl p-3 focus-within:ring-1 focus-within:ring-[#151794] focus-within:bg-white transition-all shadow-sm group">
                                        <label className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 group-focus-within:text-[#151794]">
                                            <MessageSquare size={14} /> Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={3}
                                            className="w-full text-lg font-bold text-gray-900 focus:outline-none bg-transparent placeholder-gray-400 resize-none uppercase"
                                            placeholder="ANY SPECIAL REQUESTS?"
                                        />
                                    </div>
                                </form>
                            )}

                        </div>

                        {/* --- RIGHT SECTION: TICKET STUB --- */}
                        <div className="w-full lg:w-[30%] bg-[#fafafa] p-6 md:p-10 flex flex-col justify-between relative lg:rounded-r-3xl max-lg:rounded-b-3xl relative">

                            <div className="space-y-6">
                                {/* Stub Header */}
                                <div className="border-b-2 border-gray-200 pb-4 flex justify-between items-start">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Boarding Pass</p>
                                        <h4 className="font-black text-xl text-[#151794] uppercase tracking-tight truncate max-w-[150px]">
                                            {formData.name || "PASSENGER"}
                                        </h4>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400">
                                        <User size={18} />
                                    </div>
                                </div>

                                {/* Stub Details */}
                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    <div>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1"><Calendar size={10} /> Date</p>
                                        <p className="font-bold text-gray-800 text-xs sm:text-sm truncate">{today}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1"><Clock size={10} /> Boarding</p>
                                        <p className="font-bold text-red-600 text-xs sm:text-sm animate-pulse">NOW</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1"><MapPin size={10} /> Gate</p>
                                        <p className="font-black text-gray-800 text-xl">A1</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1"><Hash size={10} /> Seat</p>
                                        <p className="font-black text-gray-800 text-xl">14A</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-6">
                                {/* Barcode Visual */}
                                <div className="flex justify-between items-end h-12 w-full opacity-60 mix-blend-multiply">
                                    {[...Array(24)].map((_, i) => {
                                        // Using a seeded/pseudo-random approach based on index to ensure hydration matches
                                        // or just ignoring hydration mismatch for purely decorative elements
                                        // A simple deterministic pattern looks like a barcode too:
                                        const width = [2, 4, 1, 3, 2, 5, 1, 2, 4][i % 9];
                                        const height = i % 3 === 0 ? '100%' : '80%';
                                        return (
                                            <div
                                                key={i}
                                                className="bg-black rounded-[1px]"
                                                style={{
                                                    width: `${width}px`,
                                                    height: height
                                                }}
                                            />
                                        )
                                    })}
                                </div>

                                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 tracking-[0.2em] border-b-2 border-dashed border-gray-200 pb-4">
                                    <span>PNR:</span>
                                    <span className="font-bold text-black">{pnr}</span>
                                </div>

                                {!submitted && (
                                    <button
                                        type="submit"
                                        form="ticket-form"
                                        className="w-full bg-[#151794] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#1a1cba] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2 group"
                                    >
                                        Confirm <Plane size={16} className="transform group-hover:translate-x-1 transition-transform" />
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
