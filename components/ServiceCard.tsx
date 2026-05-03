"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck, Plane, X, CheckCircle2, Phone, MessageSquare } from "lucide-react";
import Image from "next/image";
import { isValidPhone, PHONE_ERROR_MESSAGE } from "@/lib/utils";

export interface Visa {
    _id: string;
    country: string;
    visaType: string;
    image: string;
    processingDays: number;
    validity: number;
    cost: number;
    category: string;
    requirements: string[];
    contactNumber: string;
    contactPerson: string;
}

export interface Destination {
    _id: string;
    name: string;
    image: string;
    price: string;
    description: string;
    popularDestination: boolean;
    duration: string;
    contactNumber?: string;
    contactPerson?: string;
}

export interface Room {
    _id: string;
    name: string;
    image: string;
    price: string;
    amenities: string;
    contactNumber: string;
    contactPerson: string;
}

export interface Cab {
    _id: string;
    name: string;
    image: string;
    price: string;
    features: string;
    contactNumber: string;
    contactPerson: string;
}

export function ServiceCard({ item, index, onClick, type, variant = "standard" }: { item: any, index: number, onClick: () => void, type: string, variant?: "standard" | "extended" }) {
    if (variant === "extended") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={onClick}
                className="flex flex-col md:flex-row bg-white rounded-[40px] shadow-[0_10px_25px_rgba(0,0,0,0.08),_0_4px_10px_rgba(0,0,0,0.05)] border-[10px] border-white cursor-pointer group w-full max-w-[1000px] overflow-hidden"
            >
                {/* Image Section - Left on Desktop */}
                <div className="relative w-full md:w-2/5 aspect-[16/9] md:aspect-auto rounded-[32px] overflow-hidden">
                    <Image
                        src={item.image}
                        alt={`${item.name || item.country} - Khaleefa Holidays`}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-500" />
                    
                    {item.popularDestination && (
                        <div className="absolute top-4 left-4 bg-[#FF85A1] text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md uppercase tracking-wider">
                            POPULAR
                        </div>
                    )}
                </div>

                {/* Content Section - Right on Desktop */}
                <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-between">
                    <div>
                        <div className="flex flex-col mb-4">
                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter">
                                {item.name || item.country}
                            </h3>
                            <div className="mt-2 bg-[#18189C]/5 px-4 py-1.5 rounded-full w-fit">
                                <p className="text-[10px] font-black text-[#18189C] uppercase tracking-[0.2em]">{item.duration || "5 Days"}</p>
                            </div>
                        </div>
                        <p className="text-[#18189C]/60 text-sm font-black uppercase tracking-tight italic line-clamp-2 mb-6">
                            {item.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-6 border-t border-slate-100">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting From</p>
                            <p className="text-2xl font-black text-[#18189C] leading-none">
                                {item.price || item.cost}
                            </p>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onClick(); }}
                            className="bg-[#18189C] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-2"
                        >
                            Explore Now
                            <Plane size={16} className="transform rotate-45" />
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={onClick}
            className="flex flex-col bg-[#F5F5F5] rounded-[40px] shadow-[0_10px_25px_rgba(0,0,0,0.08),_0_4px_10px_rgba(0,0,0,0.05)] border-[10px] border-white cursor-pointer group w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.75rem)] flex-shrink-0 overflow-hidden"
        >
            <div className="relative aspect-[16/9] rounded-[32px] overflow-hidden">
                <Image
                    src={item.image}
                    alt={`${item.name || item.country} - Khaleefa Holidays`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/55 group-hover:opacity-0 transition-opacity duration-500 shadow-[inset_0_8px_18px_rgba(255,255,255,0.75)]" />

                {type === "destination" && item.popularDestination && (
                    <div className="absolute top-4 right-4 bg-[#FF85A1] text-white px-3 py-1 rounded-full text-[9px] font-bold shadow-md uppercase tracking-wider">
                        POPULAR
                    </div>
                )}
            </div>

            <div className="px-6 pt-6 pb-8 flex flex-col justify-between flex-grow relative min-h-[160px]">
                <div>
                    <div className="flex justify-between items-start gap-4 mb-4">
                        <div className="flex flex-col flex-1">
                            <h3 className="text-base md:text-lg font-black text-slate-900 leading-tight uppercase tracking-tight">
                                {item.name || item.country}
                            </h3>
                            {type === "visa" && (
                                <div className="mt-2 flex items-center gap-1.5">
                                    <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Visa :</p>
                                    <div className="bg-red-600 px-2.5 py-0.5 rounded-full">
                                        <p className="text-[10px] font-black text-white uppercase tracking-widest">{item.visaType}</p>
                                    </div>
                                </div>
                            )}
                            {type === "destination" && (
                                <div className="mt-2 flex items-center gap-1.5">
                                    <div className="bg-[#18189C]/5 px-2.5 py-0.5 rounded-full">
                                        <p className="text-[9px] font-black text-[#18189C] uppercase tracking-widest">
                                            {item.duration || "5 Days"}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {(type === "rooms" || type === "cab") && (
                                <p className="mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest line-clamp-1">
                                    {item.amenities || item.features}
                                </p>
                            )}
                        </div>
                        {type !== "destination" && (
                            <div className="bg-[#18189C]/5 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                                <p className={`${type === "visa" ? "text-xs" : "text-[9px]"} font-black text-[#18189C] uppercase tracking-widest`}>
                                    {item.category || (type === "visa" ? "Visa" : (type === "rooms" ? "Stay" : (type === "cab" ? "Cab" : "Service")))}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-slate-100">
                    <p className="text-lg font-black text-[#18189C] leading-none">
                        {type === "visa" ? `₹ ${item.cost}` : (item.price || item.cost)}
                    </p>
                    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-[#18189C] border-b-2 border-[#18189C]/20 hover:border-[#18189C] transition-all pb-1 leading-none">
                        More Info
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export function ModalContent({ item, type, onClose }: { item: any, type: string, onClose: () => void }) {
    const [formData, setFormData] = useState({ name: "", phone: "", enquiry: "" });
    const [submitted, setSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState("");

    const contactNumber = item.contactNumber || item.supportNumber || "9846223028";
    const contactPerson = item.contactPerson || item.supportAgent || "Muhammed";
    const whatsappText = `Hi, I'm interested in ${item.name || item.country}.`;

    const handleEnquirySubmit = async (e: React.FormEvent) => {
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
                    type: type === "destinations" ? "Destination" : (type === "visa" ? "Visa" : type.charAt(0).toUpperCase() + type.slice(1)),
                    name: formData.name,
                    phone: formData.phone,
                    message: formData.enquiry,
                    destinationName: item.name || item.country,
                }),
            });
        } catch (error) {
            console.error("Failed to save submission", error);
        }
        setSubmitted(true);
    };

    const isDestination = type === "destinations" || type === "destination";
    const isVisa = type === "visa";
    const isRoom = type === "rooms";
    const isCab = type === "cab";
    const title = item.name || item.country;
    const priceText = isVisa ? `₹ ${item.cost}` : (item.price || item.cost);

    return (
        <div className="flex flex-col md:flex-row w-full relative overflow-y-auto md:overflow-hidden bg-[#F5F5F5] md:rounded-3xl scrollbar-hide text-[#18189C]">
            <button
                onClick={onClose}
                className="sticky top-4 right-4 ml-auto mr-4 -mt-10 md:absolute md:top-8 md:right-8 w-10 h-10 bg-white shadow-xl rounded-full border border-[#18189C]/10 flex items-center justify-center text-[#18189C] hover:text-red-500 transition-all z-[110] group"
            >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
            </button>
            {/* Visual Cutouts for Ticket Effect */}
            <div className="hidden md:block absolute left-[66%] -top-[20px] w-10 h-10 bg-white rounded-full z-20 pointer-events-none" />
            <div className="hidden md:block absolute left-[66%] -bottom-[20px] w-10 h-10 bg-white rounded-full z-20 pointer-events-none" />

            {/* Left Section: Main Ticket Body */}
            <div className="w-full md:w-2/3 p-4 md:p-10 flex flex-col border-b-2 md:border-b-0 md:border-r-2 border-dashed border-[#18189C]/10 md:overflow-y-auto scrollbar-hide h-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 border-b-2 border-[#18189C]/5 pb-6 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#18189C] text-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12">
                            {isVisa ? <FileCheck size={24} className="transform rotate-12" /> : <Plane size={24} className="transform rotate-45" />}
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-[#18189C] uppercase tracking-tighter">{title}</h3>
                            <p className="text-[10px] font-black text-[#18189C]/40 tracking-[0.2em] uppercase">
                                {isVisa ? "Priority Visa Service" : (isRoom ? "Premium Stay" : (isCab ? "Premium Transport" : "Premium Destination"))}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative rounded-[32px] overflow-hidden aspect-[16/9] mb-8 group shrink-0 border border-[#18189C]/5">
                    <Image 
                        src={item.image} 
                        alt={`${title} - Service Gallery`} 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        sizes="(max-width: 768px) 100vw, 66vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18189C]/20 via-transparent to-transparent" />
                </div>
 
                {/* Overview for Destinations, Rooms, Cabs */}
                {(isDestination || isRoom || isCab) && (
                    <div className="mb-8 bg-white/40 p-6 rounded-2xl border border-[#18189C]/5">
                        <p className="text-[#18189C]/30 text-[10px] font-black uppercase tracking-widest mb-3">Overview</p>
                        <p className="text-[#18189C]/60 leading-relaxed text-sm font-black uppercase tracking-tight italic whitespace-pre-wrap">
                            {item.description || item.amenities || item.features}
                        </p>
                    </div>
                )}
 
                {/* Contact Section - MOVED FROM RIGHT, Hidden on Mobile */}
                {!isDestination && (
                    <div className="hidden md:block mb-8 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 bg-[#18189C]/5 rounded-2xl border border-[#18189C]/5 p-4 flex justify-between items-center">
                                <div>
                                    <p className="text-[#18189C]/30 text-[9px] font-black uppercase tracking-widest">Support Agent</p>
                                    <p className="font-black text-[#18189C] text-base uppercase">{contactPerson}</p>
                                </div>
                                <div className="w-[1px] h-8 bg-[#18189C]/10 mx-4 hidden sm:block" />
                                <div className="text-right">
                                    <p className="text-[#18189C]/30 text-[9px] font-black uppercase tracking-widest">Mobile No</p>
                                    <p className="font-black text-[#18189C] text-base">{contactNumber}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                onClick={() => window.open(`https://wa.me/91${contactNumber}?text=${encodeURIComponent(whatsappText)}`, '_blank')}
                                className="w-full bg-[#25D366] text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-95 flex items-center justify-center gap-3"
                            >
                                <MessageSquare size={16} />
                                WhatsApp Us
                            </button>
                            <button
                                onClick={() => window.location.href = `tel:${contactNumber}`}
                                className="w-full bg-[#18189C] text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-95 flex sm:hidden items-center justify-center gap-3"
                            >
                                <Phone size={16} />
                                Call Direct
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Section: Ticket Stub / Enquiry or Contact Details */}
            <div className="w-full md:w-1/3 bg-[#18189C]/5 p-6 md:p-10 flex flex-col md:overflow-y-auto scrollbar-hide h-auto text-[#18189C]">
                <div className="mb-6">
                    <p className="text-[10px] font-black text-[#18189C]/30 tracking-[0.2em] uppercase mb-1">
                        {isVisa ? "Service Type" : "Service Info"}
                    </p>
                    <h4 className="font-black text-xl text-[#18189C] uppercase tracking-tighter break-words">
                        {isVisa ? item.visaType : (isRoom ? "Room/Stay" : (isCab ? "Cab/Taxi" : "Destination"))}
                    </h4>
                </div>

                {/* Ticket Details List */}
                <div className="mb-8">
                    <p className="text-[#18189C] text-[11px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                        {isVisa ? "Visa Details" : (isRoom ? "Stay Details" : (isCab ? "Cab Details" : "Journey Details"))}
                    </p>
                    <div className="space-y-4 px-1">
                        <div className="flex justify-between items-center border-b border-[#18189C]/10 pb-2">
                            <span className="text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest">Price</span>
                            <span className="font-black text-[#18189C] text-base">{priceText}</span>
                        </div>
                        {isVisa ? (
                            <>
                                <div className="flex justify-between items-center border-b border-[#18189C]/10 pb-2">
                                    <span className="text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest">Processing</span>
                                    <span className="font-black text-[#18189C]/60 text-sm uppercase">{item.processingDays} Days</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#18189C]/10 pb-2">
                                    <span className="text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest">Validity</span>
                                    <span className="font-black text-[#18189C]/60 text-sm uppercase">{item.validity} Days</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between items-center border-b border-[#18189C]/10 pb-2">
                                    <span className="text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest">
                                        {isCab ? "Service" : "Duration"}
                                    </span>
                                    <span className="font-black text-[#18189C]/60 text-sm uppercase">
                                        {isCab ? "Direct" : (item.duration || "Flexible")}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#18189C]/10 pb-2">
                                    <span className="text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest">Availability</span>
                                    <span className="font-black text-[#18189C]/60 text-sm uppercase">Instant</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Details Section - MOVED FROM LEFT */}
                {!isDestination && (
                    <div className="mb-8">
                        <p className="text-[#18189C]/30 text-[10px] font-black uppercase tracking-widest mb-4">
                            {isVisa ? "Visa Requirements" : "Overview"}
                        </p>
                        <div className="bg-white/40 p-5 rounded-2xl border border-[#18189C]/5 relative overflow-hidden">
                            {isVisa ? (
                                <ul className="space-y-2 relative z-10">
                                    {(item.requirements?.length > 0 ? item.requirements : ["Passport", "Photo"])
                                        .filter((req: string) => req.trim() !== "")
                                        .map((req: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2.5 text-[#18189C]/60 font-black text-[10px] uppercase tracking-tight">
                                                <div className="mt-1.5 w-1 h-1 rounded-full bg-[#18189C] flex-shrink-0 opacity-40" />
                                                <span className="leading-snug">{req}</span>
                                            </li>
                                        ))}
                                </ul>
                            ) : (
                                <p className="text-[#18189C]/60 leading-relaxed text-xs font-black uppercase tracking-tight italic whitespace-pre-wrap relative z-10">
                                    {item.description || (type === "rooms" ? item.amenities : item.features)}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex-grow">
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 size={28} className="text-green-600" />
                            </div>
                            <p className="text-[#2D3E33]/60 text-sm font-black uppercase">We've received your enquiry and will get back to you shortly.</p>
                        </div>
                    ) : (
                        <>
                            {isDestination && (
                                <>
                                    <p className="text-[#2D3E33] text-[11px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <MessageSquare size={14} /> Quick Enquiry
                                    </p>
                                    <form onSubmit={handleEnquirySubmit} className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-[#2D3E33]/30 uppercase tracking-widest px-1">Passenger Name</label>
                                            <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-5 py-3.5 bg-white/40 border border-[#2D3E33]/10 rounded-2xl focus:ring-2 focus:ring-[#2D3E33]/10 outline-none text-sm font-black uppercase transition-all text-[#2D3E33] tracking-tight" placeholder="YOUR NAME" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-[#2D3E33]/30 uppercase tracking-widest px-1">Mobile No</label>
                                            <input required type="tel" value={formData.phone} onChange={e => { setFormData({ ...formData, phone: e.target.value }); setPhoneError(""); }} className={`w-full px-5 py-3.5 bg-white/40 border rounded-2xl focus:ring-2 focus:ring-[#2D3E33]/10 outline-none text-sm font-black uppercase transition-all text-[#2D3E33] tracking-tight ${phoneError ? "border-red-400" : "border-[#2D3E33]/10"}`} placeholder="+91 0000 0000" />
                                            {phoneError && <p className="text-red-500 text-[10px] mt-1 font-black">{phoneError}</p>}
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-[#2D3E33]/30 uppercase tracking-widest px-1">Enquiry Note</label>
                                            <textarea required rows={3} value={formData.enquiry} onChange={e => setFormData({ ...formData, enquiry: e.target.value })} className="w-full px-5 py-3.5 bg-white/40 border border-[#2D3E33]/10 rounded-2xl focus:ring-2 focus:ring-[#2D3E33]/10 outline-none text-sm font-black uppercase resize-none transition-all text-[#2D3E33] tracking-tight" placeholder="Tell us about your trip..." />
                                        </div>

                                        <div className="relative group w-full mt-4">
                                            <div className="absolute -inset-1 bg-black rounded-2xl transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button type="submit" className="relative w-full bg-gradient-to-r from-[#18189C] to-black text-white px-8 py-4 rounded-2xl border-2 border-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 group">
                                                Confirm Enquiry
                                                <Plane size={18} className="transform group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* Mobile Contact Section - Visible only on Mobile */}
                {!isDestination && (
                    <div className="block md:hidden mt-10 space-y-6 pt-10 border-t-2 border-[#2D3E33]/10">
                        <div className="flex flex-col gap-4">
                            <div className="bg-white/40 rounded-3xl border border-[#2D3E33]/5 shadow-sm p-5 flex justify-between items-center">
                                <div>
                                    <p className="text-[#2D3E33]/30 text-[10px] font-black uppercase tracking-widest">Support Agent</p>
                                    <p className="font-black text-[#2D3E33] text-lg uppercase">{contactPerson}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[#2D3E33]/30 text-[10px] font-black uppercase tracking-widest">Mobile No</p>
                                    <p className="font-black text-[#2D3E33] text-lg leading-tight">{contactNumber}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="relative group w-full">
                                <div className="absolute -inset-1 bg-black rounded-[2rem] transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                <button
                                    onClick={() => window.open(`https://wa.me/91${contactNumber}?text=${encodeURIComponent(whatsappText)}`, '_blank')}
                                    className="relative w-full bg-[#25D366] text-white py-5 rounded-[2rem] border-2 border-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-4"
                                >
                                    <MessageSquare size={18} />
                                    WhatsApp Us
                                </button>
                            </div>
                            <div className="relative group w-full">
                                <div className="absolute -inset-1 bg-black rounded-[2rem] transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                <button
                                    onClick={() => window.location.href = `tel:${contactNumber}`}
                                    className="relative w-full bg-gradient-to-r from-[#18189C] to-black text-white py-5 rounded-[2rem] border-2 border-black text-xs font-black uppercase tracking-widest flex items-center justify-center gap-4"
                                >
                                    <Phone size={18} />
                                    Call Direct
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export function ServiceModal({ isOpen, item, type, onClose }: { isOpen: boolean; item: any; type: string; onClose: () => void }) {
    return (
        <AnimatePresence>
            {isOpen && item && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 sm:p-8 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="w-full max-w-5xl bg-white/60 backdrop-blur-3xl rounded-[40px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.08),_0_4px_10px_rgba(0,0,0,0.05)] pointer-events-auto max-h-[90vh] flex flex-col md:flex-row relative z-[100] border border-[#2D3E33]/5"
                        >
                            <ModalContent item={item} type={type} onClose={onClose} />
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
