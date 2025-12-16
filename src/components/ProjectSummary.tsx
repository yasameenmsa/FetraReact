import React, { useEffect, useRef } from 'react';
import { Lightbulb } from 'lucide-react';

const ProjectSummary = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="summary" className="section-padding bg-cream-100 relative overflow-hidden">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6 animate-on-scroll">
                        <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center shadow-inner">
                            <Lightbulb size={32} className="text-brown-600" />
                        </div>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-brown-900 animate-on-scroll delay-100">
                        المشروع في <span className="text-green-700 relative">
                            جملة
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-green-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                            </svg>
                        </span>
                    </h2>
                    
                    <div className="relative animate-on-scroll delay-200">
                        <div className="absolute -top-10 -right-10 w-24 h-24 text-brown-200 opacity-20">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01699C7.91243 16 7.01699 16.8954 7.01699 18L7.01699 21H2.01699V4H10.017V2H14.017V4H22.017V21H17.017V17H19.017V6H5.01699V19H9.01699V21H14.017Z" /></svg>
                        </div>
                        
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-cream-300 relative z-10">
                            <p className="text-xl md:text-3xl font-medium leading-relaxed text-brown-800">
                                "فطرة" هو مشروع لتحرير الإنسان من التشكيل القسري، وردّه إلى نفسه كما خُلق: عبدًا لله، زوجًا أو زوجة، أمًّا أو أبًا، منسجمًا مع طبيعته، مرتبطًا بسنن الكون، قائمًا برسالته في الأرض.
                            </p>
                            
                            <div className="mt-10 flex flex-wrap justify-center gap-4">
                                <button className="btn-primary">
                                    انضم إلى مشروع فطرة
                                </button>
                                <button className="btn-secondary">
                                    تعرف على المزيد
                                </button>
                            </div>
                        </div>
                        
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-100 rounded-full -z-0 blur-xl opacity-60"></div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-brown-100 rounded-full -z-0 blur-xl opacity-60"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectSummary;
