import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-red-200 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Oops! Something went wrong
          </h2>

          <p className="text-slate-600 mb-6 leading-relaxed">
            {message}
          </p>

          <div className="space-y-3">
            {onRetry && (
              <button 
                onClick={onRetry} 
                className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold 
                         py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                         hover:scale-105 hover:from-red-600 hover:to-rose-700 
                         active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-500/30"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </span>
              </button>
            )}

            <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-slate-100 text-slate-700 font-medium py-3 px-6 rounded-xl 
                       border border-slate-200 hover:bg-slate-200 hover:border-slate-300 
                       transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
                Refresh Page
              </span>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-6">
            If the problem persists, please try refreshing the page or contact support.
          </p>
        </div>

        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-200/30 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-16 w-16 h-16 bg-rose-200/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-pink-200/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;