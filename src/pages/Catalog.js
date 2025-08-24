import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PlantCard from '../components/PlantCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import PlantModal from '../components/PlantModal';

const Catalog = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const fetchPlants = useCallback(
    async (isInitial = false) => {
      if (isInitial) {
        setLoading(true);
      } else {
        setSearchLoading(true);
      }

      setError(null);
      try {
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (selectedCategories.length)
          params.categories = selectedCategories.join(',');

        const res = await axios.get('https://urvann-yz2n.onrender.com/api/plants', { params });

        const updatedPlants = res.data.map((plant) => ({
          ...plant,
          imageUrl: plant.imageUrl
            ? `https://urvann-yz2n.onrender.com${plant.imageUrl}`
            : null,
        }));

        setPlants(updatedPlants);
      } catch (err) {
        setError('Failed to load plants. Please try again.');
      } finally {
        if (isInitial) {
          setLoading(false);
        } else {
          setSearchLoading(false);
        }
      }
    },
    [searchTerm, selectedCategories]
  );

  useEffect(() => {
    fetchCategories();
    fetchPlants(true);
  }, [fetchPlants]);

  useEffect(() => {
    if (!loading) fetchPlants(false);
  }, [searchTerm, selectedCategories, fetchPlants]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://urvann-yz2n.onrender.com/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const handleSearch = useCallback((term) => {
    setSearchTerm(term.toLowerCase());
  }, []);

  const handleFilter = (cats) => setSelectedCategories(cats.map((c) => c.value));

  const openModal = (plant) => setSelectedPlant(plant);
  const closeModal = () => setSelectedPlant(null);

  if (loading) return <LoadingSkeleton count={6} />;
  if (error)
    return <ErrorMessage message={error} onRetry={() => fetchPlants(true)} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            🌿 Plant Paradise
          </h1>
          <p className="text-slate-600 text-lg">
            Discover your perfect green companion
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <SearchBar initialValue={searchTerm} onSearch={handleSearch} />
            </div>
            <div className="w-full lg:w-80">
              <FilterDropdown
                options={categories.map((c) => ({ value: c, label: c }))}
                onChange={handleFilter}
              />
            </div>
          </div>
        </div>

        {searchLoading && (
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full">
              <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
              Updating results...
            </div>
          </div>
        )}

        {plants.length > 0 && (
          <div className="mb-6">
            <p className="text-slate-600 font-medium">
              Found {plants.length} plant{plants.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plants.length ? (
            plants.map((plant, index) => (
              <div
                key={plant._id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PlantCard plant={plant} onClick={() => openModal(plant)} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No plants found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {selectedPlant && (
          <PlantModal plant={selectedPlant} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default Catalog;
