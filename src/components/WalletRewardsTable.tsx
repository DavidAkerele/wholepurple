"use client";

import { useState } from "react";
import { Wallet, Gift, Search, Edit2, X, Check, Loader2 } from "lucide-react";
import { adjustUserWalletAndPoints } from "@/app/actions/wallet-rewards";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  walletBalance: number;
  rewardPoints: number;
  role: string;
}

export default function WalletRewardsTable({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ walletBalance: 0, rewardPoints: 0 });

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ walletBalance: user.walletBalance, rewardPoints: user.rewardPoints });
  };

  const handleSave = async () => {
    if (!editingUser) return;
    setLoading(true);

    const result = await adjustUserWalletAndPoints(editingUser.id, formData);

    if (result.success) {
      toast.success("User account updated successfully");
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
      setEditingUser(null);
    } else {
      toast.error(result.error || "Failed to update user");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] shadow-sm font-medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-xl shadow-purple-900/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-900 uppercase font-black text-[10px] tracking-widest">
              <tr>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Wallet Balance</th>
                <th className="px-8 py-5">Loyalty Points</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{user.name || "N/A"}</span>
                      <span className="text-[10px] font-medium text-gray-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-[var(--accent-green)]" />
                      <span className="font-black text-gray-900 text-base">₦{user.walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-[var(--primary-purple)]" />
                      <span className="font-black text-gray-900 text-base">{user.rewardPoints.toLocaleString()} <span className="text-[10px] opacity-50 uppercase tracking-widest ml-1">Pts</span></span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleEdit(user)}
                      className="p-3 bg-gray-900 text-white rounded-xl hover:bg-[var(--primary-purple)] transition-all group-hover:scale-105"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => !loading && setEditingUser(null)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Adjust Balance</h3>
                  <p className="text-gray-500 font-medium text-xs mt-1">{editingUser.email}</p>
                </div>
                <button onClick={() => setEditingUser(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {/* Wallet Balance */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Wallet Balance (₦)</label>
                  <div className="relative">
                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="number" 
                      step="0.01"
                      value={formData.walletBalance}
                      onChange={(e) => setFormData({ ...formData, walletBalance: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-[var(--primary-purple)] transition-all font-black text-lg"
                    />
                  </div>
                </div>

                {/* Reward Points */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Loyalty Points (PTS)</label>
                  <div className="relative">
                    <Gift className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="number" 
                      value={formData.rewardPoints}
                      onChange={(e) => setFormData({ ...formData, rewardPoints: parseInt(e.target.value) || 0 })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-[var(--primary-purple)] transition-all font-black text-lg"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full py-5 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.3em] hover:bg-[var(--primary-purple)] transition-all shadow-xl shadow-purple-900/10 flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                  Save Adjustments
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
