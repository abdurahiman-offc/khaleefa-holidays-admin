
"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Pencil, Search } from "lucide-react";
import Image from "next/image";

interface Room {
    _id: string;
    name: string;
    image: string;
    price: string;
    amenities: string;
    contactPerson: string;
    contactNumber: string;
}

export default function RoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: "",
        amenities: "",
        contactPerson: "",
        contactNumber: "",
    });

    const fetchRooms = async () => {
        try {
            const res = await fetch("/api/rooms");
            const data = await res.json();
            if (data.success) {
                setRooms(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch rooms", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `/api/rooms/${editingId}` : "/api/rooms";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                await fetchRooms();
                closeModal();
            }
        } catch (error) {
            console.error("Failed to save room", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this room?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/rooms/${id}`, { method: "DELETE" });
            if (res.ok) {
                await fetchRooms();
            }
        } catch (error) {
            console.error("Failed to delete", error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (room?: Room) => {
        if (room) {
            setEditingId(room._id);
            setFormData({
                name: room.name,
                image: room.image,
                price: room.price,
                amenities: room.amenities,
                contactPerson: room.contactPerson || "",
                contactNumber: room.contactNumber || "",
            });
        } else {
            setEditingId(null);
            setFormData({
                name: "",
                image: "",
                price: "",
                amenities: "",
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

    if (loading && rooms.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Rooms & Stays</h1>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                    <div className="relative flex-1 sm:min-w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by room name or amenities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
                        />
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition shadow-md active:scale-95"
                    >
                        <Plus size={18} /> Add Room
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {rooms
                    .filter(room => {
                        const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            room.amenities.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (room.contactPerson || "").toLowerCase().includes(searchQuery.toLowerCase());
                        return matchesSearch;
                    })
                    .map((room) => (
                    <div
                        key={room._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
                    >
                        <div className="relative h-48">
                            <Image
                                src={room.image}
                                alt={room.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3">
                                <button
                                    onClick={() => openModal(room)}
                                    className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm transition"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(room._id)}
                                    className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full backdrop-blur-sm transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-gray-900">
                                    {room.name}
                                </h3>
                                <span className="font-bold text-blue-600">{room.price}</span>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2">{room.amenities}</p>
                        </div>
                    </div>
                ))}

                {rooms.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No rooms found. Click "Add Room" to create one.
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto admin-scrollbar">
                    <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto admin-scrollbar">
                        <h2 className="text-xl font-bold mb-4">
                            {editingId ? "Edit Room" : "New Room"}
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
                                    placeholder="e.g. Deluxe Suite"
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
                                    placeholder="https://example.com/room.jpg"
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
                                        placeholder="e.g. ₹ 2500 / night"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Amenities (comma separated)
                                </label>
                                <textarea
                                    required
                                    value={formData.amenities}
                                    onChange={(e) =>
                                        setFormData({ ...formData, amenities: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. WiFi, AC, Breakfast, Pool"
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
