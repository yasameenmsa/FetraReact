import React from 'react';
import { Compass, Target, User } from 'lucide-react';

const AmbassadorIntro = () => {
    return (
        <section className="section-padding bg-white relative">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                   
                   {/* Title Area */}
                    <div className="flex items-center gap-4 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-bold text-brown-900 font-cairo">
                            سفير الفطرة
                        </h2>
                        <div className="w-16 h-16 relative">
                             {/* Decorative Compass Icon */}
                             <Compass className="w-full h-full text-yellow-500 animate-spin-slow" />
                        </div>
                    </div>

                    
                    {/* Sub-header with Icons */}
                    <div className="flex items-center gap-4 animate-on-scroll delay-100">
                         <h3 className="text-2xl font-bold text-brown-800">من هو سفير الفطرة؟</h3>
                         <div className="flex -space-x-4 space-x-reverse">
                             <div className="w-10 h-10 bg-yellow-100 rounded-full border-2 border-white flex items-center justify-center">
                                <User size={20} className="text-yellow-600" />
                             </div>
                             <div className="w-10 h-10 bg-purple-100 rounded-full border-2 border-white flex items-center justify-center">
                                <User size={20} className="text-purple-600" />
                             </div>
                         </div>
                    </div>
                </div>

                {/* Definition Card */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12 border border-gray-100 shadow-sm animate-on-scroll delay-200">
                    <p className="text-xl md:text-2xl leading-loose text-gray-700 text-center md:text-right font-medium">
                        هو شاب أو شابة يحمل رسالة "فطرة" في نفسه، ويجسّدها في حياته، ويمثلها في محيطه، ويساهم في نشرها من خلال القدوة، والكلمة، والمبادرة. هو الطليعة الفكرية والوجدانية لهذا المشروع.
                    </p>
                </div>

                {/* Mission Highlight */}
                <div className="flex flex-col md:flex-row items-center gap-6 animate-on-scroll delay-300">
                    <div className="flex items-center gap-3">
                        <Target className="text-red-500 animate-pulse" size={32} />
                        <h3 className="text-2xl font-bold text-brown-900">مهمة السفير:</h3>
                    </div>
                    
                    <div className="flex-1 bg-white p-6 rounded-2xl shadow-md border-r-4 border-red-500">
                         <p className="text-xl text-gray-700">
                              تمثيل الفكرة بسلوك راقٍ وأسلوب متزن، ونشر الفكر في محيطه
                         </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AmbassadorIntro;
