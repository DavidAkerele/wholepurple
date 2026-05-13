"use client";
export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Sleek Minimal Loader */}
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 border-[3px] border-purple-50 rounded-full"></div>
          <div className="absolute inset-0 border-[3px] border-t-[var(--primary-purple)] rounded-full animate-spin"></div>
          
          {/* Pulsing Core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-[var(--primary-purple)] rounded-full animate-ping"></div>
          </div>
        </div>
        
        {/* Elegant Typography */}
        <div className="mt-12 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center gap-4">
             <div className="w-8 h-px bg-gray-200"></div>
             <h2 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.5em] text-center">
               Whole Purple
             </h2>
             <div className="w-8 h-px bg-gray-200"></div>
          </div>
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] opacity-60">
             The Harvest is Preparing...
          </p>
        </div>
      </div>
      
      {/* Bottom Progress Line */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-50">
         <div className="h-full bg-gradient-to-r from-[var(--primary-purple)] to-purple-400 animate-progress origin-left"></div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
