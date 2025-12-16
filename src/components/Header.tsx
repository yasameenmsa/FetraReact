import React, { useState, useEffect } from 'react';
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
        { name: 'الرئيسية', href: '#hero' },
        { name: 'عن المشروع', href: '#summary' },
        { name: 'الأهداف', href: '#goals' },
        { name: 'البرامج', href: '#programs' },
        { name: 'الأسئلة الشائعة', href: '#faq' },
        { name: 'تواصل معنا', href: '#contact' },
    ];

    return (
        <header 
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
            }`}
        >
            <div className="container-custom flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <img 
                        src="/logo.webp" 
                        alt="Fitrah Project" 
                        className="h-12 md:h-16 object-contain"
                    />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href}
                            className={`font-medium transition-colors hover:text-green-700 relative group ${
                                scrolled ? 'text-brown-800' : 'text-cream-50'
                            }`}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-green-700 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                    <button className={`btn-primary px-6 py-2 text-sm ${!scrolled && 'bg-cream-100 text-brown-800 hover:bg-white'}`}>
                        انضم إلينا
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2 text-brown-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} color={scrolled ? '#6B4423' : '#F5F1E8'} /> : <Menu size={24} color={scrolled ? '#6B4423' : '#F5F1E8'} />}
                </button>
            </div>

            {/* Mobile Navigation Drawer */}
            <div 
                className={`md:hidden fixed inset-0 bg-cream-100/95 backdrop-blur-lg z-40 transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{ top: '0', right: '0', width: '75%' }}
            >
                <div className="flex flex-col p-8 pt-24 gap-6 h-full">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href}
                            className="text-2xl font-bold text-brown-800 hover:text-green-700 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button className="btn-primary w-full mt-4">
                        انضم إلينا
                    </button>
                </div>
            </div>
            
            {/* Overlay for mobile menu */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </header>
    );
};

export default Header;
