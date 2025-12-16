import React from 'react';

const Family = () => {
    return (
        <section className="section-padding bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
             {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>


            <div className="container-custom flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-bold text-brown-900 mb-16 font-cairo text-center animate-on-scroll">
                    الأسرة وفق الفطرة
                </h2>

                <div className="grid grid-cols-1 gap-8 max-w-4xl w-full">
                     {/* Item 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 flex items-center gap-6 animate-on-scroll group hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                             <div className="w-6 h-6 border-4 border-blue-500 rounded-md"></div>
                        </div>
                        <p className="text-xl md:text-2xl text-brown-800 font-medium">
                            دعم نموذج الزواج الطبيعي بين الذكر والأنثى كما أراد الخالق
                        </p>
                    </div>

                      {/* Item 2 */}
                      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 flex items-center gap-6 animate-on-scroll delay-100 group hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                             <div className="w-6 h-6 border-4 border-blue-500 rounded-md"></div>
                        </div>
                         <div className="flex flex-col">
                            <p className="text-xl md:text-2xl text-brown-800 font-medium">
                                 إعادة المرأة إلى دورها الطبيعي في التربية والرعاية والسكن
                            </p>
                            <span className="text-gray-500 mt-1">وتقدير هذا الدور كبعد حضاري وليس وظيفة هامشية</span>
                         </div>
                    </div>

                      {/* Item 3 */}
                      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 flex items-center gap-6 animate-on-scroll delay-200 group hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                             <div className="w-6 h-6 border-4 border-blue-500 rounded-md"></div>
                        </div>
                        <p className="text-xl md:text-2xl text-brown-800 font-medium">
                            حماية الطفل من الانفصال المبكر عن والديه بفعل أنظمة مفروضة
                        </p>
                    </div>
                </div>
                 
                 {/* Side Note / Additional Text from Preview 15 */}
                 <div className="mt-16 bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-gray-100 max-w-4xl animate-on-scroll delay-300">
                    <p className="text-lg text-brown-800 leading-relaxed text-center">
                    الأسرة وفق الفطرة: ترسيخ القوامة التكاملية في الزواج، حيث يتحمل الرجل القيادة بالرعاية والمسؤولية، وتؤدي المرأة دورها الطبيعي في السكن والعطف وبناء الاستقرار الداخلي، في انسجام وتكامل لا صراع.
                    </p>
                 </div>
            </div>
        </section>
    );
};

export default Family;
