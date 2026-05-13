"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { User, Mail, Phone, Camera, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: (session.user as any).phone || "",
      });
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Profile updated successfully");
        await update({
          ...session,
          user: {
            ...session?.user,
            name: formData.name,
            phone: formData.phone,
          },
        });
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Profile Settings</h1>
        <p className="text-gray-600 font-medium">Manage your personal information and account details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-2xl shadow-purple-900/5 flex flex-col items-center text-center gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-50 shadow-xl">
                {session.user.image ? (
                  <Image src={session.user.image} alt={session.user.name || ""} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-[var(--primary-purple)] flex items-center justify-center text-white text-4xl font-black">
                    {session.user.name?.charAt(0)}
                  </div>
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-[var(--primary-purple)] text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">{session.user.name}</h2>
              <p className="text-xs font-bold text-[var(--primary-purple)] uppercase tracking-widest mt-1">{session.user.role}</p>
            </div>

            <div className="w-full h-px bg-gray-100"></div>

            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Email Address</span>
                  <span className="text-[10px] font-bold text-gray-900 truncate max-w-[150px]">{session.user.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Phone Number</span>
                  <span className="text-[10px] font-bold text-gray-900">{(session.user as any).phone || "Not set"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl shadow-purple-900/5 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[var(--primary-purple)] transition-colors" />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[var(--primary-purple)] transition-colors" />
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+234..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-200" />
                <input 
                  type="email" 
                  value={formData.email}
                  disabled
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-gray-400 cursor-not-allowed"
                />
              </div>
              <p className="text-[9px] text-gray-400 font-medium ml-1 italic">Email address cannot be changed.</p>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="submit"
                disabled={loading}
                className="btn-primary min-w-[200px] flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
