import React from 'react';
import { Twitter, Instagram, Dribbble, Github } from 'lucide-react';

const Footer = () => {
    const footerLinks = [
        {
            title: "Explore",
            links: ["Art", "Photography", "Music", "Games"]
        },
        {
            title: "My Account",
            links: ["My Profile", "My Collections", "My Favorites", "My Account Settings"]
        },
        {
            title: "Resources",
            links: ["Help Center", "Partners", "Suggestions", "Newsletter"]
        },
        {
            title: "Company",
            links: ["About", "Careers", "Ranking", "Activity"]
        }
    ];
    // Ubah array ini menjadi array of objects
    const socialMedias = [
        {
            Icon: Twitter,
            url: "#"
        },
        {
            Icon: Instagram,
            url: "https://instagram.com/muhammadhaikalafwan"
        },
        {
            Icon: Dribbble,
            url: "#"
        },
        {
            Icon: Github,
            url: "https://github.com/afwan-belang" // Masukkan link repo atau profil Anda di sini
        }
    ];
    return (
        <footer className="border-t border-white/10 bg-dark-bg/80 backdrop-blur-md pt-16 pb-8 mt-10 relative z-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">

                    {/* Kiri: Brand & Socials */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-white text-2xl font-bold font-display tracking-wider">
                                PLAY <span className="text-gradient">NFT</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            The world's largest digital marketplace for crypto collections and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital assets.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-2">
                            {socialMedias.map((social, idx) => {
                                const Icon = social.Icon; // Ekstrak komponen Icon

                                return (
                                    <a
                                        key={idx}
                                        href={social.url}               // 1. Masukkan URL di sini
                                        target="_blank"                 // 2. Buka di tab baru
                                        rel="noopener noreferrer"       // 3. Keamanan wajib untuk link eksternal
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.5)]"
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Kanan: Link Columns */}
                    <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {footerLinks.map((column, idx) => (
                            <div key={idx} className="flex flex-col gap-4">
                                <h4 className="text-white font-bold font-display tracking-wide mb-2">
                                    {column.title}
                                </h4>
                                <ul className="flex flex-col gap-3">
                                    {column.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <a href="#" className="text-gray-400 text-sm hover:text-primary transition-colors duration-300">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Bottom Copyright */}
                <div className="w-full h-px bg-white/10 my-8"></div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 text-center md:text-left">
                    <p>© 2026 PLAY NFT. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;