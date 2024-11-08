import React, { useState } from 'react';
import { Search, MapPin, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

const SearchBar = () => {
const [searchTerm, setSearchTerm] = useState('');
const navigate = useNavigate();
const handleSearch = (term: string) => {
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleSearch(searchTerm);
    }
  };


  return (
    <div className="bg-blue-500 text-white py-6">
      <Toaster />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Search latest posted ads</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin size={20} />
              
            
                        </div>
            
               
          </div>
        </div>
        <form onSubmit={handleSubmit} className="relative w-full mx-auto">
          <input
            type="text"
            placeholder="I am looking for..."
            className="w-full p-3 pr-12 rounded-md text-gray-800 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </button>
        </form>
     
      </div>
    </div>
  );
};

export default SearchBar;
