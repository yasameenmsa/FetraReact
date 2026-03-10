"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'الرئيسية', href: '/#hero' },
        { name: 'عن المشروع', href: '/#summary' },
        { name: 'الأهداف', href: '/#goals' },
        { name: 'البرامج', href: '/#programs' },
        { name: 'الأسئلة الشائعة', href: '/#faq' },
        { name: 'تواصل معنا', href: '/#contact' },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${(scrolled && !isOpen) ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
                }`}
        >
            <div className="container-custom flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <Image
                        src="/logo.webp"
                        alt="Fitrah Project"
                        width={150}
                        height={64}
                        className="h-12 md:h-16 w-auto object-contain"
                    />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`font-medium transition-colors hover:text-green-700 relative group ${scrolled ? 'text-brown-800' : 'text-cream-50'
                                }`}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-green-700 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                    <Link
                        href="/form"
                        className={`btn-primary px-6 py-2 text-sm ${!scrolled && 'bg-cream-100 text-brown-800 hover:bg-white'}`}
                        aria-label="انضم إلى مشروع فطرة"
                    >
                        انضم إلينا
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-brown-800"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={24} color="#F5F1E8" /> : <Menu size={24} color={scrolled ? '#6B4423' : '#F5F1E8'} />}
                </button>
            </div>

            {/* Mobile Navigation Drawer */}
            <div
                className={`md:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-gradient-to-b from-cream-50 to-cream-100 shadow-[0_0_40px_rgba(0,0,0,0.15)] z-[60] transform transition-transform duration-300 ease-in-out border-l border-brown-200/30 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col p-8 pt-24 gap-6 h-full overflow-y-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-2xl font-bold text-brown-800 hover:text-green-700 transition-colors border-b border-brown-200/20 pb-4"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="mt-auto pt-8">
                        <Link
                            href="/form"
                            className="btn-primary w-full flex justify-center py-3 text-lg shadow-lg hover:shadow-xl transition-all"
                            aria-label="انضم إلى مشروع فطرة"
                            onClick={() => setIsOpen(false)}
                        >
                            انضم إلينا
                        </Link>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}
        </header>
    );
};

export default Header;
