import React, { useState, useEffect, useRef } from 'react';
import LocalProductGrid from '../components/LocalProductGrid';
import { Ad } from '../types/Ad';
import { collection, query, limit, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import LoadingScreen from '../components/LoadingScreen';
import { FaMapMarkerAlt, FaArrowLeft, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Locals = () => {
  const [localAds, setLocalAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showFullButton, setShowFullButton] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchLocalAds = async () => {
      try {
        const adsRef = collection(db, 'ads');
        const q = query(adsRef, orderBy('createdAt', 'desc'), limit(100));
        const querySnapshot = await getDocs(q);
        const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad));
        setLocalAds(ads);
      } catch (err) {
        console.error('Error fetching local ads:', err);
        setError('Failed to load local ads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocalAds();

    const handleScroll = () => {
      if (buttonRef.current) {
        setShowFullButton(window.scrollY < 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col w-full">
      <SearchBar />

      <div className="container mx-auto px-4 py-8 relative">
        <h1 className="text-3xl font-bold mb-4">Recently posted ads</h1>
        
        <div className="mb-8">
          {!imageError ? (
            <img 
              src="https://assets.jijistatic.com/static/img/about/svg/fifth.svg" 
              alt="Featured banner" 
              className="w-full h-48 object-cover rounded-lg" 
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Failed to load banner image</p>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="fixed top-13 left-4 bg-white text-orange-500 rounded-full p-3 shadow-md text-xl z-10 hover:bg-orange-100 transition-colors"
        >
          <FaArrowLeft />
        </button>
        <div className="flex items-center justify-center mb-6">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <h3 className="text-xl text-gray-500 font-semibold">Recently posted ads</h3>
        </div>
        
        <LocalProductGrid ads={localAds} />
        {/* <button
          ref={buttonRef}
          onClick={() => navigate('/post-ad')} // Adjust this route as needed
          className={`fixed bottom-[62px] right-4 bg-orange-500 text-white rounded-full p-4 shadow-lg z-20 transition-all duration-300 ${
            showFullButton ? 'w-auto px-6' : 'w-12 h-12'
          }`}
        >
          <div className="flex items-center justify-center">
            <FaPlus className={`${showFullButton ? 'mr-2' : ''}`} />
            <span className={`${showFullButton ? 'inline' : 'hidden'}`}>Post a karrot</span>
          </div>
        </button> */}
      </div>
    </div>
  );
};

export default Locals;
