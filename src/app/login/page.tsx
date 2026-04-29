"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
        setLoading(false);
      } else {
        toast.success("Welcome back!");
        
        // Fetch session to check role for conditional redirect
        const sessionRes = await fetch('/api/auth/session');
        const session = await sessionRes.json();
        
        if (session?.user?.role === 'CLIENT') {
          router.push("/");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Left Side - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900">
        <Image 
          src="/images/login-hero.png" 
          alt="Fresh Farm Produce" 
          fill 
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
        <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
          <Link href="/" className="inline-block w-fit">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-6 h-6 text-white" />
            </div>
          </Link>
          <div className="text-white max-w-lg">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Welcome Back to<br/>Whole Purple
            </h2>
            <p className="text-lg text-white/80 leading-relaxed font-medium">
              Access your editorial dashboard, manage your inventory, and continue your journey with the freshest, ethically sourced ingredients.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 overflow-hidden">
        <div className="max-w-md w-full">
          <div className="flex justify-start mb-12 lg:hidden">
            <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-[var(--primary-purple)] font-bold transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          <div className="mb-10">
            <Image src="/images/scraped/cropped-wholepurplee-removebg-preview.png" alt="Whole Purple" width={160} height={50} className="object-contain mb-8" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-500">Please enter your details to sign in.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold mb-8 border border-red-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <Link href="#" className="text-sm font-bold text-[var(--primary-purple)] hover:underline">Forgot password?</Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary-purple)] text-white font-bold text-lg py-4 rounded-2xl hover:bg-purple-700 transition-all mt-4 disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-10 mb-8">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-[var(--primary-purple)] hover:underline">
              Create an account
            </Link>
          </p>

          {/* Development Quick Login */}
          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center mb-4">Quick Login (Testing)</h3>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => { setEmail("admin@wholepurple.com"); setPassword("admin123"); }}
                className="text-[10px] font-bold text-white bg-gray-900 rounded-lg py-2 px-1 hover:bg-gray-800 transition-colors"
              >
                ADMIN
              </button>
              <button 
                onClick={() => { setEmail("manager@wholepurple.com"); setPassword("manager123"); }}
                className="text-[10px] font-bold text-white bg-green-700 rounded-lg py-2 px-1 hover:bg-green-800 transition-colors"
              >
                MANAGER
              </button>
              <button 
                onClick={() => { setEmail("editor@wholepurple.com"); setPassword("editor123"); }}
                className="text-[10px] font-bold text-white bg-orange-600 rounded-lg py-2 px-1 hover:bg-orange-700 transition-colors"
              >
                EDITOR
              </button>
              <button 
                onClick={() => { setEmail("client@wholepurple.com"); setPassword("client123"); }}
                className="text-[10px] font-bold text-white bg-blue-600 rounded-lg py-2 px-1 hover:bg-blue-700 transition-colors"
              >
                CLIENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
