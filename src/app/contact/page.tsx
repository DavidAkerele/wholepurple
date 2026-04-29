import { Mail, Phone, MapPin, Send, Camera, Share2, Globe } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  return (
    <div className="flex flex-col bg-[#FAF7F2] min-h-screen pb-24">
      <PageHeader 
        tag="Get in Touch"
        title="Contact"
        subtitle="Have a question about our harvest? Our team is here to help you bring fresh goodness to your home."
        bgImage="/images/scraped/ella-olsson-I-uYa5P-EgM-unsplash.jpg"
      />

      <section className="container mx-auto px-4 md:px-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 max-w-[1700px] mx-auto">
          
          {/* Contact Info Side */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-6">Let's Talk <br /> <span className="text-[var(--primary-purple)]">Harvest</span></h2>
              <p className="text-gray-800 font-medium leading-relaxed max-w-sm">
                Our support team is available Monday to Saturday to assist you with orders, subscriptions, or partnership inquiries.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  title: "Email Support",
                  value: "hello@wholepurple.com",
                  color: "bg-purple-50 text-[var(--primary-purple)]"
                },
                {
                  icon: <Phone className="w-5 h-5" />,
                  title: "Phone",
                  value: "+234 123 456 7890",
                  color: "bg-green-50 text-[var(--accent-green)]"
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  title: "Headquarters",
                  value: "123 Fresh Produce Lane, Lagos, Nigeria",
                  color: "bg-red-50 text-[var(--accent-red)]"
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-purple-900/5 group hover:border-[var(--primary-purple)] transition-all">
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">{item.title}</h3>
                    <p className="text-lg font-bold text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-6">Follow the Journey</h4>
              <div className="flex gap-4">
                {[Camera, Share2, Globe].map((Icon, idx) => (
                  <div key={idx} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-600 hover:text-[var(--primary-purple)] hover:border-[var(--primary-purple)] border border-gray-100 cursor-pointer transition-all shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[40px] p-10 md:p-14 border border-gray-100 shadow-2xl shadow-purple-900/5">
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-8">Send us a Message</h3>
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-1">First Name</label>
                    <input type="text" className="w-full bg-gray-50 text-gray-900 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[var(--primary-purple)]/20 outline-none transition-all" placeholder="John" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-1">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 text-gray-900 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[var(--primary-purple)]/20 outline-none transition-all" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-1">Email Address</label>
                  <input type="email" className="w-full bg-gray-50 text-gray-900 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[var(--primary-purple)]/20 outline-none transition-all" placeholder="john@example.com" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-1">Subject</label>
                  <select className="w-full bg-gray-50 text-gray-900 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[var(--primary-purple)]/20 outline-none transition-all appearance-none">
                    <option>Order Inquiry</option>
                    <option>Product Question</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-1">Message</label>
                  <textarea rows={5} className="w-full bg-gray-50 text-gray-900 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[var(--primary-purple)]/20 outline-none transition-all resize-none" placeholder="How can we help?"></textarea>
                </div>

                <button type="button" className="flex items-center justify-center gap-3 bg-[var(--primary-purple)] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl transition-all mt-4 group">
                  Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Map Section */}
      <section className="container mx-auto px-4 md:px-8 mt-24">
        <div className="rounded-[50px] overflow-hidden border-8 border-white shadow-2xl shadow-purple-900/10 h-[500px] relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126844.06348611186!2d3.33624!3d6.524379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9d87a7da591c0a!2sLagos!5e0!3m2!1sen!2sng!4v1714345000000!5m2!1sen!2sng" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Whole Purple Headquarters"
            className="filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
          ></iframe>
          
          <div className="absolute top-10 left-10 z-10 bg-white/90 backdrop-blur-md p-8 rounded-[40px] border border-gray-100 shadow-2xl max-w-xs hidden md:block">
            <div className="w-12 h-12 bg-[var(--primary-purple)] rounded-2xl flex items-center justify-center text-white mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2">Our Store</h4>
            <p className="text-gray-800 font-medium text-sm leading-relaxed mb-6">
              123 Fresh Produce Lane, Victoria Island, Lagos, Nigeria.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--accent-green)]">
               <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse"></div>
               Open for pickup
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
