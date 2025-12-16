import React from 'react';
import { Megaphone, Target, Eye } from 'lucide-react';

const MissionVision = () => {
    return (
        <section id="mission" className="section-padding bg-white relative overflow-hidden">
            <div className="container-custom">
                {/* Mission Section */}
                <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
                    <div className="w-full lg:w-1/2 animate-on-scroll">
                        <div className="relative">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-100 rounded-full -z-10 blur-xl"></div>
                            <div className="flex items-center gap-4 mb-6">
                                <Megaphone className="text-red-500 transform -rotate-12" size={40} />
                                <h2 className="text-4xl md:text-5xl font-bold text-brown-900">رسالة المشروع</h2>
                            </div>
                            
                            <div className="relative pl-8 border-r-4 border-green-600 pr-6 py-2">
                                <p className="text-xl md:text-2xl font-medium leading-loose text-brown-800">
                                    "إحياء الفطرة في الإنسان والأسرة والمجتمع، وتحريرهم من التشكيل الصناعي الذي فرضته الحداثة والعولمة، وتوجيههم نحو سنن الله في الخلق والتكوين، بما يحقق الاكتمال النفسي والاجتماعي والروحي."
                                </p>
                            </div>
                            
                            <p className="mt-8 text-lg text-gray-600 leading-relaxed">
                                تسعى رسالة مشروع فطرة إلى إعادة التوازن للحياة الإنسانية من خلال العودة إلى الأصول والقيم التي تتوافق مع الطبيعة البشرية كما خلقها الله.
                            </p>
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-1/2 animate-on-scroll delay-200">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                            <img 
                                src="/preview (4).webp" 
                                alt="Mission Illustration" 
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Vision/Goals Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {[
                        { icon: <Eye size={32} />, title: "رؤيتنا", desc: "مجتمع متصالح مع فطرته", color: "bg-blue-100 text-blue-600" },
                        { icon: <Target size={32} />, title: "مهمتنا", desc: "بناء الوعي وتوفير البدائل", color: "bg-green-100 text-green-600" },
                        { icon: <Megaphone size={32} />, title: "صوتنا", desc: "الدعوة بالحكمة والموعظة", color: "bg-orange-100 text-orange-600" }
                    ].map((item, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300 animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MissionVision;
