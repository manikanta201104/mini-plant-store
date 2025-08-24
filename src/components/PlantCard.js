import React from 'react';

const PlantCard = ({ plant, onClick }) => {
  return (
    <div 
      className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-2xl 
                 transition-all duration-300 cursor-pointer border border-white/40
                 hover:scale-105 hover:bg-white/90 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img 
          src={plant.imageUrl || 'https://via.placeholder.com/300x240/22c55e/ffffff?text=🌿+Plant'} 
          alt={plant.name} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
          plant.availability 
            ? 'bg-emerald-500 text-white shadow-lg' 
            : 'bg-red-500 text-white shadow-lg'
        }`}>
          {plant.availability ? '✓ In Stock' : '✗ Out of Stock'}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-xl text-slate-800 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
          {plant.name}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            ${plant.price.toFixed(2)}
          </span>
          <div className="h-6 w-px bg-slate-300"></div>
          <span className="text-slate-500 text-sm">per plant</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {plant.categories.slice(0, 3).map((cat, index) => (
            <span 
              key={cat} 
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${
                index === 0 
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                  : index === 1 
                  ? 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                  : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
              }`}
            >
              {cat}
            </span>
          ))}
          {plant.categories.length > 3 && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
              +{plant.categories.length - 3} more
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Click to view details</span>
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-xs">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;