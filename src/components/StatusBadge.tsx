import { CheckCircle2, Clock, Truck, XCircle, ShieldCheck } from "lucide-react";

export default function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { color: string, icon: any, label: string }> = {
    PENDING: { color: 'bg-orange-50 text-orange-600 border-orange-100', icon: Clock, label: 'Pending' },
    PAID: { color: 'bg-blue-50 text-blue-600 border-blue-100', icon: ShieldCheck, label: 'Paid' },
    SHIPPED: { color: 'bg-purple-50 text-purple-600 border-purple-100', icon: Truck, label: 'Shipped' },
    DELIVERED: { color: 'bg-green-50 text-green-600 border-green-100', icon: CheckCircle2, label: 'Delivered' },
    CANCELLED: { color: 'bg-red-50 text-red-600 border-red-100', icon: XCircle, label: 'Cancelled' },
  };

  const { color, icon: Icon, label } = config[status] || config.PENDING;

  return (
    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border w-fit ${color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}
