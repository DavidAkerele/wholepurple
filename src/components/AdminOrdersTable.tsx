"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckSquare, Square, Truck, CheckCircle2, XCircle, Clock, ShieldCheck, ChevronDown } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { bulkUpdateOrderStatus } from "@/app/actions/order";
import toast from "react-hot-toast";

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: Date | string;
  user: {
    name: string | null;
    email: string | null;
  };
}

export default function AdminOrdersTable({ initialOrders }: { initialOrders: any[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(initialOrders);

  const toggleSelectAll = () => {
    if (selectedIds.length === orders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(orders.map(o => o.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkUpdate = async (status: string) => {
    if (selectedIds.length === 0) return;
    
    setLoading(true);
    const result = await bulkUpdateOrderStatus(selectedIds, status);
    
    if (result.success) {
      toast.success(`Successfully updated ${selectedIds.length} orders to ${status}`);
      // Update local state for immediate feedback
      setOrders(orders.map(o => 
        selectedIds.includes(o.id) ? { ...o, status } : o
      ));
      setSelectedIds([]);
    } else {
      toast.error(result.error || "Failed to update orders");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Bulk Actions Toolbar */}
      <div className={`flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-gray-100 transition-all ${selectedIds.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-50 pointer-events-none'}`}>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-gray-900 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full text-[var(--primary-purple)]">
            {selectedIds.length} Selected
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            disabled={loading}
            onClick={() => handleBulkUpdate('SHIPPED')}
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 text-[var(--primary-purple)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--primary-purple)] hover:text-white transition-all disabled:opacity-50"
          >
            <Truck className="w-3.5 h-3.5" /> Mark Shipped
          </button>
          <button 
            disabled={loading}
            onClick={() => handleBulkUpdate('DELIVERED')}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all disabled:opacity-50"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Mark Delivered
          </button>
          <button 
            disabled={loading}
            onClick={() => handleBulkUpdate('CANCELLED')}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
          >
            <XCircle className="w-3.5 h-3.5" /> Cancel Selected
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-900 uppercase font-black text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4 w-10">
                  <button onClick={toggleSelectAll} className="text-gray-400 hover:text-[var(--primary-purple)] transition-colors">
                    {selectedIds.length === orders.length && orders.length > 0 ? <CheckSquare className="w-5 h-5 text-[var(--primary-purple)]" /> : <Square className="w-5 h-5" />}
                  </button>
                </th>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map(order => (
                <tr key={order.id} className={`hover:bg-gray-50/80 transition-colors group ${selectedIds.includes(order.id) ? 'bg-purple-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleSelect(order.id)} className="text-gray-400 hover:text-[var(--primary-purple)] transition-colors">
                      {selectedIds.includes(order.id) ? <CheckSquare className="w-5 h-5 text-[var(--primary-purple)]" /> : <Square className="w-5 h-5" />}
                    </button>
                  </td>
                  <td className="px-6 py-4 font-mono text-[10px] font-bold text-gray-500">
                    <Link href={`/dashboard/admin/orders/${order.id}`} className="hover:text-[var(--primary-purple)] transition-colors">
                      #{order.id.slice(-8).toUpperCase()}
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    <div className="flex flex-col">
                      <span>{order.user.name || "Guest User"}</span>
                      <span className="text-[10px] font-medium text-gray-500 lowercase">{order.user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black text-[var(--primary-purple)]">
                    ₦{order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/dashboard/admin/orders/${order.id}`} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all hover:bg-[var(--primary-purple)]">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
