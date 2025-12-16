import React from 'react';
import { Leaf, Bird } from 'lucide-react';

const FitrahDefinition = () => {
    return (
        <section className="section-padding bg-white overflow-hidden relative">
            <div className="container-custom flex flex-col md:flex-row items-center gap-12">
                
                {/* Content Side */}
                <div className="w-full md:w-1/2 order-2 md:order-1 text-right animate-on-scroll">
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-brown-900 font-cairo">
                            مشروع فطرة
                        </h2>
                         <Bird className="text-gray-300 transform -scale-x-100" size={40} />
                    </div>

                    <h3 className="text-xl md:text-2xl text-brown-800 font-medium mb-8 leading-relaxed">
                        نحو إنسانٍ منسجمٍ مع أصل خلقته، في أسرته وتربيته ونمط حياته
                         <Leaf className="inline-block mr-2 text-green-600 align-middle" size={24} />
                    </h3>

                    <div className="relative pr-6 border-r-4 border-green-500">
                        <p className="text-lg md:text-xl text-gray-700 leading-loose">
                            التعريف العام: "فطرة" هو مشروع حضاري إنساني شامل، يسعى لإعادة الإنسان إلى أصل خلقته كما أرادها الله تعالى: نقيًّا، سويًّا، منسجمًا مع سنن الكون، متصالحًا مع طبيعته، مستقرًّا في أسرته، راشدًا في تربيته، معتدلاً في نمط عيشه، ومتحررًا من التشكيل القسري الذي فرضته الحداثة والعولمة.
                        </p>
                    </div>
                </div>

                {/* Logo Side */}
                <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center animate-on-scroll delay-200">
                     <div className="relative w-64 h-64 md:w-96 md:h-96">
                        <img 
                            src="/logo.webp" 
                            alt="Fitrah Project Logo" 
                            className="w-full h-full object-contain drop-shadow-2xl"
                        />
                         {/* Decorative Elements around logo */}
                         <div className="absolute top-0 right-0 w-full h-full bg-green-100 rounded-full blur-3xl -z-10 opacity-40"></div>
                     </div>
                </div>
            </div>
        </section>
    );
};

export default FitrahDefinition;
