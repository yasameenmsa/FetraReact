import React from 'react';
import { Mail, Facebook, Twitter, Instagram, ArrowLeft } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-brown-900 text-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
            
            <div className="container-custom relative z-10">
                <div className="bg-green-800/20 backdrop-blur-sm border border-white/10 rounded-3xl p-10 md:p-16 text-center max-w-5xl mx-auto shadow-2xl animate-on-scroll">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-cairo text-cream-100/90" >كن جزءاً من التغيير</h2>
                    <p className="text-xl md:text-2xl text-cream-100/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                        ساهم معنا في نشر الوعي وإعادة التوازن للمجتمع. انضم الآن إلى قائمة المتطوعين أو شارك في برامجنا التدريبية.
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
                        <button className="btn-primary bg-cream-100 text-brown-900 hover:bg-white hover:text-green-800 text-xl px-12">
                            سجل الآن
                            <ArrowLeft className="mr-2" />
                        </button>
                    </div>

                    <div className="h-px w-full bg-white/10 mb-12"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="text-right">
                            <h4 className="text-lg font-bold text-cream-200 mb-2">تواصل معنا</h4>
                            <a href="mailto:info@fitrah.com" className="flex items-center gap-2 hover:text-green-300 transition-colors">
                                <Mail size={18} />
                                <span>info@fitrah.com</span>
                            </a>
                        </div>
                        
                        <div className="flex justify-center gap-6">
                            {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-600 hover:border-green-500 hover:-translate-y-1 transition-all duration-300">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>

                        <div className="text-left font-cairo">
                            <p className="text-cream-200">مشروع فطرة &copy; 2025</p>
                            <p className="text-sm text-white/40">جميع الحقوق محفوظة</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
