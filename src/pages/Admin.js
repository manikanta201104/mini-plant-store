import React from 'react';
import AddPlantForm from '../components/AddPlantForm';
import PlantList from '../components/PlantList';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">⚙️</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-slate-600 text-lg">Manage your plant inventory with ease</p>
        </div>
        <div className="space-y-12">
          <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">🌱</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Add New Plant</h2>
            </div>
            <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-2xl p-6 border border-emerald-200/30">
              <AddPlantForm />
            </div>
          </section>

          <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">📋</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Manage Plants</h2>
            </div>
            <div className="bg-gradient-to-br from-cyan-50/50 to-blue-50/50 rounded-2xl p-6 border border-cyan-200/30">
              <PlantList />
            </div>
          </section>
        </div>

        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-teal-200/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-cyan-200/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-emerald-200/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      
    </div>
  );
};

export default Admin;