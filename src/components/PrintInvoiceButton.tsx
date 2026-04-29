"use client";
import { Printer } from "lucide-react";

export default function PrintInvoiceButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="flex items-center gap-2 px-6 py-3 bg-[var(--primary-purple)] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-purple-900/10 hover:scale-105 active:scale-95 transition-all"
    >
      <Printer className="w-4 h-4" />
      Print / Download PDF
    </button>
  );
}
