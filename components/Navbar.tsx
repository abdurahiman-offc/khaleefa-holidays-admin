"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (pathname.startsWith("/admin")) return null;

    const navLinks = [
        { name: "Services", id: "services" },
        { name: "Destinations", id: "destinations" },
        { name: "Reviews", id: "reviews" },
        { name: "About Us", id: "about-us" },
        { name: "B2B", id: "b2b" },
    ];

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80  backdrop-blur-md py-4 shadow-sm"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <div className="relative w-48 h-12 md:w-56 md:h-14">
                        <Image
                            src={isScrolled ? "/images/mainlogo.png" : "/images/mainlogo2.png"}
                            alt="Khaleefa Holidays Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            type="button"
                            onClick={() => scrollToSection(link.id)}
                            className={`relative py-1 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 ${isScrolled ? "text-slate-600 hover:text-bookease-navy after:bg-bookease-navy" : "text-white/90 hover:text-white after:bg-white"
                                }`}
                        >
                            {link.name}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => scrollToSection("contact")}
                        className="bg-bookease-navy hover:bg-bookease-slate text-white px-8 py-3 rounded-full font-bold text-lg transition-all shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 border-2 border-white"
                    >
                        Contact Us
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden bg-transparent backdrop-blur-md border border-gray-200/50 hover:bg-black/5 p-2 rounded-lg transition-all"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className={isScrolled ? "text-bookease-navy" : "text-white"} /> : <Menu className={isScrolled ? "text-bookease-navy" : "text-white"} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white  shadow-lg p-6 md:hidden flex flex-col gap-4"
                    >
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                type="button"
                                onClick={() => scrollToSection(link.id)}
                                className="text-lg font-medium text-slate-800 text-left w-full py-2"
                            >
                                {link.name}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => scrollToSection("contact")}
                            className="text-lg font-medium text-slate-800 text-left w-full py-2 mt-2 border-t border-gray-100 pt-4"
                        >
                            Contact Us
                        </button>

                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
