
"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Pencil, Search } from "lucide-react";
import Image from "next/image";

interface Destination {
    _id: string;
    name: string;
    image: string;
    price: string;
    description: string;
    popularDestination: boolean;
    duration: string;
    supportAgent: string;
    supportNumber: string;
}

export default function DestinationsPage() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterPopular, setFilterPopular] = useState<boolean | "All">("All");

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: "",
        description: "",
        popularDestination: false,
        duration: "",
        supportAgent: "",
        supportNumber: "",
    });

    const fetchDestinations = async () => {
        try {
            const res = await fetch("/api/destinations");
            const data = await res.json();
            if (data.success) {
                setDestinations(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch destinations", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const method = editingId ? "PUT" : "POST";
            const url = editingId
                ? `/api/destinations/${editingId}`
                : "/api/destinations";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                await fetchDestinations();
                closeModal();
            }
        } catch (error) {
            console.error("Failed to save destination", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this destination?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/destinations/${id}`, { method: "DELETE" });
            if (res.ok) {
                await fetchDestinations();
            }
        } catch (error) {
            console.error("Failed to delete", error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (dest?: Destination) => {
        if (dest) {
            setEditingId(dest._id);
            setFormData({
                name: dest.name,
                image: dest.image,
                price: dest.price,
                description: dest.description || "",
                popularDestination: dest.popularDestination || false,
                duration: dest.duration || "",
                supportAgent: dest.supportAgent || "",
                supportNumber: dest.supportNumber || "",
            });
        } else {
            setEditingId(null);
            setFormData({
                name: "",
                image: "",
                price: "",
                description: "",
                popularDestination: false,
                duration: "",
                supportAgent: "",
                supportNumber: "",
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    if (loading && destinations.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Destinations</h1>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                    <div className="relative flex-1 sm:min-w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
                        />
                    </div>
                    <select
                        value={String(filterPopular)}
                        onChange={(e) => {
                            const val = e.target.value;
                            setFilterPopular(val === "All" ? "All" : val === "true");
                        }}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all text-sm font-medium"
                    >
                        <option value="All">All Destinations</option>
                        <option value="true">Popular Only</option>
                        <option value="false">Standard Only</option>
                    </select>
                    <button
                        onClick={() => openModal()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition shadow-md active:scale-95"
                    >
                        <Plus size={18} /> Add Destination
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {destinations
                    .filter(dest => {
                        const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dest.description.toLowerCase().includes(searchQuery.toLowerCase());
                        const matchesFilter = filterPopular === "All" || dest.popularDestination === filterPopular;
                        return matchesSearch && matchesFilter;
                    })
                    .map((dest) => (
                    <div
                        key={dest._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
                    >
                        <div className="relative h-48">
                            <Image
                                src={dest.image}
                                alt={dest.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3">
                                <button
                                    onClick={() => openModal(dest)}
                                    className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm transition"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(dest._id)}
                                    className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full backdrop-blur-sm transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-gray-900">{dest.name}</h3>
                            <p className="text-blue-600 font-medium">{dest.price}</p>
                        </div>
                    </div>
                ))}

                {destinations.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No destinations found. Click "Add Destination" to create one.
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto admin-scrollbar">
                    <div className="bg-white rounded-xl w-full max-w-md p-6 my-8">
                        <h2 className="text-xl font-bold mb-4">
                            {editingId ? "Edit Destination" : "New Destination"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. Bali, Indonesia"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    required
                                    value={formData.image}
                                    onChange={(e) =>
                                        setFormData({ ...formData, image: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Price
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({ ...formData, price: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g. $1,200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Duration (No. of Days)
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.duration}
                                        onChange={(e) =>
                                            setFormData({ ...formData, duration: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g. 5 Days"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Support Agent
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.supportAgent}
                                        onChange={(e) =>
                                            setFormData({ ...formData, supportAgent: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Agent Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Support Number
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.supportNumber}
                                        onChange={(e) =>
                                            setFormData({ ...formData, supportNumber: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g. 9846223028"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                                    placeholder="Enter destination details..."
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="popularDestination"
                                    checked={formData.popularDestination}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            popularDestination: e.target.checked,
                                        })
                                    }
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="popularDestination"
                                    className="text-sm font-medium text-gray-700 select-none cursor-pointer"
                                >
                                    Popular Destination
                                </label>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
