"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ChevronLeft, ChevronRight, Plane, X, MessageSquare, CheckCircle2 } from "lucide-react";
import ScatteredShapes from "./ScatteredShapes";
import { isValidPhone, PHONE_ERROR_MESSAGE } from "@/lib/utils";

interface Destination {
    _id: string;
    name: string;
    image: string;
    price: string;
    popularDestination?: boolean;
    duration?: string;
    description?: string;
}

export default function Destinations() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const activePlace = destinations.find(d => d._id === selectedId);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const res = await fetch("/api/destinations");
                const data = await res.json();
                if (data.success) {
                    setDestinations(data.data.filter((d: Destination) => d.popularDestination));
                }
            } catch (error) {
                console.error("Failed to fetch destinations", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    if (loading) {
        return (
            <section id="destinations" className="py-24 bg-white  min-h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-bookease-navy " />
            </section>
        );
    }

    // Fallback if no data
    if (destinations.length === 0) return null;

    return (
        <section id="destinations" className="pt-[100px] pb-[100px] bg-[#151794] relative overflow-hidden">
            {/* Scattered Small White Shapes */}
            <ScatteredShapes />

            <div className="container mx-auto px-6 relative z-10 pt-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 relative z-10"
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-md font-[family-name:var(--font-yomogi)]">
                        Popular Destinations
                    </h2>
                </motion.div>

                {destinations.length > 4 ? (
                    <div className="relative group/carousel px-10">
                        {/* Scroll Buttons */}
                        <button
                            onClick={() => carouselRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0 hover:bg-white hover:scale-110 active:scale-95 text-[#151794]"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => carouselRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0 hover:bg-white hover:scale-110 active:scale-95 text-[#151794]"
                        >
                            <ChevronRight size={24} />
                        </button>

                        <div
                            ref={carouselRef}
                            className="flex overflow-x-auto gap-6 md:gap-8 pb-8 pt-4 snap-x snap-mandatory scrollbar-hide px-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {destinations.map((place, index) => (
                                <motion.div
                                    key={place._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileHover={{ y: -5, scale: 1.02, zIndex: 10 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    onClick={() => setSelectedId(place._id)}
                                    className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-md border-[3px] border-slate-100 group hover:shadow-2xl transition-all duration-300 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] xl:w-[calc(33.333%-1.333rem)] flex-shrink-0 snap-center cursor-pointer"
                                    style={{ minWidth: "min(100%, 350px)" }}
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={place.image}
                                            alt={place.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                                        {place.popularDestination && (
                                            <div className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1 rounded text-xs font-bold tracking-wider backdrop-blur-md shadow-sm z-10">
                                                POPULAR
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 flex flex-col items-start justify-between gap-4 bg-white">
                                        <div className="min-w-0 w-full">
                                            <h3 className="text-bookease-navy font-bold text-xl md:text-2xl line-clamp-1 mb-1">
                                                {place.name}
                                            </h3>
                                            <p className="text-slate-500 text-base font-semibold">
                                                {place.price}
                                            </p>
                                        </div>

                                        <button
                                            className="w-full bg-[#151794] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap border-2 border-[#151794] transition-all duration-200 transform hover:-translate-y-[2px] active:translate-y-[4px] shadow-[0_4px_0_#0a0b5c,0_10px_15px_rgba(0,0,0,0.3)] active:shadow-[0_0px_0_#0a0b5c,0_0px_0px_rgba(0,0,0,0)]"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-[1400px] mx-auto">
                        {destinations.map((place, index) => (
                            <motion.div
                                key={place._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileHover={{ y: -5, scale: 1.02, zIndex: 10 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                onClick={() => setSelectedId(place._id)}
                                className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-md border-[3px] border-slate-100 group hover:shadow-2xl transition-all duration-300 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] xl:w-[calc(33.333%-1.333rem)] flex-shrink-0 cursor-pointer"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={place.image}
                                        alt={place.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                                    {place.popularDestination && (
                                        <div className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1 rounded text-xs font-bold tracking-wider backdrop-blur-md shadow-sm z-10">
                                            POPULAR
                                        </div>
                                    )}
                                </div>

                                <div className="p-5 flex flex-col items-start justify-between gap-4 bg-white">
                                    <div className="min-w-0 w-full">
                                        <h3 className="text-bookease-navy font-bold text-xl md:text-2xl line-clamp-1 mb-1">
                                            {place.name}
                                        </h3>
                                        <p className="text-slate-500 text-base font-semibold">
                                            {place.price}
                                        </p>
                                    </div>

                                    <button
                                        className="w-full bg-[#151794] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap border-2 border-[#151794] transition-all duration-200 transform hover:-translate-y-[2px] active:translate-y-[4px] shadow-[0_4px_0_#0a0b5c,0_10px_15px_rgba(0,0,0,0.3)] active:shadow-[0_0px_0_#0a0b5c,0_0px_0px_rgba(0,0,0,0)]"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedId && activePlace && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            onClick={() => setSelectedId(null)}
                        />
                        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-8 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl pointer-events-auto max-h-[90vh] flex flex-col md:flex-row"
                            >
                                <DestinationModalContent place={activePlace} onClose={() => setSelectedId(null)} />
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}

function DestinationModalContent({ place, onClose }: { place: Destination, onClose: () => void }) {
    const [formData, setFormData] = useState({ name: "", phone: "", enquiry: "" });
    const [submitted, setSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState("");

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
                    type: "Destination",
                    name: formData.name,
                    phone: formData.phone,
                    message: formData.enquiry,
                    destinationName: place.name,
                }),
            });
        } catch (error) {
            console.error("Failed to save submission", error);
        }

        setSubmitted(true);
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-full relative overflow-hidden bg-white md:rounded-3xl">
            {/* Visual Cutouts for Ticket Effect */}
            <div className="hidden md:block absolute left-[66%] -top-[20px] w-10 h-10 bg-black/60 rounded-full z-20 pointer-events-none" />
            <div className="hidden md:block absolute left-[66%] -bottom-[20px] w-10 h-10 bg-black/60 rounded-full z-20 pointer-events-none" />

            {/* Left Section: Main Ticket Body */}
            <div className="w-full md:w-2/3 p-6 md:p-10 flex flex-col border-b-2 md:border-b-0 md:border-r-2 border-dashed border-slate-200 overflow-y-auto scrollbar-hide">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 border-b-2 border-slate-100 pb-6 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#151794] rounded-2xl flex items-center justify-center text-white shadow-lg transform -rotate-12">
                            <Plane size={24} className="transform rotate-45" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-[#151794] uppercase tracking-tighter">KH Holidays</h3>
                            <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Premium Destination</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Pass Status</p>
                        <span className="px-3 py-1 bg-green-50 text-green-600 border border-green-200 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Verified</span>
                    </div>
                </div>

                {/* Image & Title Section */}
                <div className="relative rounded-3xl overflow-hidden aspect-[16/9] mb-8 group shrink-0">
                    <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151794]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 pr-6">
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none drop-shadow-lg">
                            {place.name}
                        </h2>
                        {place.popularDestination && (
                            <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                Popular Choice
                            </span>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8 shrink-0">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-[#151794] rounded-full" /> Price
                        </p>
                        <p className="font-black text-[#151794] text-lg">{place.price}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-[#151794] rounded-full" /> Duration
                        </p>
                        <p className="font-bold text-slate-700 text-sm italic">{place.duration || "5 Days"}</p>
                    </div>
                </div>

                {/* Overview */}
                <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100/50 relative overflow-hidden shrink-0">
                    <div className="absolute top-4 right-4 text-[#151794]/5"><Plane size={60} /></div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Destination Overview</p>
                    <p className="text-slate-600 leading-relaxed text-sm italic whitespace-pre-wrap relative z-10">{place.description}</p>
                </div>
            </div>

            {/* Right Section: Ticket Stub / Enquiry */}
            <div className="w-full md:w-1/3 bg-slate-50 p-8 md:p-10 flex flex-col overflow-y-auto scrollbar-hide">
                <div className="mb-8">
                    <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mb-1">Boarding Pass ID</p>
                    <h4 className="font-black text-xl text-[#151794] uppercase tracking-tighter break-words">
                        DEST-{(place.name || "TRIP").substring(0, 3).toUpperCase()}-{Math.floor(Math.random() * 1000)}
                    </h4>
                </div>

                <div className="flex-grow">
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 size={28} className="text-green-600" />
                            </div>
                            <h4 className="text-lg font-black text-[#151794] uppercase tracking-tight mb-2">Thank You!</h4>
                            <p className="text-slate-600 text-sm">We&apos;ve received your enquiry and will get back to you shortly.</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-[#151794] text-[11px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                <MessageSquare size={14} /> Quick Enquiry
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Passenger Name</label>
                                    <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#151794]/20 outline-none text-sm font-bold uppercase transition-all" placeholder="YOUR NAME" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Mobile No</label>
                                    <input required type="tel" value={formData.phone} onChange={e => { setFormData({ ...formData, phone: e.target.value }); setPhoneError(""); }} className={`w-full px-5 py-3.5 bg-white border rounded-2xl focus:ring-2 focus:ring-[#151794]/20 outline-none text-sm font-bold uppercase transition-all ${phoneError ? "border-red-400" : "border-slate-200"}`} placeholder="+91 0000 0000" />
                                    {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Enquiry Note</label>
                                    <textarea required rows={3} value={formData.enquiry} onChange={e => setFormData({ ...formData, enquiry: e.target.value })} className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#151794]/20 outline-none text-sm font-medium resize-none transition-all" placeholder="Tell us about your trip..." />
                                </div>

                                <button type="submit" className="w-full bg-[#151794] text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl active:translate-y-1 shadow-[0_10px_30px_rgba(21,23,148,0.2)] flex items-center justify-center gap-3 group mt-4">
                                    Confirm Enquiry
                                    <Plane size={18} className="transform group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t border-dashed border-slate-300 flex justify-center">
                    <div className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase opacity-50">
                        * Confirm your booking at the counter
                    </div>
                </div>
            </div>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 bg-white shadow-xl rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all z-50 group"
            >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
            </button>
        </div>
    );
}
