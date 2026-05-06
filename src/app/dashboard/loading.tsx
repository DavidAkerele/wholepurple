export default function DashboardLoading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-50 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 w-16 h-16 border-t-4 border-[var(--primary-purple)] rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-[10px] font-black text-gray-500 uppercase tracking-widest animate-pulse">
        Fetching Dashboard Data...
      </p>
    </div>
  );
}
