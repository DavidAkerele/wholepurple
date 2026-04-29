"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Where do you source your produce from?",
      answer: "We partner directly with local, ethical farmers who prioritize clean, chemical-free agriculture. We only source products that meet our high standards of freshness and sustainability."
    },
    {
      question: "Do you offer next-day delivery?",
      answer: "Yes, we offer next-day delivery on all orders placed before 4:00 PM. Certain specialized items or bulk orders might take an additional day to prepare."
    },
    {
      question: "Are your marinated proteins frozen?",
      answer: "Our marinated proteins are prepared fresh and blast-chilled immediately to preserve flavor and safety. They are delivered to you perfectly chilled and ready to cook or freeze."
    },
    {
      question: "What makes your stir-fry builders different?",
      answer: "Our stir-fry builders take away the stress of meal prep. You simply pick a base, add your vegetables, and choose your protein. We wash, chop, and pack them so you can literally just 'stir-fry' when you get home!"
    },
    {
      question: "What happens if I receive a damaged product?",
      answer: "We have a 100% freshness guarantee. If any item arrives damaged or below your expectations, simply take a picture, send it to our support team within 2 hours of delivery, and we will issue a replacement or refund immediately."
    }
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      <section className="bg-[var(--section-bg)] py-20 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary-purple)] mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Everything you need to know about our sourcing, delivery, and products.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
            >
              <button 
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-lg text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[var(--primary-purple)] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
