"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899', '#6366F1'];

export function SalesChart({ data, title }: { data: any[], title: string }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-black text-gray-900 mb-8 tracking-tight">{title}</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#4B5563', fontWeight: 600 }} 
              dy={15} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#4B5563', fontWeight: 600 }} 
              tickFormatter={(value) => `₦${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
              width={60}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '24px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                padding: '12px 16px',
                fontSize: '12px',
                fontWeight: '900'
              }}
              cursor={{ stroke: '#8B5CF6', strokeWidth: 1, strokeDasharray: '4 4' }}
              formatter={(value: any) => [`₦${Number(value || 0).toLocaleString()}`, 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#8B5CF6" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorSales)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function OrderStatusChart({ data, title }: { data: any[], title: string }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 shadow-sm">
      <h2 className="text-xl font-black text-gray-900 mb-8 tracking-tight">{title}</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 40 }} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#4B5563', fontWeight: 600 }} 
              dy={15} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#4B5563', fontWeight: 600 }} 
              width={30}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '20px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                fontSize: '12px',
                fontWeight: '900'
              }}
              cursor={{ fill: 'rgba(0,0,0,0.02)' }}
            />
            <Bar dataKey="value" fill="#10B981" radius={[10, 10, 0, 0]} animationDuration={1500} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CategoryDistributionChart({ data, title }: { data: any[], title: string }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 shadow-sm">
      <h2 className="text-xl font-black text-gray-900 mb-8 tracking-tight">{title}</h2>
      <div className="h-[300px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                borderRadius: '20px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                fontSize: '12px',
                fontWeight: '900'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              align="center" 
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 'bold' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
