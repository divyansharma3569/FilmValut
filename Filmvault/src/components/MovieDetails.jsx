import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails({ watchList, handleAddToWatchList, handleRemoveFromWatchlist }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [providers, setProviders] = useState([]);
  const [added, setAdded] = useState(false);
  const api_key = 'd570ed2297fd08d032fcd10e72e36d79';

  // ✅ Sync local watchlist status
  useEffect(() => {
    if (movie) {
      const isAlreadyInWatchlist = watchList.some(m => m.id === movie.id);
      setAdded(isAlreadyInWatchlist);
    }
  }, [movie, watchList]);

  useEffect(() => {
    async function fetchMovieDetails() {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
      const data = await res.json();
      setMovie(data);
    }

    async function fetchCast() {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`);
      const data = await res.json();
      setCast(data.cast.slice(0, 6));
    }

    async function fetchWatchProviders() {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${api_key}`);
      const data = await res.json();
      const region = data.results?.IN;
      const providerList = region?.flatrate || region?.rent || region?.buy || [];
      setProviders(providerList);
    }

    fetchMovieDetails();
    fetchCast();
    fetchWatchProviders();
  }, [id]);

  const handleToggleWatchlist = () => {
    if (added) {
      handleRemoveFromWatchlist(movie);
    } else {
      handleAddToWatchList(movie);
    }
    setAdded(!added);
  };

  const renderStars = (voteAverage = 0) => {
    const scaledRating = voteAverage / 2;
    const fullStars = Math.floor(scaledRating);
    const decimal = scaledRating - fullStars;
    const halfStar = decimal >= 0.25 && decimal < 0.75 ? 1 : 0;
    const extraFullStar = decimal >= 0.75 ? 1 : 0;
    const totalFullStars = fullStars + extraFullStar;
    const emptyStars = 5 - totalFullStars - halfStar;

    return (
      <div className="flex items-center text-yellow-500 text-lg">
        {Array(totalFullStars).fill(0).map((_, i) => <span key={`full-${i}`}>★</span>)}
        {halfStar === 1 && <span key="half">⯨</span>}
        {Array(emptyStars).fill(0).map((_, i) => <span key={`empty-${i}`}>☆</span>)}
      </div>
    );
  };

  const convertRuntime = (min) => {
    const hrs = Math.floor(min / 60);
    const mins = min % 60;
    return `${hrs} hr ${mins} min`;
  };

  if (!movie) {
    return <div className='text-black text-center mt-10 text-2xl'>Loading...</div>;
  }

  const isReleased = movie.status === 'Released';

  return (
    <div className="text-black">
      {/* Banner */}
      <div className="relative h-[60vh] w-full bg-cover bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">{movie.title}</h1>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6 flex flex-col md:flex-row gap-6">
        <img
          className="w-[250px] h-[375px] rounded-xl shadow-lg"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="flex-1">
          {/* Title and Toggle Button */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
            <h2 className="text-3xl font-semibold">{movie.title}</h2>
            <button
              onClick={handleToggleWatchlist}
              className={`px-5 py-2 rounded text-white transition duration-200 ${
                added ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {added ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          </div>

          <p className="text-gray-600 italic">{movie.tagline}</p>
          <p className="mt-4 mb-4 text-lg">{movie.overview}</p>

          <div className="flex flex-wrap gap-3 mb-3">
            {movie.genres.map(g => (
              <span key={g.id} className="bg-gray-300 px-2 py-1 rounded-full text-sm">{g.name}</span>
            ))}
          </div>

          {renderStars(movie.vote_average)}

          <p className="mt-2">📅 <strong>{movie.release_date}</strong></p>
          {isReleased && movie.runtime ? (
            <p>🕒 <strong>{convertRuntime(movie.runtime)}</strong></p>
          ) : null}
          <p>💬 Language: <strong>{movie.original_language.toUpperCase()}</strong></p>
          <p>🎬 Status: <strong>{isReleased ? 'Released' : 'Upcoming'}</strong></p>

          {movie.homepage && (
            <a href={movie.homepage} target="_blank" rel="noreferrer" className="text-blue-600 underline mt-2 inline-block">Visit Official Website</a>
          )}
        </div>
      </div>

      {/* Cast Section */}
      {cast.length > 0 && (
        <div className="px-6 py-4">
          <h2 className="text-2xl font-semibold mb-4">Top Cast</h2>
          <div className="flex gap-4 overflow-x-auto">
            {cast.map(actor => (
              <div key={actor.id} className="w-[120px] text-center">
                <img
                  className="w-full h-[150px] object-cover rounded"
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/120x150?text=No+Image'}
                  alt={actor.name}
                />
                <p className="text-sm mt-1">{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Where to Watch */}
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold mb-2">Where to Watch</h2>
        {providers.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {providers.map(provider => (
              <div key={provider.provider_id} className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                <img
                  src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-6 h-6"
                />
                <span>{provider.provider_name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No streaming platforms found yet.</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
