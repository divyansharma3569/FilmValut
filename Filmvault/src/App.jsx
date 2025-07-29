import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Movies from './components/Movies';
import Watchlist from './components/Watchlist';
import Home from './components/Home';
import Banner from './components/Banner';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ChangePassword from './components/ChangePassword';
import axios from 'axios';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const [watchList, setWatchList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const location = useLocation();
  const hideNavBar =
    location.pathname === '/LoginPage' || location.pathname === '/RegisterPage';

  function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/LoginPage" />;
  }

  useEffect(() => {
    const fetchWatchlist = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:3001/api/watchlist', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWatchList(res.data || []);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };
    fetchWatchlist();
  }, []);

  const handleAddToWatchList = async (movie) => {
    setWatchList((prev) => [...prev, movie]); 
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/api/watchlist/add',
        { movie },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Error adding movie:', err);
      setWatchList((prev) => prev.filter((m) => m.id !== movie.id));
    }
  };

  const handleRemoveFromWatchlist = async (movie) => {
    setWatchList((prev) => prev.filter((m) => m.id !== movie.id)); 
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/api/watchlist/remove',
        { movieId: movie.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Error removing movie:', err);
      setWatchList((prev) => [...prev, movie]);
    }
  };

  return (
    <>
      {!hideNavBar && isLoggedIn && <NavBar setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        <Route path="/" element={<Navigate to="/LoginPage" />} />
        <Route path="/LoginPage" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/Movies"
          element={
            <ProtectedRoute>
              <>
                <Banner />
                <Movies
                  handleAddToWatchList={handleAddToWatchList}
                  handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                  watchList={watchList}
                />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Watchlist"
          element={
            <ProtectedRoute>
              <Watchlist
                watchList={watchList}
                handleRemoveFromWatchList={handleRemoveFromWatchlist}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppWrapper;
