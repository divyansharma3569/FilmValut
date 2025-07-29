<<<<<<< HEAD
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movieObj, poster_path, name, handleAddToWatchList, handleRemoveFromWatchlist, watchList }) {
  const navigate = useNavigate();

  function doesContain(movieObj) {
    return watchList.some(movie => movie.id === movieObj.id);
  }

  const handleCardClick = () => {
    navigate(`/moviedetails/${movieObj.id}`);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className='h-[55vh] w-[250px] bg-centre bg-cover rounded-xl hover:scale-105 duration-150 hover:cursor-pointer flex flex-col justify-between items-end'
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})` }}
      >
        {doesContain(movieObj) ? (
          <div
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              handleRemoveFromWatchlist(movieObj);
            }}
            className='text-xl flex place-content-center place-self-end h-8 w-8 rounded-xl bg-black m-3'
          >
            &#10060;
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              handleAddToWatchList(movieObj);
            }}
            className='text-xl flex place-content-center place-self-end h-8 w-8 rounded-xl bg-black m-3'
          >
            &#11088;
          </div>
        )}

        <div className='text-white text-xl w-full p-3 rounded-b-xl text-center bg-gray-900/60'>
          {name}
        </div>
      </div>
    </>
=======
import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';

function MovieCard({ movieObj, poster_path, name, handleAddToWatchList, handleRemoveFromWatchlist, watchList }) {
  const [loading, setLoading] = useState(false);

  const isInWatchlist = useMemo(
    () => watchList.some(movie => movie.id === movieObj.id),
    [watchList, movieObj.id]
  );

  const handleClick = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);

    if (isInWatchlist) {
      await handleRemoveFromWatchlist(movieObj);
    } else {
      await handleAddToWatchList(movieObj);
    }

    setLoading(false);
  };

  return (
    <div
      className="h-[55vh] w-[250px] bg-center bg-cover rounded-xl hover:scale-105 duration-150 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})` }}
    >
      {/* Add/Remove Button */}
      <div
        onClick={handleClick}
        className={`flex justify-center items-center h-8 w-8 rounded-full ${loading ? 'bg-gray-500' : 'bg-black'} m-3 cursor-pointer`}
      >
        <FontAwesomeIcon
          icon={isInWatchlist ? faTimes : faStar}
          size="lg"
          color={isInWatchlist ? 'red' : 'gold'}
        />
      </div>

      {/* Movie Title */}
      <div className="text-white text-xl w-full p-3 text-center bg-gray-900/60 rounded-b-xl">
        {name}
      </div>
    </div>
>>>>>>> 975c35e (Resolved merge conflicts)
  );
}

export default MovieCard;
