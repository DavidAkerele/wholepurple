"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const slideImages = [
  "/images/login-hero.png",
  "/images/scraped/home11_img-3.jpg",
  "/images/scraped/nrd-D6Tu_L3chLE-unsplash.jpg",
  "/images/scraped/Home13_bg12.jpg",
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      {/* Left Side - Slideshow */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900">
        {slideImages.map((src, idx) => (
          <Image 
            key={src}
            src={src} 
            alt="Fresh Farm Produce" 
            fill 
            className={`object-cover transition-all duration-[2000ms] ease-in-out will-change-[opacity,transform] ${idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
            priority={idx === 0}
            sizes="50vw"
          />
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
        <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
          <Link href="/" className="inline-block w-fit">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-6 h-6 text-white" />
            </div>
          </Link>
          <div className="text-white max-w-lg">
            <div className="flex items-center gap-4 mb-6">
               {slideImages.map((_, idx) => (
                 <div key={idx} className={`h-1 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}></div>
               ))}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight transition-all">
              Welcome Back to<br/>Whole Purple
            </h2>
            <p className="text-lg text-white/80 leading-relaxed font-medium">
              Access your editorial dashboard, manage your inventory, and continue your journey with the freshest, ethically sourced ingredients.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:px-24 lg:py-12 overflow-y-auto custom-scrollbar">
        <div className="max-w-md w-full">
          <div className="flex justify-start mb-12 lg:hidden">
            <Link href="/" className="flex items-center gap-2 text-gray-800 hover:text-[var(--primary-purple)] font-bold transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          <div className="mb-10">
            <Image src="/images/scraped/cropped-wholepurplee-removebg-preview.png" alt="Whole Purple" width={160} height={50} className="object-contain mb-8" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-800">Please enter your details to sign in.</p>
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
                className="p-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <Link href="#" className="text-sm font-bold text-[var(--primary-purple)] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pr-12 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary-purple)] text-white font-bold text-lg py-4 rounded-2xl hover:bg-purple-700 transition-all mt-4 disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative bg-white px-4 text-sm text-gray-500 font-medium">Or continue with</div>
            </div>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full bg-white border border-gray-200 text-gray-700 font-bold text-lg py-4 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign in with Google
            </button>
          </form>

          <p className="text-center text-gray-600 mt-10 mb-8">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-[var(--primary-purple)] hover:underline">
              Create an account
            </Link>
          </p>


        </div>
      </div>
    </div>
  );
}
