"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 1000);
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 overflow-hidden">
        <div className="max-w-md w-full">
          <div className="flex justify-start mb-10 lg:hidden">
            <Link href="/" className="flex items-center gap-2 text-gray-800 hover:text-[var(--primary-purple)] font-bold transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          <div className="mb-8">
            <Image src="/images/scraped/cropped-wholepurplee-removebg-preview.png" alt="Whole Purple" width={160} height={50} className="object-contain mb-8" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-800">Join Whole Purple to start shopping.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold mb-8 border border-red-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="p-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="p-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Confirm</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="p-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary-purple)] text-white font-bold text-lg py-4 rounded-2xl hover:bg-purple-700 transition-all mt-4 disabled:opacity-70"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-10">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[var(--primary-purple)] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900">
        <Image 
          src="/images/register-hero.png" 
          alt="Fresh Farm Produce" 
          fill 
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/30"></div>
        <div className="absolute inset-0 p-12 flex flex-col justify-end items-end text-right z-10">
          <div className="text-white max-w-lg">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Freshness You<br/>Can Trust
            </h2>
            <p className="text-lg text-white/80 leading-relaxed font-medium">
              Join thousands of families supporting local farmers and enjoying premium, organic produce delivered fresh.
            </p>
          </div>
        </div>
        <Link href="/" className="absolute top-12 right-12 z-20">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
}
