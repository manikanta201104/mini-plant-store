import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Admin from './pages/Admin';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">🌿</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Urvann Plant Store
                </h1>
                <p className="text-slate-500 text-sm font-medium">Your green paradise awaits</p>
              </div>
            </Link>
            <nav className="flex items-center gap-4">
            </nav>
          </div>
        </div>
      </header>

      <main className="relative">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-200/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-cyan-200/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-emerald-200/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;