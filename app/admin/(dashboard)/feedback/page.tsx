"use client";

import { useState, useEffect } from "react";
import { Loader2, Star, Trash2, User, MapPin, Quote, Search, Plus, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Feedback {
    _id: string;
    name: string;
    place: string;
    stars: number;
    feedback: string;
    createdAt: string;
}

export default function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        place: "",
        stars: 0,
        feedback: ""
    });

    const fetchFeedbacks = async () => {
        try {
            const res = await fetch("/api/testimonials");
            const data = await res.json();
            if (data.success) {
                setFeedbacks(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch feedback", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.stars === 0) {
            alert("Please select a star rating");
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setIsModalOpen(false);
                setFormData({ name: "", place: "", stars: 0, feedback: "" });
                fetchFeedbacks();
            }
        } catch (error) {
            console.error("Failed to add feedback", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteFeedback = async (id: string) => {
        if (!confirm("Are you sure you want to delete this feedback?")) return;
        try {
            const res = await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchFeedbacks();
            }
        } catch (error) {
            console.error("Failed to delete feedback", error);
        }
    };

    const filteredFeedbacks = feedbacks.filter(f => 
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.feedback.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">User Feedback</h1>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
                    <div className="relative w-full sm:w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search feedback..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition shadow-md active:scale-95 text-sm font-bold"
                        >
                            <Plus size={18} /> Add Feedback
                        </button>
                        {feedbacks.length > 0 && (
                            <button
                                onClick={async () => {
                                    if (confirm("Clear ALL feedback? This cannot be undone.")) {
                                        setLoading(true);
                                        await fetch("/api/testimonials", { method: "DELETE" });
                                        fetchFeedbacks();
                                    }
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl text-sm font-bold transition-all border border-red-100"
                            >
                                <Trash2 size={16} />
                                Clear All
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredFeedbacks.map((f) => (
                    <div key={f._id} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col group relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={14} 
                                        className={i < f.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} 
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => deleteFeedback(f._id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="relative mb-6">
                            <Quote size={24} className="text-blue-500/10 absolute -top-2 -left-2" />
                            <p className="text-gray-600 text-sm italic leading-relaxed relative z-10 px-2">
                                "{f.feedback}"
                            </p>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                                <User size={20} />
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-bold text-gray-900 truncate uppercase text-sm tracking-tight">{f.name}</h4>
                                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                    <MapPin size={10} /> {f.place}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredFeedbacks.length === 0 && (
                <div className="py-20 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="text-gray-200" size={32} />
                    </div>
                    <p className="text-gray-500 font-medium">No feedback found</p>
                </div>
            )}

            {/* Add Feedback Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative z-10 overflow-hidden"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition text-gray-400"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8 md:p-10">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-[#18189C] uppercase tracking-tighter">Add Feedback</h3>
                                    <p className="text-[10px] font-black text-[#18189C]/40 tracking-[0.2em] uppercase mt-1">Manual Testimonial Entry</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest px-1">Customer Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-[#F5F5F5] border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#18189C]/10 outline-none text-sm font-black uppercase text-slate-700 transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest px-1">Location</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.place}
                                                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-[#F5F5F5] border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#18189C]/10 outline-none text-sm font-black uppercase text-slate-700 transition-all"
                                                placeholder="Dubai, UAE"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest px-1">Rating</label>
                                        <div className="flex gap-3 px-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, stars: star })}
                                                    className="transition-transform active:scale-90"
                                                >
                                                    <Star
                                                        size={28}
                                                        className={star <= formData.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-[#18189C]/30 uppercase tracking-widest px-1">Feedback Text</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.feedback}
                                            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-[#F5F5F5] border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#18189C]/10 outline-none text-sm font-black uppercase text-slate-700 transition-all resize-none"
                                            placeholder="Write the testimonial here..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#18189C] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all duration-300 shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Save Testimonial"}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
