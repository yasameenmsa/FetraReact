import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

const Ambassadors = () => {
    const conditions = [
        "إيمان عميق بمبادئ المشروع ورسالته",
        "روح مبادرة ووعي مجتمعي",
        "سلوك خلقي منسجم مع قيم الإسلام والفطرة",
        "استعداد للمشاركة التطوعية في الفعاليات والتكوين",
        "قدرة على التأثير الإيجابي بالحكمة والرحمة"
    ];

    return (
        <section className="section-padding bg-white relative">
            <div className="container-custom">
                <div className="flex items-center justify-center gap-4 mb-16 animate-on-scroll">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                         <ShieldCheck className="text-green-600" size={40} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-brown-900 font-cairo">
                        شروط سفير الفطرة
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {conditions.map((condition, index) => (
                        <div 
                            key={index} 
                            className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-green-50 hover:border-green-200 transition-all duration-300 animate-on-scroll group"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <CheckCircle2 className="text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={28} />
                            <span className="text-xl font-medium text-brown-800">{condition}</span>
                        </div>
                    ))}
                    
                    {/* Placeholder for visual balance if odd number */}
                    <a href="https://www.linkedin.com/in/yasmin-msa/" target="_blank" className="hidden md:flex items-center justify-center p-6 rounded-2xl bg-green-600 text-white shadow-lg animate-on-scroll delay-500 hover:bg-green-700 transition-colors cursor-pointer">
                        <span className="text-xl font-bold">سجل الآن كسفير</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Ambassadors;
