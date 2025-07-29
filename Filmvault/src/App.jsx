import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Movies from './components/Movies';
import Watchlist from './components/Watchlist';
import Home from './components/Home';
import Banner from './components/Banner';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MovieDetails from './components/MovieDetails';

function App() {
  const [watchList, setWatchList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const moviesFromLocalStorage = localStorage.getItem('Filmvault');
    if (moviesFromLocalStorage) {
      setWatchList(JSON.parse(moviesFromLocalStorage));
    }
  }, []);

  const handleAddToWatchList = (movieObj) => {
    const newWatchList = [...watchList, movieObj];
    localStorage.setItem('Filmvault', JSON.stringify(newWatchList));
    setWatchList(newWatchList);
  };

  const handleRemoveFromWatchlist = (movieObj) => {
    const updatedWatchList = watchList.filter(movie => movie.id !== movieObj.id);
    localStorage.setItem('Filmvault', JSON.stringify(updatedWatchList));
    setWatchList(updatedWatchList);
  };

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/LoginPage" />;
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <NavBar />}
      <Routes>
        <Route path="/" element={<Navigate to="/LoginPage" />} />
        <Route path="/LoginPage" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />

        <Route path="/Movies" element={
          <PrivateRoute>
            <>
              <Banner />
              <Movies
                handleAddToWatchList={handleAddToWatchList}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                watchList={watchList}
              />
            </>
          </PrivateRoute>
        } />

        <Route path="/Watchlist" element={
          <PrivateRoute>
            <Watchlist
              watchList={watchList}
              setWatchList={setWatchList}
              handleRemoveFromWatchList={handleRemoveFromWatchlist}
            />
          </PrivateRoute>
        } />

        <Route path="/Home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        <Route path="/moviedetails/:id" element={
          <PrivateRoute>
            <MovieDetails
              watchList={watchList}
              handleAddToWatchList={handleAddToWatchList}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
