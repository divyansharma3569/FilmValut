import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import genreids from '../Utility/genre';

function Watchlist({ watchList, handleRemoveFromWatchList }) {
  const [search, setSearch] = useState('');
  const [genreList, setGenreList] = useState(['All Genres']);
  const [currGenre, setCurrGenre] = useState('All Genres');
  const [sortedList, setSortedList] = useState([]);

  // Update sortedList whenever watchList changes
  useEffect(() => {
    setSortedList(watchList);
    const temp = watchList.map((movieObj) => genreids[movieObj.genre_ids[0]]);
    const uniqueGenres = new Set(temp);
    setGenreList(['All Genres', ...uniqueGenres]);
  }, [watchList]);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleFilter = (genre) => setCurrGenre(genre);

  const sortIncreasing = () => {
    const sorted = [...sortedList].sort((a, b) => a.vote_average - b.vote_average);
    setSortedList(sorted);
  };

  const sortDecreasing = () => {
    const sorted = [...sortedList].sort((a, b) => b.vote_average - a.vote_average);
    setSortedList(sorted);
  };

  return (
    <>
      {/* Genre Filter */}
      <div className="flex justify-center 0 align-items-center space-x-8 flex-wrap px-5 m-5">
        {genreList.map((genre) => (
          <div
            key={genre}
            onClick={() => handleFilter(genre)}
            className={
              currGenre === genre
                ? 'flex place-content-center p-1 bg-black rounded-xl h-[2rem] w-[7rem] text-white font-bold mx-4'
                : 'flex place-content-center p-1 bg-gray-400/50 rounded-xl h-[2rem] w-[7rem] text-white font-bold mx-4'
            }
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
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2 cursor-pointer">
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-2 cursor-pointer">
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
