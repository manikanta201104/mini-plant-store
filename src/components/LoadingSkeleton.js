import React from 'react';

const LoadingSkeleton = ({ count }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="h-12 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-2xl mx-auto mb-3 animate-pulse max-w-md"></div>
          <div className="h-6 bg-slate-200 rounded-xl mx-auto animate-pulse max-w-xs" style={{ animationDelay: '0.2s' }}></div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="h-12 bg-slate-200 rounded-xl animate-pulse"></div>
            </div>
            <div className="w-full lg:w-80">
              <div className="h-12 bg-slate-200 rounded-xl animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-emerald-100 px-6 py-3 rounded-full">
            <div className="relative">
              <div className="w-6 h-6 border-3 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-6 h-6 border-3 border-transparent border-b-emerald-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>
            <span className="text-emerald-700 font-medium">Loading your plants...</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <div 
              key={i} 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/40 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>
                <div className="absolute top-3 right-3 w-16 h-6 bg-slate-300 rounded-full"></div>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="h-6 bg-slate-200 rounded-lg w-4/5"></div>
                  <div className="h-6 bg-slate-200 rounded-lg w-3/5"></div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="h-8 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-lg w-20"></div>
                  <div className="w-px h-6 bg-slate-300"></div>
                  <div className="h-4 bg-slate-200 rounded w-16"></div>
                </div>
                
                <div className="flex gap-2">
                  <div className="h-6 bg-emerald-100 rounded-full w-16"></div>
                  <div className="h-6 bg-teal-100 rounded-full w-20"></div>
                  <div className="h-6 bg-cyan-100 rounded-full w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-teal-200/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-cyan-200/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-emerald-200/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSkeleton;