"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionBackground from "./SectionBackground";
import { ServiceCard, ServiceModal } from "./ServiceCard";
import type { Destination } from "./ServiceCard";

export default function Destinations() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch("/api/destinations");
                const data = await response.json();
                if (data.success) {
                    setDestinations(data.data.filter((d: Destination) => d.popularDestination));
                }
            } catch (error) {
                console.error("Error fetching destinations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    // Body scroll lock on modal open
    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedId]);

    const activeItem = destinations.find(d => d._id === selectedId);

    return (
        <section id="destinations" className={`pt-[100px] pb-7 md:pb-[100px] bg-[#F5F5F5] relative transition-colors duration-300 ${selectedId ? 'z-[100]' : 'z-10'}`}>
            <SectionBackground />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-[10px] font-black text-[#2D3E33]/40 uppercase tracking-[0.2em] mb-4">
                        Discover
                    </h2>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-[#18189C] to-black">
                        Popular Destinations
                    </h2>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-[#18189C] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-3 md:gap-8 max-w-[1400px] mx-auto">
                        {destinations.map((place, index) => (
                            <ServiceCard
                                key={place._id}
                                item={place}
                                index={index}
                                onClick={() => setSelectedId(place._id)}
                                type="destination"
                            />
                        ))}
                    </div>
                )}

                <ServiceModal 
                    isOpen={!!selectedId} 
                    item={activeItem} 
                    type="destinations" 
                    onClose={() => setSelectedId(null)} 
                />
            </div>
        </section>
    );
}
