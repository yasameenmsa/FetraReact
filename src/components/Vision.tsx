import React from 'react';

const Vision = () => {
    return (
        <section className="section-padding relative overflow-hidden bg-gradient-to-br from-green-500/10 to-blue-500/10">
            {/* Background Waves */}
            <div className="absolute inset-0 z-0 opacity-20">
                 <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 50 Q 25 30 50 50 T 100 50 V 100 H 0 Z" fill="#9ABF8B" />
                    <path d="M0 60 Q 25 40 50 60 T 100 60 V 100 H 0 Z" fill="#5A7D4C" className="opacity-50" />
                </svg>
            </div>

            <div className="container-custom relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2 animate-on-scroll">
                    <h2 className="text-4xl md:text-5xl font-bold text-brown-900 mb-8 font-cairo text-center md:text-right">
                        رؤية المشروع
                    </h2>
                    <div className="relative pl-6 border-r-4 border-green-600 pr-6 py-4 bg-white/60 backdrop-blur-sm rounded-l-2xl shadow-sm">
                        <p className="text-2xl font-medium leading-loose text-brown-800">
                            "بناء جيلٍ يعيش فطرته في فهمه لذاته، وفي أسرته، وتربيته، وسلوكه، ويقدّم نموذجًا حضاريًا بديلاً في زمن التيه والاغتراب."
                        </p>
                    </div>
                    <p className="mt-8 text-lg text-gray-700 leading-relaxed max-w-2xl">
                        يهدف مشروع فطرة إلى إعادة الإنسان إلى جذوره الطبيعية وتكوينه الأصيل، بعيداً عن التشويه الذي فرضته الحضارة الحديثة على الفطرة الإنسانية.
                    </p>
                </div>
                
                 <div className="w-full md:w-1/2 animate-on-scroll delay-200">
                    {/* Placeholder for visual element or just keeping text focus as per preview 12 which is text heavy */}
                    <div className="h-64 w-full bg-gradient-to-tr from-green-200 to-blue-200 rounded-3xl blur-2xl opacity-40 absolute transform rotate-12"></div>
                </div>
            </div>
        </section>
    );
};

export default Vision;
