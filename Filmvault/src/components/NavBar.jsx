import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NavBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate(); // ✅ Added for programmatic navigation

  const API_KEY = 'd570ed2297fd08d032fcd10e72e36d79';

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        );
        setResults(res.data.results.slice(0, 6));
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      }
    };

    const debounce = setTimeout(fetchResults, 400);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMovieClick = (movieId) => {
    setQuery('');
    setShowDropdown(false);
    navigate(`/moviedetails/${movieId}`); // ✅ Navigate like movie card
  };

  return (
    <div className='h-[7vh] flex items-center justify-between px-6 border-b text-black z-50 relative'>

      {/* Left side: Logo + Links */}
      <div className='flex items-center space-x-10 text-2xl font-bold'>
        <Link to='/Movies' className='flex items-center'>
          <FontAwesomeIcon icon={faClapperboard} size='xl' />
        </Link>
        <Link to='/Home'>Home</Link>
        <Link to='/Movies'>Movies</Link>
        <Link to='/Watchlist'>Watchlist</Link>
      </div>

      {/* Center: Search Bar */}
      <div className='relative w-[400px]' ref={dropdownRef}>
        <input
          type='text'
          placeholder='Search movies...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full px-4 py-2 rounded-full border shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all'
        />
        {showDropdown && results.length > 0 && (
          <div className='absolute top-[110%] w-full bg-white rounded-lg shadow-lg border max-h-[320px] overflow-y-auto mt-2'>
            {results.map((movie) => (
              <div
                key={movie.id}
                className='flex items-start gap-3 p-3 hover:bg-gray-100 transition duration-200 cursor-pointer'
                onClick={() => handleMovieClick(movie.id)} // ✅ Navigate to MovieDetails
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                      : 'https://via.placeholder.com/92x138?text=No+Image'
                  }
                  alt={movie.title}
                  className='w-[60px] h-[90px] object-cover rounded-md'
                />
                <div className='flex flex-col overflow-hidden'>
                  <span className='font-semibold text-black truncate'>{movie.title}</span>
                  <span className='text-sm text-gray-500 line-clamp-2'>
                    {movie.overview ? movie.overview.slice(0, 120) + '...' : 'No overview available.'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: Auth Buttons */}
      <div className='flex items-center space-x-3 text-lg text-white ml-5'>
        <Link
          to='/LoginPage'
          className='border rounded-full bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 w-[8rem] text-center py-[0.25rem]'
        >
          Login
        </Link>
        <Link
          to='/RegisterPage'
          className='border rounded-full bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 w-[8rem] text-center py-[0.25rem]'
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
