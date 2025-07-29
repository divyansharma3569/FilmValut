import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import Pagination from './Pagination';
import Cards from './Cards';

function Movies({ handleAddToWatchList, handleRemoveFromWatchlist, watchList }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => setPageNo(prev => (prev === 1 ? 1 : prev - 1));
  const handleNext = () => setPageNo(prev => prev + 1);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=d570ed2297fd08d032fcd10e72e36d79&language=en-US&page=${pageNo}`)
      .then(res => setMovies(res.data.results))
      .catch(err => console.error(err));
  }, [pageNo]);

  return (
    <div className='p-5'>
      <div className='text-2xl m-3 font-bold text-center'>Trending Movies</div>

      <div className='flex flex-row flex-wrap justify-around gap-8'>
        {movies.map(movieObj => (
          <MovieCard
            key={movieObj.id}
            movieObj={movieObj}
            poster_path={movieObj.poster_path}
            name={movieObj.original_title}
            handleAddToWatchList={handleAddToWatchList}
            handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            watchList={watchList}
          />
        ))}
      </div>

      <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
      <div>
        <Cards />
      </div>
    </div>
  );
}

export default Movies;
