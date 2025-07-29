<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
=======
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
>>>>>>> 975c35e (Resolved merge conflicts)
import genreids from '../Utility/genre';

function Watchlist({ watchList, handleRemoveFromWatchList }) {
  const [search, setSearch] = useState('');
  const [genreList, setGenreList] = useState(['All Genres']);
  const [currGenre, setCurrGenre] = useState('All Genres');
  const [sortedList, setSortedList] = useState([]);

<<<<<<< HEAD
  const handleSearch = (e) => setSearch(e.target.value);
  const handleFilter = (genre) => setCurrGenre(genre);

  const sortIncreasing = () => {
    const sorted = [...watchList].sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
    setWatchList(sorted);
  };

  const sortDecreasing = () => {
    const sorted = [...watchList].sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    setWatchList(sorted);
  };

  useEffect(() => {
    const temp = watchList.map(movie => {
      const genreId = movie.genre_ids?.[0];
      return genreids[genreId] || 'Unknown Genre';
    });
=======
  // Update sortedList whenever watchList changes
  useEffect(() => {
    setSortedList(watchList);
    const temp = watchList.map((movieObj) => genreids[movieObj.genre_ids[0]]);
>>>>>>> 975c35e (Resolved merge conflicts)
    const uniqueGenres = new Set(temp);
    setGenreList(['All Genres', ...uniqueGenres]);
  }, [watchList]);

<<<<<<< HEAD
  const renderStars = (voteAverage = 0) => {
    const scaledRating = voteAverage / 2; // scale 10 → 5
    const fullStars = Math.floor(scaledRating);
    const decimal = scaledRating - fullStars;
    const halfStar = decimal >= 0.25 && decimal < 0.75 ? 1 : 0;
    const extraFullStar = decimal >= 0.75 ? 1 : 0;
    const totalFullStars = fullStars + extraFullStar;
    const emptyStars = 5 - totalFullStars - halfStar;

    return (
      <div className="flex justify-center text-yellow-500 text-sm">
        {Array(totalFullStars).fill(0).map((_, i) => <span key={`full-${i}`}>★</span>)}
        {halfStar === 1 && <span key="half">⯨</span>}
        {Array(emptyStars).fill(0).map((_, i) => <span key={`empty-${i}`}>☆</span>)}
      </div>
    );
=======
  const handleSearch = (e) => setSearch(e.target.value);
  const handleFilter = (genre) => setCurrGenre(genre);

  const sortIncreasing = () => {
    const sorted = [...sortedList].sort((a, b) => a.vote_average - b.vote_average);
    setSortedList(sorted);
  };

  const sortDecreasing = () => {
    const sorted = [...sortedList].sort((a, b) => b.vote_average - a.vote_average);
    setSortedList(sorted);
>>>>>>> 975c35e (Resolved merge conflicts)
  };

  return (
    <>
      {/* Genre Filter */}
      <div className="flex justify-center 0 align-items-center space-x-8 flex-wrap px-5 m-5">
        {genreList.map((genre) => (
          <div
            key={genre}
            onClick={() => handleFilter(genre)}
<<<<<<< HEAD
            className={`flex place-content-center p-1 rounded-xl h-[2rem] w-[7rem] font-bold mx-4 
              ${currGenre === genre ? 'bg-blue-500 text-white' : 'bg-gray-400/50 text-white'}`}
=======
            className={
              currGenre === genre
                ? 'flex place-content-center p-1 bg-black rounded-xl h-[2rem] w-[7rem] text-white font-bold mx-4'
                : 'flex place-content-center p-1 bg-gray-400/50 rounded-xl h-[2rem] w-[7rem] text-white font-bold mx-4'
            }
>>>>>>> 975c35e (Resolved merge conflicts)
          >
            {genre}
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mt-5">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search for Movies"
          className="border bg-gray-200 h-[1.8rem] w-[15rem] outline-none p-4"
        />
      </div>

      {/* Watchlist Table */}
      <div className="border border-gray-200 m-5 overflow-hidden rounded-lg">
        <table className="w-full border text-gray-500 text-center">
          <thead className="border-b-2 text-black bg-gray-100 w-full">
            <tr>
              <th>Name</th>
<<<<<<< HEAD
              <th className='flex justify-center items-center'>
                <div onClick={sortIncreasing} className='p-2 cursor-pointer'><i className="fa-solid fa-arrow-up"></i></div>
                <div className='p-2'>Ratings</div>
                <div onClick={sortDecreasing} className='p-2 cursor-pointer'><i className="fa-solid fa-arrow-down"></i></div>
=======
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2 cursor-pointer">
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-2 cursor-pointer">
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
>>>>>>> 975c35e (Resolved merge conflicts)
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
<<<<<<< HEAD
            {watchList
              .filter(movie => currGenre === 'All Genres' || genreids[movie.genre_ids?.[0]] === currGenre)
              .filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()))
              .map((movie) => {
                const genreId = movie.genre_ids?.[0];
                const genre = genreids[genreId] || 'Unknown Genre';

                return (
                  <tr key={movie.id}>
                    <td className='flex items-center px-4 py-4'>
                      <Link to={`/moviedetails/${movie.id}`} className="flex items-center hover:underline">
                        <img
                          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                          className='h-[7rem] w-[5rem] object-cover rounded'
                          alt={movie.title}
                        />
                        <div className='mx-5 text-xl text-black'>{movie.title}</div>
                      </Link>
                    </td>

                    <td>{renderStars(movie.vote_average)}</td>

                    <td>{Math.round(movie.popularity || 0).toLocaleString()}</td>
                    <td>{genre}</td>
                    <td
                      onClick={() => handleRemoveFromWatchList(movie)}
                      className='text-red-500 cursor-pointer'
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
=======
            {sortedList
              .filter(
                (movieObj) =>
                  (currGenre === 'All Genres' ||
                    genreids[movieObj.genre_ids[0]] === currGenre) &&
                  movieObj.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((movieObj) => (
                <tr key={movieObj.id}>
                  <td className="flex items-center px-4 py-4">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      className="h-[7rem] w-[5rem]"
                      alt={movieObj.title}
                    />
                    <div className="mx-5 text-xl">{movieObj.title}</div>
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faStar} size="xs" color="orange" />
                    <FontAwesomeIcon icon={faStar} size="xs" color="orange" />
                    <FontAwesomeIcon icon={faStar} size="xs" color="orange" />
                    <FontAwesomeIcon icon={faStarHalfStroke} size="xs" color="orange" />
                    {movieObj.vote_average}
                  </td>
                  <td>{movieObj.popularity}</td>
                  <td>{genreids[movieObj.genre_ids[0]]}</td>
                  <td
                    onClick={() => handleRemoveFromWatchList(movieObj)}
                    className="text-red-500 cursor-pointer"
                  >
                    Delete
                  </td>
                </tr>
              ))}
>>>>>>> 975c35e (Resolved merge conflicts)
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
