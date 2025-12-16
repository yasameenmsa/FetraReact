import React, { useEffect, useState } from 'react';
import { ArrowDown, leaf } from 'lucide-react';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-brown-900 via-brown-800 to-green-900 text-white">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-green-500 blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brown-500 blur-3xl animate-pulse-slow delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 animate-spin-slow"></div>
            </div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="container-custom relative z-10 text-center">
                <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <span className="inline-block py-1 px-3 rounded-full bg-green-700/30 border border-green-500/30 text-green-300 mb-6 font-medium">
                        مشروع فطرة
                    </span>
                    
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                        <span className="block text-cream-100 mb-2">اكتشف...</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cream-100">الفطرة</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-cream-200/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                        نحو إعادة التوازن للحياة الإنسانية من خلال العودة إلى الأصول والقيم التي تتوافق مع الطبيعة البشرية.
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <button className="btn-primary text-xl px-10 py-4 shadow-green-900/50">
                            اكتشف المزيد
                        </button>
                        <button className="px-10 py-4 rounded-full border-2 border-cream-100/30 text-cream-100 hover:bg-cream-100 hover:text-brown-900 transition-all duration-300 font-bold text-lg">
                            شاهد الفيديو
                        </button>
                    </div>
                </div>
            </div>

            {/* Animated Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
                <a href="#summary" className="flex flex-col items-center gap-2 text-cream-200/60 hover:text-cream-100 transition-colors">
                    <span className="text-sm">اكتشف المزيد</span>
                    <ArrowDown size={24} />
                </a>
            </div>

            {/* Floating Leaf Decoration */}
            <div className="absolute bottom-20 right-[10%] opacity-20 animate-float hidden md:block">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-green-300">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z"/>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
