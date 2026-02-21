import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-white  border-t border-slate-200  py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="block mb-4 relative w-48 h-12">
                            <Image
                                src="/images/logonav.png"
                                alt="Khaleefa Holidays Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="text-slate-500  text-sm">
                            Your gateway to the world&apos;s most beautiful destinations.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-bookease-navy  mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-600 ">
                            <li><Link href="#" className="hover:text-bookease-navy transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-bookease-navy transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-bookease-navy transition-colors">Press</Link></li>
                            <li><Link href="#" className="hover:text-bookease-navy transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-bookease-navy  mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-slate-600 ">
                            <li><Link href="#" className="hover:text-bookease-navy transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-bookease-navy transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-bookease-navy transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-bookease-navy transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-bold text-bookease-navy  mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-slate-400 hover:text-bookease-navy transition-colors"><Twitter className="w-5 h-5" /></Link>
                            <Link href="#" className="text-slate-400 hover:text-bookease-navy transition-colors"><Instagram className="w-5 h-5" /></Link>
                            <Link href="#" className="text-slate-400 hover:text-bookease-navy transition-colors"><Linkedin className="w-5 h-5" /></Link>
                            <Link href="#" className="text-slate-400 hover:text-bookease-navy transition-colors"><Youtube className="w-5 h-5" /></Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100  pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 ">
                    <p>&copy; {new Date().getFullYear()} Bookease Inc. All rights reserved.</p>
                    <p>Made with ❤️ for wanderlusters.</p>
                </div>
            </div>
        </footer>
    );
}
