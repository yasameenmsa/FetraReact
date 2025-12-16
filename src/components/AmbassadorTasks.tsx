import React from 'react';

const AmbassadorTasks = () => {
    const tasks = [
        {
            title: "الدعوة لفطرة الله",
            desc: "في المجالس، والأنشطة، والمنصات",
            color: "bg-green-100"
        },
        {
            title: "تنظيم أنشطة محلية",
            desc: "تعرّف بالمشروع وقيمه",
            color: "bg-green-100"
        },
        {
            title: "توجيه وتكوين سفراء جدد",
            desc: "عبر انتقاء شباب قادر على حمل رسالة المشروع",
            color: "bg-green-100"
        },
        {
            title: "تقديم أفكار ومقترحات",
            desc: "تطويرية لفريق المشروع",
            color: "bg-green-100"
        },
        {
            title: "التواصل مع المبادرات الشبيهة",
            desc: "للتعاون والتكامل",
            color: "bg-green-100"
        }
    ];

    return (
        <section className="section-padding bg-white relative overflow-hidden">
            <div className="container-custom">
                <h2 className="text-4xl md:text-5xl font-bold text-brown-900 mb-16 font-cairo text-center animate-on-scroll">
                    مهام سفير الفطرة
                </h2>

                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute top-0 bottom-0 right-8 w-1 bg-green-100 rounded-full hidden md:block"></div>

                    <div className="space-y-12">
                        {tasks.map((task, index) => (
                            <div 
                                key={index} 
                                className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:pr-16 animate-on-scroll group"
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {/* Marker */}
                                <div className="hidden md:block absolute right-6 w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-md z-10 group-hover:scale-125 transition-transform duration-300"></div>
                                
                                {/* Vertical Accent Bar for Content */}
                                <div className="w-2 md:w-2 h-16 bg-green-200 rounded-full flex-shrink-0 group-hover:bg-green-500 transition-colors duration-300"></div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-brown-800 mb-2 group-hover:text-green-700 transition-colors">
                                        {task.title}
                                    </h3>
                                    <p className="text-lg text-gray-500">
                                        {task.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AmbassadorTasks;
