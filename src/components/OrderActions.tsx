"use client";
import { useState } from "react";
import { Printer, RefreshCw, XCircle, ChevronDown, CheckCircle2, Clock, Truck, ShieldCheck, Check } from "lucide-react";
import { updateOrderStatus } from "@/app/actions/order";
import toast from "react-hot-toast";

export default function OrderActions({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const statuses = [
    { label: 'Pending', value: 'PENDING', icon: Clock, color: 'text-orange-500' },
    { label: 'Paid', value: 'PAID', icon: ShieldCheck, color: 'text-blue-500' },
    { label: 'Shipped', value: 'SHIPPED', icon: Truck, color: 'text-purple-500' },
    { label: 'Delivered', value: 'DELIVERED', icon: CheckCircle2, color: 'text-green-500' },
    { label: 'Cancelled', value: 'CANCELLED', icon: XCircle, color: 'text-red-500' },
  ];

  const handleUpdateStatus = async (status: string) => {
    setIsUpdating(true);
    try {
      const result = await updateOrderStatus(orderId, status);
      if (result.success) {
        toast.success(`Status updated to ${status}`);
        setShowStatusMenu(false);
      } else {
        toast.error(result.error || "Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Status Update Button */}
      <div className="relative">
        <button 
          onClick={() => setShowStatusMenu(!showStatusMenu)}
          disabled={isUpdating}
          className="w-full bg-white/10 hover:bg-white/20 border border-white/5 py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-between group"
        >
          <span className="flex items-center gap-3">
             <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
             Update Status
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showStatusMenu ? 'rotate-180' : ''}`} />
        </button>

        {showStatusMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowStatusMenu(false)}></div>
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-20 animate-in slide-in-from-bottom-2 duration-200">
               {statuses.map((s) => (
                 <button
                   key={s.value}
                   onClick={() => handleUpdateStatus(s.value)}
                   className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-50 text-gray-900 transition-colors border-b border-gray-50 last:border-0"
                 >
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                    <span className="text-xs font-black uppercase tracking-tight text-gray-900">{s.label}</span>
                    {currentStatus === s.value && <Check className="w-4 h-4 text-green-500 ml-auto" />}
                 </button>
               ))}
            </div>
          </>
        )}
      </div>

      {/* Print Invoice Button */}
      <button 
        onClick={handlePrint}
        className="w-full bg-white/10 hover:bg-white/20 border border-white/5 py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3"
      >
        <Printer className="w-4 h-4" />
        Print Invoice
      </button>

      {/* Cancel Button */}
      <button 
        onClick={() => handleUpdateStatus('CANCELLED')}
        className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/10 text-red-400 py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 mt-4"
      >
        <XCircle className="w-4 h-4" />
        Cancel Order
      </button>
    </div>
  );
}
