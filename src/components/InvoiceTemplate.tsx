import { Package } from "lucide-react";
import Image from "next/image";

export default function InvoiceTemplate({ order }: { order: any }) {
  return (
    <div id="invoice-template" className="hidden print:block p-10 bg-white text-black font-sans w-full max-w-[800px] mx-auto">
      {/* Invoice Header */}
      <div className="flex justify-between items-start mb-12 border-b-2 border-black pb-8">
        <div>
          <Image src="/images/scraped/cropped-wholepurplee-removebg-preview.png" alt="Whole Purple" width={150} height={50} className="mb-4" />
          <p className="text-sm font-bold">WHOLE PURPLE LTD</p>
          <p className="text-xs text-gray-600">Fresh Harvests & Organic Delights</p>
          <p className="text-xs text-gray-600">Lagos, Nigeria</p>
        </div>
        <div className="text-right">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Invoice</h1>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Order #{order.id.slice(-8).toUpperCase()}</p>
          <p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Parties */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Bill To:</h4>
          <p className="font-black text-lg uppercase">{order.user.name || "Guest Customer"}</p>
          <p className="text-sm text-gray-600 mt-1">{order.user.email}</p>
          <p className="text-sm text-gray-600 mt-2">{order.address}</p>
          <p className="text-sm text-gray-600">{order.phone}</p>
        </div>
        <div className="text-right">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Payment Status:</h4>
          <p className="text-lg font-black uppercase text-green-600">{order.status}</p>
          <p className="text-xs text-gray-500 mt-1">Payment Method: Online (Paystack)</p>
        </div>
      </div>

      {/* Table */}
      <table className="w-full mb-12">
        <thead>
          <tr className="border-b-2 border-black text-[10px] font-black uppercase tracking-widest text-left">
            <th className="py-4">Item Description</th>
            <th className="py-4 text-center">Qty</th>
            <th className="py-4 text-right">Unit Price</th>
            <th className="py-4 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {order.items.map((item: any) => (
            <tr key={item.id} className="text-sm">
              <td className="py-6 pr-4">
                <p className="font-black uppercase tracking-tight">{item.product.name}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Fresh Category Product</p>
              </td>
              <td className="py-6 text-center font-bold">{item.quantity}</td>
              <td className="py-6 text-right font-medium">₦{item.price.toLocaleString()}</td>
              <td className="py-6 text-right font-black">₦{(item.price * item.quantity).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="flex justify-end pt-8 border-t-2 border-black">
        <div className="w-64 flex flex-col gap-3">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
            <span>Subtotal</span>
            <span className="text-black font-black">₦{order.total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
            <span>Delivery Fee</span>
            <span className="text-black font-black">₦0.00</span>
          </div>
          <div className="flex justify-between text-2xl font-black uppercase tracking-tighter mt-4 pt-4 border-t border-gray-100">
            <span>Total</span>
            <span className="text-[var(--primary-purple)]">₦{order.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-10 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">Thank you for choosing Whole Purple</p>
        <p className="text-[9px] font-medium text-gray-400 mt-2 italic">This is a computer-generated invoice. No signature is required.</p>
      </div>
    </div>
  );
}
