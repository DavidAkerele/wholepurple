"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Phone, Mail, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function CustomerService() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success("Thank you! We'll get back to you shortly.");
    setFormData({ name: "", email: "", message: "" });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      {/* Mini Tab / Panel */}
      {isOpen && (
        <div 
          className="w-[350px] max-w-[90vw] bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col pointer-events-auto animate-slide-up origin-bottom-right"
          style={{ animationDuration: '0.4s' }}
        >
          {/* Header */}
          <div className="bg-[var(--primary-purple)] p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Customer Support</h3>
                <p className="text-xs text-white/80">Typically replies in 2-4 hours</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col gap-6 max-h-[500px] overflow-y-auto custom-scrollbar">
            {/* Quick Actions */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quick Connect</label>
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="https://wa.me/2349163191000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-2xl hover:bg-green-100 transition-colors text-sm font-bold border border-green-100"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
                <a 
                  href="tel:+2349163191000" 
                  className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-2xl hover:bg-blue-100 transition-colors text-sm font-bold border border-blue-100"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Send a Message</label>
              
              <div className="flex flex-col gap-1">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:bg-white transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <input 
                  type="email" 
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:bg-white transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <textarea 
                  placeholder="How can we help?"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:bg-white transition-all text-sm resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[var(--primary-purple)] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Footer Info */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              <Mail className="w-3 h-3" />
              hello@wholepurple.com
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          pointer-events-auto
          w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90
          ${isOpen 
            ? 'bg-white text-[var(--primary-purple)] rotate-90 scale-0 opacity-0' 
            : 'bg-[var(--primary-purple)] text-white hover:scale-110'
          }
        `}
      >
        <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Close Button replacement when open (if needed, but usually header handles it) */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="pointer-events-auto w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-90 transition-all border border-gray-100"
        >
          <X className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
