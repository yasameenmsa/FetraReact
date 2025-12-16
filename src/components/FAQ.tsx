import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, toggle }) => {
    return (
        <div className="border border-cream-300 rounded-2xl bg-white overflow-hidden mb-4 transition-all duration-300 hover:shadow-md animate-on-scroll">
            <button 
                className="w-full px-6 py-5 text-right flex items-center justify-between gap-4 focus:outline-none"
                onClick={toggle}
            >
                <span className="text-xl font-bold text-brown-800 group-hover:text-green-700 transition-colors">
                    {question}
                </span>
                <ChevronDown 
                    className={`text-green-600 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                    size={24}
                />
            </button>
            <div 
                className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "ما هو الهدف الرئيسي لمشروع فطرة؟",
            answer: "يهدف المشروع إلى إعادة التوازن للحياة الإنسانية من خلال العودة إلى الأصول والقيم التي تتوافق مع الطبيعة البشرية كما خلقها الله، ومقاومة التشوهات التي فرضتها التحولات الاجتماعية المعاصرة."
        },
        {
            question: "كيف يمكنني الانضمام لسفراء الفطرة؟",
            answer: "يمكنك الانضمام من خلال تعبئة استمارة التطوع المتاحة في قسم 'انضم إلينا'، وسيتم التواصل معك لتحديد مسار التدريب المناسب."
        },
        {
            question: "هل البرامج موجهة لفئة عمرية محددة؟",
            answer: "يغطي المشروع جميع الفئات العمرية، مع برامج مخصصة للأطفال (مخيمات فطرة)، والشباب (سفراء الفطرة)، والأسرة (ورش عمل الوالدية)."
        },
        {
            question: "أين تقام أنشطة وفعاليات المشروع؟",
            answer: "تتوزع الأنشطة بين فعاليات حضورية في المراكز الثقافية الشريكة، وفعاليات افتراضية عبر منصاتنا الإلكترونية للوصول لشريحة أوسع."
        }
    ];

    return (
        <section id="faq" className="section-padding bg-cream-50 relative">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-16 animate-on-scroll">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <HelpCircle className="text-green-600" size={32} />
                    </div>
                    <h2 className="text-4xl font-bold text-brown-900 mb-4">الأسئلة الشائعة</h2>
                    <p className="text-gray-600 text-lg">إجابات على استفساراتكم حول المشروع وأهدافه</p>
                </div>

                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem 
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            toggle={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
