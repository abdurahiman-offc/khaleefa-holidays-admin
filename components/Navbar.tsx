"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    const navLinks = [
        { name: "Home", id: "hero" },
        { name: "Visa", id: "services" },
        { name: "Popular destination", id: "destinations" },
        { name: "Partner with Us", id: "b2b" },
        { name: "Contact Us", id: "contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Detect active section
            const scrollPos = window.scrollY + 150;
            let current = "hero";

            for (const link of navLinks) {
                const element = document.getElementById(link.id);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        current = link.id;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (pathname.startsWith("/admin")) return null;

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: id === "hero" ? 0 : offsetPosition,
                behavior: "smooth"
            });
            setActiveSection(id);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-8"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-[180px] h-[50px]">
                        <Image
                            src="/images/mainlogo-1"
                            alt="Khaleefa Holidays Logo"
                            fill
                            sizes="(max-width: 768px) 180px, 180px"
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                {/* Navigation Menus */}
                <div className="hidden lg:flex items-center space-x-8 nav-menu-desktop">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            type="button"
                            onClick={() => scrollToSection(link.id)}
                            className={`transition-all text-[13px] font-black uppercase tracking-[0.2em] ${activeSection === link.id
                                ? "text-[#18189C] underline underline-offset-8 decoration-2"
                                : "text-[#2D3E33] hover:text-[#18189C] hover:underline underline-offset-8 decoration-2"
                                }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-[#18189C] nav-hamburger-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-[#F5F5F5] shadow-xl p-8 lg:hidden flex flex-col gap-6 nav-mobile-overlay">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            type="button"
                            onClick={() => scrollToSection(link.id)}
                            className={`text-xl font-black uppercase tracking-widest text-left ${activeSection === link.id ? "text-[#18189C] underline" : "text-[#2D3E33]"
                                }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}
