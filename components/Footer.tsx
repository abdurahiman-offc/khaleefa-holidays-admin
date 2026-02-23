"use client";

import { Instagram, Facebook, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
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
    };

    return (
        <footer
            className="bg-white text-slate-600 pb-12 relative overflow-hidden"
            style={{
                clipPath: 'url(#footer-wave-clip)',
                marginTop: '-120px',
                paddingTop: '180px'
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
                {/* ROW 1: Logo, Menus, Social Media */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 mb-12 border-b border-slate-100 pb-8">
                    {/* Column 1: Logo (Left on Desktop) */}
                    <div className="flex justify-center md:justify-start">
                        <Link href="/" className="block relative w-[280px] h-[70px]">
                            <Image
                                src="/images/desktopnav2.png"
                                alt="Khaleefa Holidays Logo"
                                fill
                                className="object-contain object-center md:object-left"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Column 2: Menus (Centered) */}
                    <div className="flex justify-center">
                        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[13px] font-black text-slate-600 uppercase tracking-[0.1em]">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => scrollToSection(link.id)}
                                        className="hover:text-bookease-navy transition-colors whitespace-nowrap"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Social Media (Right on Desktop) */}
                    <div className="flex justify-center md:justify-end">
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
                                    className="w-9 h-9 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-white hover:bg-bookease-navy transition-all duration-300 shadow-sm"
                                >
                                    <Icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ROW 2: Description, Copyright & Legal, Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-left pt-4">
                    {/* Column 1: Description (Left) */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-bookease-navy font-black uppercase tracking-[0.2em] text-[10px]">About Us</h4>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto md:mx-0 font-medium">
                            Your gateway to the world&apos;s most beautiful destinations. We craft unforgettable experiences tailored just for you, focusing on luxury, comfort, and serenity.
                        </p>
                    </div>

                    {/* Column 2: Copyright & Legal Links (Center) */}
                    <div className="flex flex-col items-center gap-5">
                        <h4 className="text-bookease-navy font-black uppercase tracking-[0.2em] text-[10px]">Company</h4>
                        <div className="flex flex-col items-center gap-3 text-xs font-bold text-slate-500">
                            <p className="text-slate-400">&copy; {new Date().getFullYear()} Khaleefa Holidays.</p>
                            <div className="flex items-center space-x-4">
                                <Link href="#" className="hover:text-bookease-navy transition-colors uppercase tracking-widest text-[10px]">Privacy Policy</Link>
                                <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                <Link href="#" className="hover:text-bookease-navy transition-colors uppercase tracking-widest text-[10px]">Terms of Service</Link>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Contact Info (Right) */}
                    <div className="flex flex-col items-center md:items-end gap-5">
                        <h4 className="text-bookease-navy font-black uppercase tracking-[0.2em] text-[10px] md:text-right">Connect</h4>
                        <div className="flex flex-col items-center md:items-end gap-3 text-sm font-bold text-slate-500">
                            <div className="flex items-center justify-center md:justify-end gap-3 w-full">
                                <span>123 Travel Lane, Metropolis</span>
                                <MapPin size={16} className="text-bookease-navy shrink-0" />
                            </div>
                            <div className="flex items-center justify-center md:justify-end gap-3 w-full">
                                <span>+91 98765 43210</span>
                                <Phone size={16} className="text-bookease-navy shrink-0" />
                            </div>
                            <div className="flex items-center justify-center md:justify-end gap-3 w-full">
                                <span>contact@khaleefaholidays.com</span>
                                <Mail size={16} className="text-bookease-navy shrink-0" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

