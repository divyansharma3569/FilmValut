import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Custom Left Arrow
const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }}
      onClick={onClick}
    />
  );
};

// Custom Right Arrow
const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }}
      onClick={onClick}
    />
  );
};

function Cards() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const TMDB_API_KEY = 'd570ed2297fd08d032fcd10e72e36d79';

  const fetchUpcomingMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      const movies = response.data.results;
      const filtered = movies.filter(movie => movie.poster_path);
      setUpcomingMovies(filtered);
    } catch (error) {
      console.error("❌ Failed to fetch upcoming movies", error);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />
  };

  return (
    <div className='h-100 bg-white p-5'>
      <div className='text-2xl m-3 font-bold text-center text-black'>
        Upcoming Movies
      </div>
      <div className='h-[55vh] w-30 m-auto'>
        <Slider {...settings}>
          {upcomingMovies.map((movie, index) => (
            <Link key={index} to={`/moviedetails/${movie.id}`}>
              <div className='relative bg-white'>
                <div className='relative'>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className='h-[55vh] w-full text-white text-xl text-center bg-center bg-cover rounded-xl'
                    alt={movie.title}
                  />
                  <div className='absolute bottom-0 left-0 w-full p-3 bg-gray-900/60 text-xl text-center rounded-b-xl text-white font-semibold'>
                    {movie.title}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Cards;
