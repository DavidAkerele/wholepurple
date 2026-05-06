"use client";

import { useState } from "react";
import { Save, Globe, Shield, Mail, Smartphone, Bell } from "lucide-react";
import { saveSettings } from "@/app/actions/settings";
import toast from "react-hot-toast";

export default function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: initialSettings.siteName || "Whole Purple",
    supportEmail: initialSettings.supportEmail || "support@wholepurple.com",
    contactPhone: initialSettings.contactPhone || "+234 800 PURPLE",
    allowGuestCheckout: initialSettings.allowGuestCheckout || "true",
    maintenanceMode: initialSettings.maintenanceMode || "false",
    rewardRate: initialSettings.rewardRate || "5",
    deliveryFee: initialSettings.deliveryFee || "2500",
    minOrderAmount: initialSettings.minOrderAmount || "5000",
    taxRate: initialSettings.taxRate || "7.5",
    instagramUrl: initialSettings.instagramUrl || "https://instagram.com/wholepurple",
    facebookUrl: initialSettings.facebookUrl || "https://facebook.com/wholepurple",
    twitterUrl: initialSettings.twitterUrl || "https://twitter.com/wholepurple",
    openingHours: initialSettings.openingHours || "8:00 AM - 6:00 PM",
    deliveryTimes: initialSettings.deliveryTimes || "Mon - Sat, 9 AM - 5 PM",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await saveSettings(settings);

    if (result.success) {
      toast.success("Settings saved successfully");
    } else {
      toast.error(result.error || "Failed to save settings");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* General Branding */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-[var(--primary-purple)]" />
            <h3 className="text-xl font-bold text-gray-900">General Branding</h3>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-gray-600 uppercase tracking-widest">Site Name</label>
              <input 
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-gray-600 uppercase tracking-widest">Support Email</label>
              <input 
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-gray-600 uppercase tracking-widest">Contact Phone</label>
              <input 
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Platform Rules */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[var(--accent-green)]" />
            <h3 className="text-xl font-bold text-gray-900">Platform Logic</h3>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 text-gray-900 rounded-2xl">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-gray-900">Guest Checkout</span>
                <span className="text-xs text-gray-800 font-medium">Allow orders without account.</span>
              </div>
              <button 
                type="button"
                onClick={() => setSettings({ ...settings, allowGuestCheckout: settings.allowGuestCheckout === "true" ? "false" : "true" })}
                className={`w-14 h-8 rounded-full p-1 transition-colors ${settings.allowGuestCheckout === "true" ? 'bg-[var(--primary-purple)]' : 'bg-gray-200'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform ${settings.allowGuestCheckout === "true" ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 text-gray-900 rounded-2xl">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-gray-900">Maintenance Mode</span>
                <span className="text-xs text-gray-800 font-medium">Redirect all traffic to holding page.</span>
              </div>
              <button 
                type="button"
                onClick={() => setSettings({ ...settings, maintenanceMode: settings.maintenanceMode === "true" ? "false" : "true" })}
                className={`w-14 h-8 rounded-full p-1 transition-colors ${settings.maintenanceMode === "true" ? 'bg-red-500' : 'bg-gray-200'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform ${settings.maintenanceMode === "true" ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-gray-600 uppercase tracking-widest">Reward Points Rate (%)</label>
              <input 
                type="number"
                value={settings.rewardRate}
                onChange={(e) => setSettings({ ...settings, rewardRate: e.target.value })}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Financial Controls */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900">Financial Controls</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-gray-600 uppercase tracking-widest">Base Delivery Fee (₦)</label>
              <input 
                type="number"
                value={settings.deliveryFee}
                onChange={(e) => setSettings({ ...settings, deliveryFee: e.target.value })}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all font-bold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-gray-600 uppercase tracking-widest">Min. Order Amount (₦)</label>
              <input 
                type="number"
                value={settings.minOrderAmount}
                onChange={(e) => setSettings({ ...settings, minOrderAmount: e.target.value })}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all font-bold"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-black text-gray-600 uppercase tracking-widest">Tax Rate (%)</label>
              <input 
                type="number"
                step="0.1"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all font-bold"
              />
            </div>
          </div>
        </div>

        {/* Social & Operations */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-bold text-gray-900">Social & Operations</h3>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-gray-600 uppercase tracking-widest">Instagram URL</label>
                <input 
                  type="text"
                  value={settings.instagramUrl}
                  onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all text-sm font-medium"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-gray-600 uppercase tracking-widest">Facebook URL</label>
                <input 
                  type="text"
                  value={settings.facebookUrl}
                  onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all text-sm font-medium"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-gray-600 uppercase tracking-widest">Opening Hours</label>
              <input 
                type="text"
                value={settings.openingHours}
                onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all text-sm font-bold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-gray-600 uppercase tracking-widest">Delivery Schedule</label>
              <input 
                type="text"
                value={settings.deliveryTimes}
                onChange={(e) => setSettings({ ...settings, deliveryTimes: e.target.value })}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all text-sm font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-12 py-5 rounded-3xl bg-[var(--primary-purple)] text-white font-black text-lg hover:shadow-2xl hover:shadow-purple-100 transition-all flex items-center gap-3 disabled:opacity-50"
        >
          {loading ? "Saving..." : (
            <>
              <Save className="w-6 h-6" />
              Save Configuration
            </>
          )}
        </button>
      </div>
    </form>
  );
}
