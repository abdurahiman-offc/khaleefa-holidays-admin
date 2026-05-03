"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck, BedDouble, Car, MapPin, Loader2, Plane } from "lucide-react";
import { ServiceCard, ServiceModal, Visa, Destination, Room, Cab } from "./ServiceCard";

const tabs = [
    { id: "visa", label: "Visa", icon: FileCheck },
    { id: "destinations", label: "Destinations", icon: MapPin },
    { id: "rooms", label: "Rooms", icon: BedDouble },
    { id: "cab", label: "Cab", icon: Car },
];

const defaultVisaCategories = ["All Categories", "GCC", "Schengen", "Asia"];

export default function Services() {
    const [activeTab, setActiveTab] = useState("visa");
    const [activeVisaCategory, setActiveVisaCategory] = useState("All Categories");
    const [activeVisaType, setActiveVisaType] = useState("All Types");
    const [searchTerm, setSearchTerm] = useState("");
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

    const filteredVisaData = visaData.filter(item => {
        const matchesCategory = activeVisaCategory === "All Categories" || item.category === activeVisaCategory;
        const matchesType = activeVisaType === "All Types" || item.visaType === activeVisaType;
        const matchesSearch = item.country.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesType && matchesSearch;
    });

    const getActiveItem = () => {
        if (activeTab === "visa") return visaData.find(v => v._id === selectedId);
        if (activeTab === "destinations") return destinationData.find(d => d._id === selectedId);
        if (activeTab === "rooms") return roomData.find(r => r._id === selectedId);
        if (activeTab === "cab") return cabData.find(c => c._id === selectedId);
        return null;
    };

    const activeItem = getActiveItem();

    return (
        <section id="services" className={`pt-[78px] pb-7 md:pb-[100px] lg:pt-[150px] bg-[#F5F5F5] relative transition-colors duration-300 ${selectedId ? 'z-[100]' : 'z-10'}`}>
            {/* Scattered Small White Shapes */}

            {/* S-Curve Background Line connecting Hero and Services */}
            <div className="hidden lg:block absolute right-[5%] bottom-[100%] h-[40vh] w-[45%] border-r-[5px] border-b-[5px] border-[#6A9BFF]/30 rounded-br-[150px] xl:rounded-br-[250px] pointer-events-none z-0">
                <Plane size={24} className="absolute top-[-24px] right-[-14.5px] text-[#6A9BFF]/50 -rotate-90" />
            </div>
            <div className="hidden lg:block absolute left-[5%] top-[-5px] h-[300px] w-[45%] border-t-[5px] border-l-[5px] border-[#6A9BFF]/30 rounded-tl-[150px] xl:rounded-tl-[250px] pointer-events-none z-0">
                <Plane size={24} className="absolute bottom-[-24px] left-[-14.5px] text-[#6A9BFF]/50 rotate-90" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-[#18189C] to-black">Our Services</h2>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-6 mb-12 overflow-x-auto pb-4 scrollbar-hide">
                    {tabs.map((tab) => (
                        <div key={tab.id} className="relative group">
                            <div className={`absolute -inset-1 bg-black rounded-full transition-transform ${activeTab === tab.id ? "translate-x-0 translate-y-0" : "translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
                                }`} />
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                onClick={() => { setActiveTab(tab.id); setSelectedId(null); }}
                                className={`relative flex items-center gap-3 px-8 py-4 rounded-full border-2 border-black text-[13px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                    ? "bg-gradient-to-r from-[#18189C] to-black text-white"
                                    : "bg-white text-[#18189C] hover:bg-white/90"
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </motion.button>
                        </div>
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
                            <>
                                <div className="mb-10 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 bg-white/30 backdrop-blur-md p-6 rounded-[32px] border border-black/5 shadow-sm">
                                    {/* Search Box */}
                                    <div className="relative w-full max-w-sm lg:w-[300px]">
                                        <input
                                            type="text"
                                            placeholder="SEARCH COUNTRY..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setVisibleCards(6);
                                            }}
                                            className="w-full bg-white border-2 border-black/10 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#18189C]/20 focus:border-[#18189C] outline-none transition-all placeholder:text-slate-300 shadow-sm"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Visa Categories (Subbuttons) */}
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {visaCategories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => {
                                                    setActiveVisaCategory(category);
                                                    setVisibleCards(6);
                                                }}
                                                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${activeVisaCategory === category
                                                    ? "bg-[#18189C] border-[#18189C] text-white shadow-md scale-105"
                                                    : "bg-white border-black/5 text-[#18189C] hover:border-black/20 hover:bg-slate-50"
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Visa Type Filter */}
                                    <div className="relative w-full max-w-[200px] lg:w-[180px]">
                                        <select
                                            value={activeVisaType}
                                            onChange={(e) => {
                                                setActiveVisaType(e.target.value);
                                                setVisibleCards(6);
                                            }}
                                            className="w-full bg-white border-2 border-black/10 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer hover:border-black/20 hover:bg-slate-50 transition-all text-[#18189C] shadow-sm"
                                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2318189C'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.9rem' }}
                                        >
                                            <option value="All Types">All Types</option>
                                            <option value="Tourist">Tourist</option>
                                            <option value="Business">Business</option>
                                            <option value="Job seeker">Job seeker</option>
                                            <option value="Umrah">Umrah</option>
                                            <option value="Family">Family</option>
                                        </select>
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
                                <div className="flex justify-center items-center gap-6 mt-8 md:mt-12">
                                    {filteredVisaData.length > visibleCards && (
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => setVisibleCards(prev => prev + 6)}
                                                className="relative bg-white text-[#18189C] px-8 py-3 md:px-10 md:py-4 rounded-full border-2 border-black text-xs md:text-sm font-black uppercase tracking-widest hover:bg-slate-50"
                                            >
                                                Show More Results
                                            </button>
                                        </div>
                                    )}
                                    {visibleCards > 6 && (
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => setVisibleCards(6)}
                                                className="relative bg-white text-[#18189C] px-8 py-3 md:px-10 md:py-4 rounded-full border-2 border-black text-xs md:text-sm font-black uppercase tracking-widest hover:bg-slate-50"
                                            >
                                                Show Less
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {filteredVisaData.length === 0 && <EmptyState message="No visas found." />}
                            </>
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
                                <div className="flex justify-center items-center gap-6 mt-8 md:mt-12">
                                    {destinationData.length > visibleCards && (
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => setVisibleCards(prev => prev + 6)}
                                                className="relative bg-white text-[#18189C] px-8 py-3 md:px-10 md:py-4 rounded-full border-2 border-black text-xs md:text-sm font-black uppercase tracking-widest hover:bg-slate-50"
                                            >
                                                Show More Results
                                            </button>
                                        </div>
                                    )}
                                    {visibleCards > 6 && (
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => setVisibleCards(6)}
                                                className="relative bg-white text-[#18189C] px-8 py-3 md:px-10 md:py-4 rounded-full border-2 border-black text-xs md:text-sm font-black uppercase tracking-widest hover:bg-slate-50"
                                            >
                                                Show Less
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {destinationData.length === 0 && <EmptyState message="No destinations found." />}
                            </div>
                        )}

                        {/* Rooms Content */}
                        {activeTab === "rooms" && (
                            <div className="w-full">
                                <div className="flex flex-wrap justify-center gap-3 md:gap-8">
                                    <AnimatePresence mode="popLayout">
                                        {roomData.slice(0, visibleCards).map((item, index) => (
                                            <ServiceCard
                                                key={item._id}
                                                item={item}
                                                index={index}
                                                onClick={() => setSelectedId(item._id)}
                                                type="rooms"
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <div className="flex justify-center items-center gap-6 mt-8 md:mt-12">
                                    {roomData.length > visibleCards && (
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => setVisibleCards(prev => prev + 6)}
                                                className="relative bg-white text-[#18189C] px-8 py-3 md:px-10 md:py-4 rounded-full border-2 border-black text-xs md:text-sm font-black uppercase tracking-widest hover:bg-slate-50"
                                            >
                                                Show More Results
                                            </button>
                                        </div>
                                    )}
                                    {visibleCards > 6 && (
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => setVisibleCards(6)}
                                                className="relative bg-white text-[#18189C] px-8 py-3 md:px-10 md:py-4 rounded-full border-2 border-black text-xs md:text-sm font-black uppercase tracking-widest hover:bg-slate-50"
                                            >
                                                Show Less
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {roomData.length === 0 && <EmptyState message="No rooms found." />}
                            </div>
                        )}

                        {/* Cabs Content */}
                        {activeTab === "cab" && (
                            <div className="w-full">
                                <div className="flex flex-wrap justify-center gap-3 md:gap-8">
                                    <AnimatePresence mode="popLayout">
                                        {cabData.slice(0, visibleCards).map((item, index) => (
                                            <ServiceCard
                                                key={item._id}
                                                item={item}
                                                index={index}
                                                onClick={() => setSelectedId(item._id)}
                                                type="cab"
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <div className="flex justify-center items-center gap-6 mt-8 md:mt-12">
                                    {cabData.length > visibleCards && (
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => setVisibleCards(prev => prev + 6)}
                                                className="relative bg-white text-[#18189C] px-8 py-3 md:px-10 md:py-4 rounded-full border-2 border-black text-xs md:text-sm font-black uppercase tracking-widest hover:bg-slate-50"
                                            >
                                                Show More Results
                                            </button>
                                        </div>
                                    )}
                                    {visibleCards > 6 && (
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => setVisibleCards(6)}
                                                className="relative bg-white text-[#18189C] px-8 py-3 md:px-10 md:py-4 rounded-full border-2 border-black text-xs md:text-sm font-black uppercase tracking-widest hover:bg-slate-50"
                                            >
                                                Show Less
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {cabData.length === 0 && <EmptyState message="No cabs found." />}
                            </div>
                        )}
                    </div>
                )}

                <ServiceModal 
                    isOpen={!!selectedId} 
                    item={activeItem} 
                    type={activeTab} 
                    onClose={() => setSelectedId(null)} 
                />

            </div>
        </section>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="col-span-full text-center py-20 bg-black/5 backdrop-blur-md rounded-2xl border border-dashed border-black/10">
            <p className="text-black/50 font-medium">{message}</p>
        </div>
    );
}
