import React from 'react';
import { Users, Tent, BookOpen, MessageCircle, Heart, Link as LinkIcon } from 'lucide-react';

const ProgramComponents = () => {
    const programs = [
        {
            title: "سفراء الفطرة",
            desc: "طلائع شبابية تمثل المشروع وتبلّغ رسالته",
            icon: <Users size={24} />,
            color: "bg-blue-50 border-blue-200 text-blue-700"
        },
        {
            title: "نادي فطرة الثقافي",
            desc: "ملتقى المعرفة والحوار والتكوين",
            icon: <BookOpen size={24} />,
            color: "bg-green-50 border-green-200 text-green-700"
        },
        {
            title: "حملات فكرية ومجتمعية",
            desc: "لرد الانحرافات وتثبيت الفطرة",
            icon: <MessageCircle size={24} />,
            color: "bg-purple-50 border-purple-200 text-purple-700"
        },
        {
            title: "مخيمات فطرة",
            desc: "للأطفال واليافعين: بيئات حية سليمة",
            icon: <Tent size={24} />,
            color: "bg-orange-50 border-orange-200 text-orange-700"
        },
        {
            title: "مبادرات معيشية",
            desc: "في اللباس، والطعام، والسكن، والتعليم",
            icon: <Heart size={24} />,
            color: "bg-red-50 border-red-200 text-red-700",
            fullWidth: true
        }
    ];

    return (
        <section id="programs" className="section-padding bg-white relative">
            <div className="container-custom">
                <div className="flex items-center gap-3 mb-16 justify-center animate-on-scroll">
                    <h2 className="text-4xl md:text-5xl font-bold text-brown-900 text-center">مكونات المشروع التطبيقية</h2>
                    <LinkIcon className="text-gray-400 transform -rotate-45" size={40} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {programs.map((program, index) => (
                        <div 
                            key={index} 
                            className={`${program.fullWidth ? 'md:col-span-2' : ''} group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white animate-on-scroll ${program.color.split(' ')[1]}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${program.color.split(' ')[0]}`}></div>
                            
                            <div className="p-8 flex items-center justify-between relative z-10">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-2xl font-bold text-brown-800 group-hover:text-green-800 transition-colors">
                                        {program.title}
                                    </h3>
                                    <p className="text-gray-600 text-lg">
                                        {program.desc}
                                    </p>
                                </div>
                                <div className={`p-4 rounded-full ${program.color.split(' ')[0]} ${program.color.split(' ')[2]} group-hover:scale-110 transition-transform duration-300`}>
                                    {program.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramComponents;
