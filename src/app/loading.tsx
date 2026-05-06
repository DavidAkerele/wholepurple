export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#FAF7F2] z-[100] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated Rings */}
        <div className="w-24 h-24 border-4 border-purple-100 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 w-24 h-24 border-t-4 border-[var(--primary-purple)] rounded-full animate-spin"></div>
        
        {/* Logo or Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-[var(--primary-purple)] rounded-full animate-bounce"></div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.4em] animate-pulse">
          Whole Purple
        </h2>
        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-2">
          Ethically Sourced, Always
        </p>
      </div>
    </div>
  );
}
