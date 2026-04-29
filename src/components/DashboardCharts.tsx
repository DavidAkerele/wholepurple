"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

export function SalesChart({ data, title }: { data: any[], title: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary-purple)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary-purple)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={(value) => `₦${value/1000}k`} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
              formatter={(value: any) => [`₦${Number(value || 0).toLocaleString()}`, 'Sales']}
            />
            <Area type="monotone" dataKey="sales" stroke="var(--primary-purple)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function OrderStatusChart({ data, title }: { data: any[], title: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barSize={30}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              cursor={{ fill: 'rgba(0,0,0,0.02)' }}
            />
            <Bar dataKey="value" fill="var(--accent-green)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
