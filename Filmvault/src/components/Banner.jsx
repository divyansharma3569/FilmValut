import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const TMDB_API_KEY = 'd570ed2297fd08d032fcd10e72e36d79';

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`
      );
      const movies = response.data.results;

      // Pick 5 random movies from the list
      const shuffled = [...movies].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);

      // Map to objects with ID and banner info
      const bannerData = selected.map(movie => ({
        id: movie.id,
        url: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        title: movie.title || movie.name,
        overview: movie.overview
      }));

      setSlides(bannerData);
    } catch (error) {
      console.error("Failed to fetch banner movies", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  if (slides.length === 0) {
    return <div className="text-white text-xl text-center mt-10">Loading banners...</div>;
  }

  return (
    <div className='h-[75vh] w-[1425px] rounded-3xl m-auto relative group overflow-hidden'>
      <div
        onClick={() => navigate(`/moviedetails/${slides[currentIndex].id}`)}
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500 cursor-pointer'
      >
        <div className="bg-black/50 w-full h-full flex flex-col justify-end p-10 rounded-2xl">
          <h2 className="text-3xl text-white font-bold mb-2">
            {slides[currentIndex].title}
          </h2>
          <p className="text-white text-sm max-w-2xl">
            {slides[currentIndex].overview}
          </p>
        </div>
      </div>

      {/* Left Arrow */}
      <div
        className='hidden group-hover:block absolute top-[45%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
        onClick={prevSlide}
      >
        <i className="fa-solid fa-backward"></i>
      </div>

      {/* Right Arrow */}
      <div
        className='hidden group-hover:block absolute top-[45%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
        onClick={nextSlide}
      >
        <i className="fa-solid fa-forward"></i>
      </div>
    </div>
  );
}

export default Banner;
