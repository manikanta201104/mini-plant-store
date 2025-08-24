import React from 'react';

const PlantModal = ({ plant, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        <div className="relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full 
                     flex items-center justify-center shadow-lg transition-all duration-300 
                     hover:scale-110 hover:shadow-xl group"
          >
            <svg className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative h-80 overflow-hidden rounded-t-3xl">
            <img 
              src={plant.imageUrl || 'https://www.google.com/imgres?q=plant&imgurl=https%3A%2F%2Fgardengram.in%2Fcdn%2Fshop%2Fproducts%2FRubberPlant.jpg%3Fv%3D1709008734&imgrefurl=https%3A%2F%2Fgardengram.in%2Fproducts%2Frubber-plant%3Fsrsltid%3DAfmBOoqBtnKPVH1MgRLUixthU8Nyx0lM_MCmDgf6A2lN8QoaC8i0gLAi&docid=87jiqtKmCUbL8M&tbnid=j_lB6PgLRuFx-M&vet=12ahUKEwjxmvGj4qKPAxXk1TgGHQqGDkQQM3oECBcQAA..i&w=1200&h=1600&hcb=2&ved=2ahUKEwjxmvGj4qKPAxXk1TgGHQqGDkQQM3oECBcQAA'} 
              alt={plant.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            
            <div className={`absolute bottom-4 left-4 px-4 py-2 rounded-full font-semibold text-sm shadow-lg ${
              plant.availability 
                ? 'bg-emerald-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {plant.availability ? '✓ In Stock' : '✗ Out of Stock'}
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-3 leading-tight">
              {plant.name}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ${plant.price.toFixed(2)}
              </span>
              <div className="h-8 w-px bg-slate-300"></div>
              <span className="text-slate-500 font-medium">per plant</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <span className="text-emerald-600">🏷️</span>
              Categories
            </h3>
            <div className="flex flex-wrap gap-3">
              {plant.categories.map((cat, index) => (
                <span 
                  key={cat} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    index % 4 === 0 
                      ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                      : index % 4 === 1 
                      ? 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                      : index % 4 === 2
                      ? 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <span className="text-emerald-600">📝</span>
              Description
            </h3>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <p className="text-slate-600 leading-relaxed">
                {plant.description || 'This beautiful plant will make a perfect addition to your home or garden. It\'s carefully selected for quality and health, ensuring you get the best plant possible. Perfect for both beginners and experienced plant parents!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantModal;