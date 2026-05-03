
"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Pencil, Search } from "lucide-react";
import Image from "next/image";

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

export default function VisasPage() {
    const [visas, setVisas] = useState<Visa[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [filterType, setFilterType] = useState("All");

    // Form State
    const [formData, setFormData] = useState({
        country: "",
        visaType: "Tourist",
        image: "",
        processingDays: "",
        validity: "",
        cost: "",
        category: "Asia",
        requirements: [] as string[],
        contactNumber: "",
        contactPerson: "",
    });

    const fetchVisas = async () => {
        try {
            const res = await fetch("/api/visas");
            const data = await res.json();
            if (data.success) {
                setVisas(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch visas", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVisas();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `/api/visas/${editingId}` : "/api/visas";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    processingDays: Number(formData.processingDays),
                    validity: Number(formData.validity),
                    cost: Number(formData.cost),
                }),
            });

            if (res.ok) {
                await fetchVisas();
                closeModal();
            } else {
                console.error("Failed to save visa");
            }
        } catch (error) {
            console.error("Failed to save visa", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this visa?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/visas/${id}`, { method: "DELETE" });
            if (res.ok) {
                await fetchVisas();
            }
        } catch (error) {
            console.error("Failed to delete", error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (visa?: Visa) => {
        if (visa) {
            setEditingId(visa._id);
            setFormData({
                country: visa.country,
                visaType: visa.visaType,
                image: visa.image,
                processingDays: String(visa.processingDays),
                validity: String(visa.validity),
                cost: String(visa.cost),
                contactNumber: visa.contactNumber || "",
                contactPerson: visa.contactPerson || "",
                category: visa.category || "Asia",
                requirements: visa.requirements || [],
            });
        } else {
            setEditingId(null);
            setFormData({
                country: "",
                visaType: "Tourist",
                image: "",
                processingDays: "",
                validity: "",
                cost: "",
                contactNumber: "",
                contactPerson: "",
                category: "Asia",
                requirements: [] as string[],
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    if (loading && visas.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Visa Services</h1>
                <div className="flex flex-wrap w-full xl:w-auto gap-4">
                    <div className="relative flex-1 min-w-[250px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search country or agent..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
                        />
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all text-sm font-medium"
                    >
                        <option value="All">All Categories</option>
                        <option value="GCC">GCC</option>
                        <option value="Schengen">Schengen</option>
                        <option value="Asia">Asia</option>
                    </select>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all text-sm font-medium"
                    >
                        <option value="All">All Visa Types</option>
                        <option value="Tourist">Tourist</option>
                        <option value="Business">Business</option>
                        <option value="Job seeker">Job seeker</option>
                        <option value="Umrah">Umrah</option>
                        <option value="Family">Family</option>
                    </select>
                    <button
                        onClick={() => openModal()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition shadow-md active:scale-95"
                    >
                        <Plus size={18} /> Add Visa
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visas
                    .filter(visa => {
                        const matchesSearch = visa.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (visa.contactPerson || "").toLowerCase().includes(searchQuery.toLowerCase());
                        const matchesCategory = filterCategory === "All" || visa.category === filterCategory;
                        const matchesType = filterType === "All" || visa.visaType === filterType;
                        return matchesSearch && matchesCategory && matchesType;
                    })
                    .map((visa) => (
                    <div
                        key={visa._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
                    >
                        <div className="relative h-48">
                            <Image
                                src={visa.image}
                                alt={visa.country}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button
                                    onClick={() => openModal(visa)}
                                    className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm transition"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(visa._id)}
                                    className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full backdrop-blur-sm transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <div className="absolute top-2 right-2 bg-white/90 text-xs font-bold px-2 py-1 rounded text-blue-800">
                                {visa.visaType}
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-gray-900">
                                    {visa.country}
                                </h3>
                                <span className="font-bold text-blue-600">₹ {visa.cost}</span>
                            </div>
                            <div className="text-sm text-gray-500 flex flex-col gap-1">
                                <p>Processing: {visa.processingDays} Days</p>
                                <p>Validity: {visa.validity} Days</p>
                            </div>
                        </div>
                    </div>
                ))}

                {visas.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No visas found. Click "Add Visa" to create one.
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto admin-scrollbar">
                    <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto admin-scrollbar">
                        <h2 className="text-xl font-bold mb-4">
                            {editingId ? "Edit Visa" : "New Visa"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Country Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.country}
                                    onChange={(e) =>
                                        setFormData({ ...formData, country: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. UAE"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Visa Type
                                </label>
                                <select
                                    value={formData.visaType}
                                    onChange={(e) =>
                                        setFormData({ ...formData, visaType: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="Tourist">Tourist</option>
                                    <option value="Business">Business</option>
                                    <option value="Job seeker">Job seeker</option>
                                    <option value="Umrah">Umrah</option>
                                    <option value="Family">Family</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="GCC">GCC</option>
                                    <option value="Schengen">Schengen</option>
                                    <option value="Asia">Asia</option>
                                </select>
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
                                        Processing Days
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={formData.processingDays}
                                        onChange={(e) =>
                                            setFormData({ ...formData, processingDays: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g. 5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Validity (Days)
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={formData.validity}
                                        onChange={(e) =>
                                            setFormData({ ...formData, validity: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="e.g. 30"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cost (INR)
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.cost}
                                    onChange={(e) =>
                                        setFormData({ ...formData, cost: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. 5000"
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Requirements
                                </label>
                                <div className="space-y-3">
                                    {formData.requirements.map((req, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={req}
                                                onChange={(e) => {
                                                    const newReqs = [...formData.requirements];
                                                    newReqs[index] = e.target.value;
                                                    setFormData({ ...formData, requirements: newReqs });
                                                }}
                                                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                placeholder={`Requirement ${index + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newReqs = formData.requirements.filter((_, i) => i !== index);
                                                    setFormData({ ...formData, requirements: newReqs });
                                                }}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                requirements: [...formData.requirements, ""],
                                            })
                                        }
                                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        <Plus size={16} /> Add Requirement
                                    </button>
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
