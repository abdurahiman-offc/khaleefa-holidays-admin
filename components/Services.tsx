
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck, BedDouble, Car, MapPin, Loader2, Plane, X, CheckCircle2, Phone, MessageSquare } from "lucide-react";
import ScatteredShapes from "./ScatteredShapes";
import { isValidPhone, PHONE_ERROR_MESSAGE } from "@/lib/utils";

const tabs = [
    { id: "visa", label: "Visa", icon: FileCheck },
    { id: "destinations", label: "Destinations", icon: MapPin },
    { id: "rooms", label: "Rooms", icon: BedDouble },
    { id: "cab", label: "Cab", icon: Car },
];

const defaultVisaCategories = ["All Categories", "GCC", "Schengen", "Asia"];

interface Visa {
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

interface Destination {
    _id: string;
    name: string;
    image: string;
    price: string;
    description: string;
    popularDestination: boolean;
    duration: string;
}

interface Room {
    _id: string;
    name: string;
    image: string;
    price: string;
    amenities: string;
    contactNumber: string;
    contactPerson: string;
}

interface Cab {
    _id: string;
    name: string;
    image: string;
    price: string;
    features: string;
    contactNumber: string;
    contactPerson: string;
}

export default function Services() {
    const [activeTab, setActiveTab] = useState("visa");
    const [activeVisaCategory, setActiveVisaCategory] = useState("All Categories");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Body scroll lock on modal open
    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedId]);

    // Dynamic Data State
    const [visaData, setVisaData] = useState<Visa[]>([]);
    const [destinationData, setDestinationData] = useState<Destination[]>([]);
    const [roomData, setRoomData] = useState<Room[]>([]);
    const [cabData, setCabData] = useState<Cab[]>([]);

    const [visaCategories, setVisaCategories] = useState<string[]>(defaultVisaCategories);
    const [visibleCards, setVisibleCards] = useState(6); // Default 3 rows * 2 cards = 6

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [visasRes, destsRes, roomsRes, cabsRes] = await Promise.all([
                    fetch("/api/visas"),
                    fetch("/api/destinations"),
                    fetch("/api/rooms"),
                    fetch("/api/cabs"),
                ]);

                const visas = await visasRes.json();
                const dests = await destsRes.json();
                const rooms = await roomsRes.json();
                const cabs = await cabsRes.json();

                if (visas.success) {
                    setVisaData(visas.data);
                }
                if (dests.success) setDestinationData(dests.data);
                if (rooms.success) setRoomData(rooms.data);
                if (cabs.success) setCabData(cabs.data);

            } catch (error) {
                console.error("Failed to fetch services data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const filteredVisaData = activeVisaCategory === "All Categories"
        ? visaData
        : visaData.filter(item => item.category === activeVisaCategory);

    const getActiveItem = () => {
        if (activeTab === "visa") return visaData.find(v => v._id === selectedId);
        if (activeTab === "destinations") return destinationData.find(d => d._id === selectedId);
        if (activeTab === "rooms") return roomData.find(r => r._id === selectedId);
        if (activeTab === "cab") return cabData.find(c => c._id === selectedId);
        return null;
    };

    const activeItem = getActiveItem();

    return (
        <section id="services" className={`pt-7 pb-7 md:pb-[100px] lg:pt-[100px] bg-[#151794] relative transition-colors duration-300 ${selectedId ? 'z-[100]' : 'z-10'}`}>
            {/* Scattered Small White Shapes */}
            <ScatteredShapes />

            {/* S-Curve Background Line connecting Hero and Services */}
            <div className="hidden lg:block absolute right-[5%] bottom-[100%] h-[40vh] w-[45%] border-r-[5px] border-b-[5px] border-white/20 rounded-br-[150px] xl:rounded-br-[250px] pointer-events-none z-0">
                <Plane size={24} className="absolute top-[-24px] right-[-14.5px] text-white/50 -rotate-90" />
            </div>
            <div className="hidden lg:block absolute left-[5%] top-[-5px] h-[300px] w-[45%] border-t-[5px] border-l-[5px] border-white/20 rounded-tl-[150px] xl:rounded-tl-[250px] pointer-events-none z-0">
                <Plane size={24} className="absolute bottom-[-24px] left-[-14.5px] text-white/50 rotate-90" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 font-[family-name:var(--font-yomogi)]">Check Our Services</h2>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setSelectedId(null); }}
                            className={`flex items-center gap-2 px-5 py-2.5 md:px-8 md:py-4 rounded-full text-xs md:text-base font-bold transition-all duration-200 transform whitespace-nowrap backdrop-blur-lg border ${activeTab === tab.id
                                ? "bg-white text-[#151794] border-white translate-y-[6px] shadow-[0_0px_0_rgba(255,255,255,0.4),0_0px_0px_rgba(0,0,0,0)]"
                                : "bg-white/10 text-white border-white/20 hover:-translate-y-[2px] hover:bg-white/20 shadow-[0_6px_0_rgba(255,255,255,0.4),0_15px_20px_rgba(0,0,0,0.2)] active:translate-y-[6px] active:shadow-[0_0px_0_rgba(255,255,255,0.4),0_0px_0px_rgba(0,0,0,0)]"
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-bookease-navy " />
                    </div>
                ) : (
                    <div className="">
                        {/* Visa Content */}
                        {activeTab === "visa" && (
                            <div className="w-full">
                                {/* Visa Categories - Dropdown on Mobile, Buttons on Desktop */}
                                <div className="mb-8 flex justify-center">
                                    <div className="md:hidden w-full max-w-[280px]">
                                        <select
                                            value={activeVisaCategory}
                                            onChange={(e) => {
                                                setActiveVisaCategory(e.target.value);
                                                setVisibleCards(6);
                                            }}
                                            className="w-full bg-white/10 text-white border-2 border-white/20 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide outline-none focus:border-white transition-all appearance-none text-center"
                                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.5rem center', backgroundSize: '1.25rem' }}
                                        >
                                            {visaCategories.map((category) => (
                                                <option key={category} value={category} className="bg-[#151794] text-white">
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="hidden md:flex flex-wrap justify-center gap-2">
                                        {visaCategories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => {
                                                    setActiveVisaCategory(category);
                                                    setVisibleCards(6);
                                                }}
                                                className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all shadow-sm ${activeVisaCategory === category
                                                    ? "bg-white text-[#151794] shadow-lg border-2 border-[#151794]"
                                                    : "text-blue-100 hover:text-white hover:bg-white/10 border-2 border-white"
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-3 md:gap-8">
                                    <AnimatePresence mode="popLayout">
                                        {filteredVisaData.slice(0, visibleCards).map((item, index) => (
                                            <ServiceCard
                                                key={item._id}
                                                item={item}
                                                index={index}
                                                onClick={() => setSelectedId(item._id)}
                                                type="visa"
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                {filteredVisaData.length > visibleCards && (
                                    <div className="flex justify-center mt-8 md:mt-12">
                                        <button
                                            onClick={() => setVisibleCards(prev => prev + 6)}
                                            className="bg-white text-[#151794] px-8 py-3 md:px-10 md:py-4 rounded-full text-xs md:text-base font-bold uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-2xl active:translate-y-1 shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
                                        >
                                            Show More Results
                                        </button>
                                    </div>
                                )}
                                {filteredVisaData.length === 0 && <EmptyState message="No visas found." />}
                            </div>
                        )}

                        {/* Destinations Content */}
                        {activeTab === "destinations" && (
                            <div className="w-full">
                                <div className="flex flex-wrap justify-center gap-3 md:gap-8">
                                    <AnimatePresence mode="popLayout">
                                        {destinationData.slice(0, visibleCards).map((item, index) => (
                                            <ServiceCard
                                                key={item._id}
                                                item={item}
                                                index={index}
                                                onClick={() => setSelectedId(item._id)}
                                                type="destination"
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                {destinationData.length > visibleCards && (
                                    <div className="flex justify-center mt-8 md:mt-12">
                                        <button
                                            onClick={() => setVisibleCards(prev => prev + 6)}
                                            className="bg-white text-[#151794] px-8 py-3 md:px-10 md:py-4 rounded-full text-xs md:text-base font-bold uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-2xl active:translate-y-1 shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
                                        >
                                            Show More Results
                                        </button>
                                    </div>
                                )}
                                {destinationData.length === 0 && <EmptyState message="No destinations found." />}
                            </div>
                        )}

                        {/* Rooms Content */}
                        {activeTab === "rooms" && (
                            <div className="w-full flex items-center justify-center py-20">
                                <p className="text-white text-[56px] font-bold uppercase tracking-widest">
                                    coming soon...
                                </p>
                            </div>
                        )}

                        {/* Cabs Content */}
                        {activeTab === "cab" && (
                            <div className="w-full flex items-center justify-center py-20">
                                <p className="text-white text-[56px] font-bold uppercase tracking-widest">
                                    coming soon...
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Expanded Card Modal */}
                <AnimatePresence>
                    {selectedId && activeItem && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                                onClick={() => setSelectedId(null)}
                            />
                            <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 sm:p-8 pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl pointer-events-auto max-h-[90vh] flex flex-col md:flex-row relative z-[100]"
                                >
                                    <ModalContent item={activeItem} type={activeTab} onClose={() => setSelectedId(null)} />
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="col-span-full text-center py-20 bg-white/5 backdrop-blur-md rounded-2xl border border-dashed border-white/20">
            <p className="text-white/70 font-medium">{message}</p>
        </div>
    );
}

function ServiceCard({ item, index, onClick, type }: { item: any, index: number, onClick: () => void, type: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -5, scale: 1.05, zIndex: 10 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border-[3px] border-slate-100 group hover:shadow-xl transition-shadow duration-300 w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.75rem)] flex-shrink-0"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={item.image}
                    alt={`${item.name || item.country} ${type} service - Khaleefa Holidays`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

                {type === "visa" && item.category && (
                    <div className="absolute top-3 right-3 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-bookease-navy backdrop-blur-md shadow-sm z-10">
                        {item.category}
                    </div>
                )}

                {type === "destination" && item.popularDestination && (
                    <div className="absolute top-3 right-3 bg-red-500/90 text-white px-2 py-0.5 rounded text-[10px] font-bold backdrop-blur-md shadow-sm z-10">
                        POPULAR
                    </div>
                )}
            </div>

            <div className="p-3 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 bg-white">
                <div className="flex-1 min-w-0 w-full">
                    <h3 className="text-bookease-navy font-bold text-base md:text-xl line-clamp-1 mb-0.5 md:mb-1">
                        {item.name || item.country}
                    </h3>
                    <p className="text-slate-500 text-xs md:text-sm font-semibold">
                        {type === "visa"
                            ? `₹ ${item.cost}`
                            : `${item.price || item.cost}`}
                    </p>
                </div>

                <button
                    onClick={onClick}
                    className="w-full sm:w-auto bg-[#151794] text-white px-4 md:px-8 py-2 md:py-3 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap border-2 border-[#151794] transition-all duration-200 transform hover:-translate-y-[2px] active:translate-y-[4px] shadow-[0_4px_0_#0a0b5c,0_10px_15px_rgba(0,0,0,0.3)] active:shadow-[0_0px_0_#0a0b5c,0_0px_0px_rgba(0,0,0,0)]"
                >
                    Details
                </button>
            </div>
        </motion.div>
    );
}

function ModalContent({ item, type, onClose }: { item: any, type: string, onClose: () => void }) {
    const [formData, setFormData] = useState({ name: "", phone: "", enquiry: "" });
    const [submitted, setSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState("");

    const contactNumber = item.contactNumber || "9846223028";
    const contactPerson = item.contactPerson || "Muhammed";
    const whatsappText = `Hi, I'm interested in ${item.name || item.country}.`;

    const handleEnquirySubmit = async (e: React.FormEvent) => {
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

    const isDestination = type === "destinations";
    const isVisa = type === "visa";
    const title = item.name || item.country;
    const priceText = isVisa ? `₹ ${item.cost}` : (item.price || item.cost);
    const idPrefix = type.toUpperCase().substring(0, 4);
    const boardingPassId = `${idPrefix}-${(title || "TRIP").substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

    return (
        <div className="flex flex-col md:flex-row w-full relative overflow-y-auto md:overflow-hidden bg-white md:rounded-3xl scrollbar-hide">
            {/* Sticky Close Button (Inside) */}
            <button
                onClick={onClose}
                className="sticky top-4 right-4 ml-auto mr-4 -mt-10 md:absolute md:top-8 md:right-8 w-10 h-10 bg-white shadow-xl rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all z-[110] group"
            >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
            </button>
            {/* Visual Cutouts for Ticket Effect */}
            <div className="hidden md:block absolute left-[66%] -top-[20px] w-10 h-10 bg-black/60 rounded-full z-20 pointer-events-none" />
            <div className="hidden md:block absolute left-[66%] -bottom-[20px] w-10 h-10 bg-black/60 rounded-full z-20 pointer-events-none" />

            {/* Left Section: Main Ticket Body */}
            <div className="w-full md:w-2/3 p-4 md:p-10 flex flex-col border-b-2 md:border-b-0 md:border-r-2 border-dashed border-slate-200 md:overflow-y-auto scrollbar-hide h-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 border-b-2 border-slate-100 pb-6 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#151794] rounded-2xl flex items-center justify-center text-white shadow-lg transform -rotate-12">
                            {isVisa ? <FileCheck size={24} className="transform rotate-12" /> : <Plane size={24} className="transform rotate-45" />}
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-[#151794] uppercase tracking-tighter">Khaleefa Holidays</h3>
                            <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                                {isVisa ? "Priority Visa Service" : "Premium Destination"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden aspect-[16/9] mb-8 group shrink-0">
                    <img src={item.image} alt={`${title} - Khaleefa Holidays Service Gallery`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151794]/80 via-transparent to-transparent" />

                    <div className="absolute bottom-6 left-6 pr-6">
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none drop-shadow-lg">
                            {title}
                        </h2>
                        {/* Category - Under Country Name */}
                        {(isVisa && item.category) && (
                            <p className="mt-1 text-white/90 text-sm font-bold uppercase tracking-[0.2em] drop-shadow-md flex items-center gap-2">
                                <span className="w-4 h-[2px] bg-white/60" />
                                {item.category}
                            </p>
                        )}
                        {(isDestination && item.popularDestination) && (
                            <p className="mt-1 text-white/90 text-sm font-bold uppercase tracking-[0.2em] drop-shadow-md flex items-center gap-2">
                                <span className="w-4 h-[2px] bg-white/60" />
                                Premium Journey
                            </p>
                        )}
                    </div>
                </div>

                {/* Contact Section - MOVED FROM RIGHT, Hidden on Mobile */}
                {!isDestination && (
                    <div className="hidden md:block mb-8 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex justify-between items-center">
                                <div>
                                    <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Support Agent</p>
                                    <p className="font-extrabold text-[#151794] text-base uppercase">{contactPerson}</p>
                                </div>
                                <div className="w-[1px] h-8 bg-slate-100 mx-4 hidden sm:block" />
                                <div className="text-right">
                                    <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Mobile No</p>
                                    <p className="font-extrabold text-[#151794] text-base">{contactNumber}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                onClick={() => window.open(`https://wa.me/91${contactNumber}?text=${encodeURIComponent(whatsappText)}`, '_blank')}
                                className="w-full bg-[#25D366] text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl active:translate-y-1 shadow-[0_10px_30px_rgba(37,211,102,0.2)] flex items-center justify-center gap-3"
                            >
                                <MessageSquare size={16} />
                                WhatsApp Us
                            </button>
                            <button
                                onClick={() => window.location.href = `tel:${contactNumber}`}
                                className="w-full bg-[#151794] text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl active:translate-y-1 shadow-[0_10px_30px_rgba(21,23,148,0.2)] flex sm:hidden items-center justify-center gap-3"
                            >
                                <Phone size={16} />
                                Call Direct
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Section: Ticket Stub / Enquiry or Contact Details */}
            <div className="w-full md:w-1/3 bg-slate-50 p-6 md:p-10 flex flex-col md:overflow-y-auto scrollbar-hide h-auto">
                <div className="mb-6">
                    <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mb-1">
                        {isVisa ? "Service Type" : "Service Info"}
                    </p>
                    <h4 className="font-black text-xl text-[#151794] uppercase tracking-tighter break-words">
                        {isVisa ? item.visaType : "Destination"}
                    </h4>
                </div>

                {/* Ticket Details List - REPLACING CARD STRUCTURE */}
                <div className="mb-8">
                    <p className="text-[#151794] text-[11px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                        {isVisa ? "Visa Details" : "Journey Details"}
                    </p>
                    <div className="space-y-4 px-1">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</span>
                            <span className="font-extrabold text-[#151794] text-base">{priceText}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                {isVisa ? "Processing" : "Duration"}
                            </span>
                            <span className="font-extrabold text-slate-600 text-sm uppercase">
                                {isVisa ? `${item.processingDays} Days` : (item.duration || "5 Days")}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                {isVisa ? "Validity" : "Availability"}
                            </span>
                            <span className="font-extrabold text-slate-600 text-sm uppercase">
                                {isVisa ? (item.validity || "90 Days") : "Instant"}
                            </span>
                        </div>
                        {isVisa && (
                            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visa Type</span>
                                <span className="font-extrabold text-slate-600 text-sm uppercase">{item.visaType}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Details Section - MOVED FROM LEFT */}
                <div className="mb-8">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                        {isVisa ? "Visa Requirements" : "Overview"}
                    </p>
                    <div className="bg-white/50 p-5 rounded-2xl border border-slate-200/50 relative overflow-hidden">
                        {isVisa ? (
                            <ul className="space-y-2 relative z-10">
                                {(item.requirements?.length > 0 ? item.requirements : ["Passport", "Photo"])
                                    .filter((req: string) => req.trim() !== "")
                                    .map((req: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2.5 text-slate-600 font-medium text-xs">
                                            <div className="mt-1.5 w-1 h-1 rounded-full bg-[#151794] flex-shrink-0 opacity-60" />
                                            <span className="leading-snug">{req}</span>
                                        </li>
                                    ))}
                            </ul>
                        ) : (
                            <p className="text-slate-600 leading-relaxed text-xs italic whitespace-pre-wrap relative z-10">
                                {item.description || (type === "rooms" ? item.amenities : item.features)}
                            </p>
                        )}
                    </div>
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
                            {isDestination && (
                                <>
                                    <p className="text-[#151794] text-[11px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <MessageSquare size={14} /> Quick Enquiry
                                    </p>
                                    <form onSubmit={handleEnquirySubmit} className="space-y-4">
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
                        </>
                    )}
                </div>



                {/* Mobile Contact Section - Visible only on Mobile */}
                {!isDestination && (
                    <div className="block md:hidden mt-10 space-y-6 pt-10 border-t-2 border-slate-200">
                        <div className="flex flex-col gap-4">
                            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 flex justify-between items-center">
                                <div>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Support Agent</p>
                                    <p className="font-ex-bold text-[#151794] text-lg uppercase">{contactPerson}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Mobile No</p>
                                    <p className="font-ex-bold text-[#151794] text-lg leading-tight">{contactNumber}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <button
                                onClick={() => window.open(`https://wa.me/91${contactNumber}?text=${encodeURIComponent(whatsappText)}`, '_blank')}
                                className="w-full bg-[#25D366] text-white py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(37,211,102,0.3)] flex items-center justify-center gap-4 active:scale-95 transition-all"
                            >
                                <MessageSquare size={18} />
                                WhatsApp Us
                            </button>
                            <button
                                onClick={() => window.location.href = `tel:${contactNumber}`}
                                className="w-full bg-[#151794] text-white py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(21,23,148,0.3)] flex items-center justify-center gap-4 active:scale-95 transition-all"
                            >
                                <Phone size={18} />
                                Call Direct
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div >
    );
}
