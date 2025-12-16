import React from 'react';
import { Home, Brain, Sparkles } from 'lucide-react';

const Education = () => {
    return (
        <section className="section-padding bg-white relative overflow-hidden">
            <div className="container-custom flex flex-col lg:flex-row-reverse items-center gap-16">
                
                {/* Image Side */}
                <div className="w-full lg:w-1/2 animate-on-scroll">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                         <img 
                            src="/preview.webp" 
                            alt="Education according to Fitrah" 
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 text-right">
                    <h2 className="text-4xl md:text-5xl font-bold text-brown-900 mb-4 animate-on-scroll font-cairo">
                        التربية وفق الفطرة
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 animate-on-scroll delay-100">
                        التربية على الفطرة: بدائل تربوية تحترم النمو الطبيعي والعاطفي للطفل
                    </p>

                    <div className="space-y-8">
                        {/* Item 1 */}
                        <div className="flex items-start gap-6 animate-on-scroll delay-200 group">
                            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                                <Home className="text-green-700" size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-brown-800 mb-2">التعليم البديل</h3>
                                <p className="text-gray-600">والترابية الحرة، والمناهج المرنة التي تراعي ميول الطفل.</p>
                            </div>
                        </div>

                         {/* Item 2 */}
                         <div className="flex items-start gap-6 animate-on-scroll delay-300 group">
                            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                                <Brain className="text-green-700" size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-brown-800 mb-2">تنمية شخصية الطفل</h3>
                                <p className="text-gray-600">لا برمجته، وتحفيز التفكر والابداع لا مجرد الحفظ والتلقين.</p>
                            </div>
                        </div>

                         {/* Item 3 */}
                         <div className="flex items-start gap-6 animate-on-scroll delay-400 group">
                             <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                                <Sparkles className="text-green-700" size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-brown-800 mb-2">مراعاة الفروق الفردية</h3>
                                <p className="text-gray-600">وتنوع الذكاءات والقدرات لكل طفل.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
