import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  categories: yup.array().min(1, 'At least one category is required').required(),
  availability: yup.boolean().required('Availability is required'),
  description: yup.string().optional(),
}).required();

const AddPlantForm = () => {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      price: '',
      categories: [],
      availability: true,
      description: '',
    },
  });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://urvann-yz2n.onrender.com/api/categories');
        setCategories(res.data.map(cat => ({ value: cat, label: cat })));
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        toast.error('Could not load categories. You can still create new ones.');
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('categories', JSON.stringify(data.categories.map(c => c.value)));
      formData.append('availability', data.availability);
      formData.append('description', data.description);
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      await axios.post('https://urvann-yz2n.onrender.com/api/plants', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Plant added successfully!');
      navigate('/');
    } catch (err) {
      console.error('Add plant error:', err);
      toast.error(err.response?.data?.error || 'Failed to add plant.');
    }
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      border: state.isFocused ? '2px solid #10b981' : errors.categories ? '2px solid #ef4444' : '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '4px 8px',
      boxShadow: state.isFocused 
        ? '0 0 0 3px rgba(16, 185, 129, 0.1)' 
        : 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: errors.categories ? '#ef4444' : '#10b981',
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#d1fae5',
      borderRadius: '6px',
      border: '1px solid #10b981',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#065f46',
      fontWeight: '600',
      fontSize: '12px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#065f46',
      '&:hover': {
        backgroundColor: '#dc2626',
        color: 'white',
      },
    }),
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="space-y-2">
          <label className="flex items-center gap-2 font-semibold text-slate-700">
            <span className="text-emerald-600">🌿</span>
            Plant Name
          </label>
          <input
            {...register('name')}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm
                       focus:outline-none focus:ring-4 focus:ring-emerald-500/20 font-medium
                       ${errors.name 
                         ? 'border-red-400 focus:border-red-500' 
                         : 'border-slate-200 focus:border-emerald-400 hover:border-slate-300'
                       }`}
            placeholder="e.g., Monstera Deliciosa"
          />
          {errors.name && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <span>⚠️</span>
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 font-semibold text-slate-700">
            <span className="text-emerald-600">💰</span>
            Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-bold">$</span>
            <input
              type="number"
              step="0.01"
              {...register('price')}
              className={`w-full pl-8 pr-4 py-4 rounded-xl border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm
                         focus:outline-none focus:ring-4 focus:ring-emerald-500/20 font-medium
                         ${errors.price 
                           ? 'border-red-400 focus:border-red-500' 
                           : 'border-slate-200 focus:border-emerald-400 hover:border-slate-300'
                         }`}
              placeholder="29.99"
            />
          </div>
          {errors.price && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <span>⚠️</span>
              {errors.price.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 font-semibold text-slate-700">
          <span className="text-emerald-600">🏷️</span>
          Categories
        </label>
        <CreatableSelect
          isMulti
          options={categories}
          onChange={(vals) => setValue('categories', vals, { shouldValidate: true })}
          placeholder="Select or create categories (e.g., Indoor, Succulent)..."
          className="w-full"
          styles={customSelectStyles}
          formatCreateLabel={(inputValue) => `✨ Create "${inputValue}"`}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#10b981',
            },
          })}
        />
        {errors.categories && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.categories.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 font-semibold text-slate-700">
            <span className="text-emerald-600">📦</span>
            Availability
          </label>
          <select
            {...register('availability')}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm
                       focus:outline-none focus:ring-4 focus:ring-emerald-500/20 font-medium
                       ${errors.availability 
                         ? 'border-red-400 focus:border-red-500' 
                         : 'border-slate-200 focus:border-emerald-400 hover:border-slate-300'
                       }`}
          >
            <option value="true">✅ In Stock</option>
            <option value="false">❌ Out of Stock</option>
          </select>
          {errors.availability && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <span>⚠️</span>
              {errors.availability.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 font-semibold text-slate-700">
            <span className="text-emerald-600">📸</span>
            Plant Image <span className="text-sm text-slate-500 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/jpeg,image/png"
              {...register('image')}
              onChange={handleImageChange}
              className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 
                       focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 
                       transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium
                       file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                       file:text-sm file:font-semibold file:bg-emerald-100 file:text-emerald-700 
                       hover:file:bg-emerald-200 file:cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 font-semibold text-slate-700">
          <span className="text-emerald-600">📝</span>
          Description <span className="text-sm text-slate-500 font-normal">(optional)</span>
        </label>
        <textarea
          {...register('description')}
          rows="4"
          className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 
                   focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 
                   transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium resize-none"
          placeholder="Describe your plant's unique features, care instructions, or other details..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 
                   shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30
                   ${isSubmitting
                     ? 'bg-slate-400 text-slate-600 cursor-not-allowed'
                     : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:scale-105 active:scale-95'
                   }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
            Adding Plant...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span>🌱</span>
            Add Plant to Inventory
          </span>
        )}
      </button>
    </form>
  );
};

export default AddPlantForm;