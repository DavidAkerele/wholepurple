"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Type, Layout, Info } from "lucide-react";
import { updateContentSetting } from "@/app/actions/content";
import toast from "react-hot-toast";

interface ContentEditorProps {
  initialSettings: Record<string, string>;
}

export default function ContentEditor({ initialSettings }: ContentEditorProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [settings, setSettings] = useState(initialSettings);

  const handleSave = async (key: string) => {
    setLoading(key);
    const result = await updateContentSetting(key, settings[key] || "");
    if (result.success) {
      toast.success(`Updated ${key.replace(/_/g, ' ')}`);
    } else {
      toast.error(result.error || "Failed to update");
    }
    setLoading(null);
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const contentGroups = [
    {
      title: "Home Hero Section",
      icon: Layout,
      fields: [
        { key: "home_hero_title", label: "Hero Main Title", type: "text", placeholder: "Welcome to Whole Purple" },
        { key: "home_hero_subtitle", label: "Hero Subtitle", type: "textarea", placeholder: "Ethically Sourced, Always." },
      ]
    },
    {
      title: "About Page Content",
      icon: Info,
      fields: [
        { key: "about_title", label: "About Us Title", type: "text", placeholder: "Our Story" },
        { key: "about_content", label: "Main About Content", type: "textarea", placeholder: "We started with a simple mission..." },
      ]
    },
    {
      title: "Footer Information",
      icon: Type,
      fields: [
        { key: "footer_description", label: "Footer Short Bio", type: "textarea", placeholder: "Your favorite organic food store." },
        { key: "contact_address", label: "Store Address", type: "text", placeholder: "123 Spice Street, Lagos" },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Content Editor</h1>
        <p className="text-gray-800 font-medium">Update the text and messaging across the platform in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {contentGroups.map((group, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[40px] border border-gray-100 flex flex-col gap-6 h-fit">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center text-[var(--primary-purple)]">
                <group.icon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{group.title}</h2>
            </div>

            <div className="flex flex-col gap-6">
              {group.fields.map(field => (
                <div key={field.key} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-gray-600 uppercase tracking-widest px-1">{field.label}</label>
                    <button 
                      onClick={() => handleSave(field.key)}
                      disabled={loading === field.key}
                      className="text-[var(--primary-purple)] hover:text-purple-700 transition-all disabled:opacity-50"
                    >
                      {loading === field.key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {field.type === "textarea" ? (
                    <textarea 
                      rows={3}
                      value={settings[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all font-medium text-sm leading-relaxed"
                    />
                  ) : (
                    <input 
                      type="text"
                      value={settings[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] transition-all font-medium text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
