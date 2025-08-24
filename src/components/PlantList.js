import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import UpdatePlantForm from './UpdatePlantForm';

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPlant, setEditingPlant] = useState(null);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('https://urvann-yz2n.onrender.com/api/plants');
      setPlants(res.data);
    } catch (err) {
      console.error('Fetch plants error:', err);
      setError('Failed to load plants.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    try {
      await axios.delete(`https://urvann-yz2n.onrender.com/plants/${id}`);
      toast.success('Plant deleted successfully!');
      setPlants(plants.filter(plant => plant._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete plant.');
    }
  };

  const handleEdit = (plant) => {
    setEditingPlant(plant);
  };

  const handleUpdateSuccess = (updatedPlant) => {
    setPlants(plants.map(plant => plant._id === updatedPlant._id ? updatedPlant : plant));
    setEditingPlant(null);
    toast.success('Plant updated successfully!');
  };

  if (loading) return <p>Loading plants...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      {editingPlant ? (
        <UpdatePlantForm plant={editingPlant} onSuccess={handleUpdateSuccess} onCancel={() => setEditingPlant(null)} />
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Categories</th>
              <th className="border p-2">Availability</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.length ? (
              plants.map(plant => (
                <tr key={plant._id} className="border-b">
                  <td className="border p-2">
                    {plant.imageUrl ? (
                      <img src={`https://urvann-yz2n.onrender.com${plant.imageUrl}`} alt={plant.name} className="w-16 h-16 object-cover" />
                    ) : (
                      'No image'
                    )}
                  </td>
                  <td className="border p-2">{plant.name}</td>
                  <td className="border p-2">${plant.price.toFixed(2)}</td>
                  <td className="border p-2">{plant.categories.join(', ')}</td>
                  <td className="border p-2">{plant.availability ? 'In Stock' : 'Out of Stock'}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(plant)}
                      className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plant._id, plant.name)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">No plants found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlantList;