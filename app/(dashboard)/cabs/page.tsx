
"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Pencil, Search } from "lucide-react";
import Image from "next/image";

interface Cab {
    _id: string;
    name: string;
    image: string;
    price: string;
    features: string;
    contactPerson: string;
    contactNumber: string;
}

export default function CabsPage() {
    const [cabs, setCabs] = useState<Cab[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: "",
        features: "",
        contactPerson: "",
        contactNumber: "",
    });

    const fetchCabs = async () => {
        try {
            const res = await fetch("/api/cabs");
            const data = await res.json();
            if (data.success) {
                setCabs(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch cabs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCabs();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `/api/cabs/${editingId}` : "/api/cabs";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                await fetchCabs();
                closeModal();
            }
        } catch (error) {
            console.error("Failed to save cab", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this cab?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/cabs/${id}`, { method: "DELETE" });
            if (res.ok) {
                await fetchCabs();
            }
        } catch (error) {
            console.error("Failed to delete", error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (cab?: Cab) => {
        if (cab) {
            setEditingId(cab._id);
            setFormData({
                name: cab.name,
                image: cab.image,
                price: cab.price,
                features: cab.features,
                contactPerson: cab.contactPerson || "",
                contactNumber: cab.contactNumber || "",
            });
        } else {
            setEditingId(null);
            setFormData({
                name: "",
                image: "",
                price: "",
                features: "",
                contactPerson: "",
                contactNumber: "",
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    if (loading && cabs.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Cab Services</h1>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                    <div className="relative flex-1 sm:min-w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by vehicle name or features..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
                        />
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition shadow-md active:scale-95"
                    >
                        <Plus size={18} /> Add Cab
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cabs
                    .filter(cab => {
                        const matchesSearch = cab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            cab.features.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (cab.contactPerson || "").toLowerCase().includes(searchQuery.toLowerCase());
                        return matchesSearch;
                    })
                    .map((cab) => (
                    <div
                        key={cab._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
                    >
                        <div className="relative h-40">
                            <Image
                                src={cab.image}
                                alt={cab.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button
                                    onClick={() => openModal(cab)}
                                    className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm transition"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(cab._id)}
                                    className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full backdrop-blur-sm transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-gray-900">
                                    {cab.name}
                                </h3>
                                <span className="font-bold text-blue-600">{cab.price}</span>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2">{cab.features}</p>
                        </div>
                    </div>
                ))}

                {cabs.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No cabs found. Click "Add Cab" to create one.
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto admin-scrollbar">
                    <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto admin-scrollbar">
                        <h2 className="text-xl font-bold mb-4">
                            {editingId ? "Edit Cab" : "New Cab"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vehicle Name/Type
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. Toyota Innova (7 Seater)"
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
                                    placeholder="https://example.com/cab.jpg"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Price Rate
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({ ...formData, price: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g. ₹ 15 / km"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Features (comma separated)
                                </label>
                                <textarea
                                    required
                                    value={formData.features}
                                    onChange={(e) =>
                                        setFormData({ ...formData, features: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. AC, Music System, Clean Interiors"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Person
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.contactPerson}
                                        onChange={(e) =>
                                            setFormData({ ...formData, contactPerson: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g. John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Number
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.contactNumber}
                                        onChange={(e) =>
                                            setFormData({ ...formData, contactNumber: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g. +91 9876543210"
                                    />
                                </div>
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
