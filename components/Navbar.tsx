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
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isPastHero, setIsPastHero] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);
            setIsPastHero(currentScrollY > 20); // Hide almost immediately when scrolling starts

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "md:bg-white/80 md:backdrop-blur-md py-4 md:shadow-sm"
                : "bg-transparent py-6"
                } ${!isVisible ? "-translate-y-full opacity-0 md:translate-y-0 md:opacity-100" : "translate-y-0 opacity-100"}`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    {/* Desktop Logo */}
                    <div className="hidden md:block relative w-48 h-12 md:w-56 md:h-14">
                        <Image
                            src={isScrolled ? "/images/desktopnav2.png" : "/images/mainlogo2.png"}
                            alt="Khaleefa Holidays Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                    {/* Mobile Logo */}
                    <div className={`block md:hidden relative w-64 h-20 transition-all duration-500 ${isPastHero ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}>
                        <Image
                            src="/images/mobilenav.png"
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
                    className="md:hidden relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-1.5 transition-all outline-none group"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {/* Round Background */}
                    <div className={`absolute inset-0 rounded-full border-2 border-white transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "bg-[#151794] shadow-lg scale-100" : "bg-transparent scale-0"}`} />

                    <motion.span
                        animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-6 h-0.5 rounded-full bg-white relative z-10"
                    />
                    <motion.span
                        animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-6 h-0.5 rounded-full bg-white relative z-10"
                    />
                    <motion.span
                        animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-6 h-0.5 rounded-full bg-white relative z-10"
                    />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-[#151794]/95 backdrop-blur-xl shadow-lg p-6 md:hidden flex flex-col gap-4 border-t border-white/10"
                    >
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                type="button"
                                onClick={() => scrollToSection(link.id)}
                                className="text-lg font-bold text-white text-left w-full py-4 px-4 hover:bg-white/10 rounded-2xl transition-all active:scale-[0.98]"
                            >
                                {link.name}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => scrollToSection("contact")}
                            className="text-lg font-bold text-white text-left w-full py-4 px-4 mt-2 border-t border-white/10 hover:bg-white/10 rounded-2xl transition-all active:scale-[0.98]"
                        >
                            Contact Us
                        </button>

                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
