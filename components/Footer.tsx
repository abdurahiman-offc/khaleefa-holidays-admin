"use client";

import { Instagram, Facebook, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const navLinks = [
        { name: "Home", id: "hero" },
        { name: "Visa", id: "services" },
        { name: "Popular destination", id: "destinations" },
        { name: "Partner with Us", id: "b2b" },
        { name: "Contact Us", id: "contact" },
    ];

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer
            className="bg-[#18189C] text-white/60 pb-8 relative overflow-hidden"
            style={{
                clipPath: 'url(#footer-wave-clip)',
                marginTop: '-100px',
                paddingTop: '150px'
            }}
        >
            {/* SVG ClipPath Definition for Physical Cropping */}
            <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true">
                <defs>
                    <clipPath id="footer-wave-clip" clipPathUnits="objectBoundingBox">
                        <path d="M0,0.1 
                                 C0.2,0 0.3,0.2 0.5,0.1 
                                 C0.7,0 0.8,0.2 1,0.1 
                                 L1,1 L0,1 Z" />
                    </clipPath>
                </defs>
            </svg>

            <div className="container mx-auto px-6 relative z-10">
                {/* TOP DIV: Split into 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-white/10 pb-12 items-start">
                    
                    {/* COLUMN 1: Logo & Social */}
                    <div className="flex flex-col items-center md:items-start gap-6">
                        <Link href="/" className="block relative w-[300px] md:w-[350px] h-[80px] md:h-[90px]">
                                <Image
                                    src="/images/desktopnav2.png"
                                    alt="Khaleefa Holidays Logo"
                                    fill
                                    className="object-contain object-center md:object-left filter brightness-0 invert"
                                    sizes="(max-width: 768px) 300px, 350px"
                                    priority
                                />
                        </Link>
                        <div className="flex space-x-4">
                            {[
                                { Icon: Instagram, href: "#" },
                                { Icon: Facebook, href: "#" },
                                { Icon: Twitter, href: "#" },
                                { Icon: Linkedin, href: "#" },
                            ].map(({ Icon, href }, idx) => (
                                <Link
                                    key={idx}
                                    href={href}
                                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white/80 hover:text-[#18189C] hover:bg-white transition-all duration-300 shadow-sm border border-white/5"
                                >
                                    <Icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <h4 className="text-white/40 text-[13px] font-black uppercase tracking-[0.3em] mb-8">Navigation</h4>
                        <div className="flex flex-col items-center gap-5 text-[15px] font-black text-white/60 uppercase tracking-[0.2em]">
                            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                                {navLinks.slice(0, 3).map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className="hover:text-white transition-colors whitespace-nowrap"
                                    >
                                        {link.name}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                                {navLinks.slice(3).map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className="hover:text-white transition-colors whitespace-nowrap"
                                    >
                                        {link.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 3: Address & Contact (Right) */}
                    <div className="flex flex-col items-center md:items-end">
                        <h4 className="text-white/40 text-[13px] font-black uppercase tracking-[0.3em] mb-8">Connect</h4>
                        <div className="flex flex-col items-center md:items-end gap-5 text-[15px] font-black text-white/60 uppercase tracking-widest leading-relaxed">
                            <div className="flex items-center gap-4">
                                <span>123 Travel Lane, Metropolis</span>
                                <MapPin size={16} className="text-white shrink-0 opacity-40" />
                            </div>
                            <div className="flex items-center gap-4">
                                <span>+91 98765 43210</span>
                                <Phone size={16} className="text-white shrink-0 opacity-40" />
                            </div>
                            <div className="flex items-center gap-4">
                                <span>contact@khaleefaholidays.com</span>
                                <Mail size={16} className="text-white shrink-0 opacity-40" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM DIV: Centered Details */}
                <div className="flex flex-col items-center text-center gap-6">
                    <div className="flex flex-col items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-[0.1em]">
                        <p className="">&copy; {new Date().getFullYear()} Khaleefa Holidays. All Rights Reserved.</p>
                        <div className="flex items-center space-x-6">
                            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <div className="w-1 h-1 bg-white/10 rounded-full opacity-20" />
                            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
