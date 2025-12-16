import React from 'react';
import { BarChart3, Shield, Scale, Globe } from 'lucide-react';

const Goals = () => {
    const goals = [
        {
            id: 1,
            title: "بناء وعي فطري",
            description: "يعيد الإنسان إلى ذاته وفطرته",
            icon: <BarChart3 className="w-8 h-8" />,
            color: "text-green-600",
            bg: "bg-green-100"
        },
        {
            id: 2,
            title: "مقاومة التشويش المفاهيمي",
            description: "حول الأسرة والهوية",
            icon: <Shield className="w-8 h-8" />,
            color: "text-blue-600",
            bg: "bg-blue-100"
        },
        {
            id: 3,
            title: "تحقيق مبدأ الاستخلاف",
            description: "من خلال إعادة الرجل والمرأة إلى دورهما الطبيعي",
            icon: <Scale className="w-8 h-8" />,
            color: "text-teal-600",
            bg: "bg-teal-100"
        },
        {
            id: 4,
            title: "مقاومة العولمة والتغريب الاجتماعي",
            description: "من خلال بناء مجتمع فطري يعيش وفق مبادئ الفطرة",
            icon: <Globe className="w-8 h-8" />,
            color: "text-indigo-600",
            bg: "bg-indigo-100"
        }
    ];

    return (
        <section id="goals" className="section-padding bg-cream-50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="container-custom">
                <div className="flex flex-col md:flex-row items-start gap-16">
                    {/* Left Side - Image/Illustration - Hidden on mobile or replaced with chart */}
                    <div className="hidden md:block w-1/2 sticky top-24 animate-on-scroll">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <h3 className="text-3xl font-bold mb-8 text-brown-800">أهداف المشروع</h3>
                            <div className="flex items-end justify-between gap-4 h-64 px-4 pb-4">
                                {[30, 45, 60, 40, 75, 50, 80].map((h, i) => (
                                    <div 
                                        key={i} 
                                        className="w-full bg-green-200 rounded-t-lg relative group transition-all duration-500 hover:bg-green-400"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-green-700">
                                            {h}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-4 w-full bg-gray-100 rounded-full mt-2"></div>
                             {/* Decorative plant */}
                             <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-20">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="text-green-800"><path d="M12 2L14 8L20 10L14 14L12 20L10 14L4 10L10 8L12 2Z" /></svg>
                             </div>
                        </div>
                    </div>

                    {/* Right Side - Goals List */}
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-4 mb-12 animate-on-scroll">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
                                <BarChart3 className="text-brown-600" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-brown-900">أهداف المشروع</h2>
                        </div>

                        <div className="space-y-8 relative">
                            {/* Connector Line */}
                            <div className="absolute right-8 top-8 bottom-8 w-0.5 bg-gray-200 hidden md:block"></div>

                            {goals.map((goal, index) => (
                                <div 
                                    key={goal.id} 
                                    className="relative flex gap-6 md:pr-16 animate-on-scroll group"
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    {/* Number Badge */}
                                    <div className="hidden md:flex absolute right-0 top-0 w-16 h-16 bg-white border border-gray-100 rounded-2xl shadow-sm items-center justify-center font-bold text-2xl text-gray-300 z-10 group-hover:bg-green-50 group-hover:text-green-600 transition-colors duration-300">
                                        {goal.id}
                                    </div>

                                    {/* Content Card */}
                                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex-1 group-hover:-translate-x-2">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`p-3 rounded-xl ${goal.bg} ${goal.color}`}>
                                                {goal.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold text-brown-800 pt-1">{goal.title}</h3>
                                        </div>
                                        <p className="text-lg text-gray-600 leading-relaxed mr-16 md:mr-0 pl-4 border-r-2 border-gray-100 md:border-0 md:pl-0">
                                            {goal.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Goals;
