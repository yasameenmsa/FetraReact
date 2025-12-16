import React from 'react';
import { ShoppingCart, PenTool, Scale } from 'lucide-react';

const Lifestyle = () => {
    return (
        <section className="section-padding bg-white overflow-hidden">
            <div className="container-custom text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-brown-900 mb-6 font-cairo animate-on-scroll">
                    نمط العيش الفطري
                </h2>
                <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto animate-on-scroll delay-100">
                    نمط العيش الفطري: مقاومة العولمة في المأكل والملبس ونمط العيش، عبر العودة إلى البساطة واللباس الساتر، والغذاء الحقيقي غير الصناعي
                </p>

                <div className="relative w-full max-w-3xl mx-auto aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center animate-on-scroll delay-200">
                    
                    {/* Central Circle */}
                    <div className="absolute w-40 h-40 bg-white rounded-full z-20 flex items-center justify-center shadow-inner">
                        <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center">
                             <img src="/logo.webp" alt="Logo" className="w-16 opacity-50" />
                        </div>
                    </div>

                    {/* Circular Segments - Visual Representation using CSS Grid/Flex for simplicity over SVG for now, or simplified layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        
                        {/* Segment 1 */}
                        <div className="flex flex-col items-center gap-6 group">
                            <div className="w-48 h-48 rounded-full bg-green-100 border-4 border-white shadow-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:bg-green-200">
                                <Scale className="text-green-700 w-16 h-16" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-brown-800 mb-2">العيش البسيط المتزن</h3>
                                <p className="text-gray-500">والاعتدال في حاجات الجسد والروح</p>
                            </div>
                        </div>

                         {/* Segment 2 */}
                         <div className="flex flex-col items-center gap-6 group md:mt-32">
                             <div className="w-48 h-48 rounded-full bg-blue-100 border-4 border-white shadow-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:bg-blue-200">
                                <ShoppingCart className="text-blue-700 w-16 h-16" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-brown-800 mb-2">تقليل التبعية</h3>
                                <p className="text-gray-500">للأنماط الاستهلاكية الغربية</p>
                            </div>
                        </div>

                         {/* Segment 3 */}
                         <div className="flex flex-col items-center gap-6 group">
                            <div className="w-48 h-48 rounded-full bg-orange-100 border-4 border-white shadow-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:bg-orange-200">
                                <PenTool className="text-orange-700 w-16 h-16" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-brown-800 mb-2">تعزيز فنون الحياة اليدوية</h3>
                                <p className="text-gray-500">والارتباط بالأرض والطبيعة</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Lifestyle;
