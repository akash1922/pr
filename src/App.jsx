
import { useEffect, useState } from 'react';
import './css/theme.css'; 
import Navbar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContext';
import Footer from './components/Footer';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Upcoming from './pages/Upcoming';  
import AnnouncementBar from './components/AnnouncementBar';
import MovieDetails from './pages/Moviedetails';
import HindiMovies from './pages/Hindimovies';


function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <MovieProvider>
      <div>
        <AnnouncementBar /> 
        <Navbar onToggleTheme={toggleTheme} currentTheme={theme} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />  
            <Route path="/upcoming" element={<Upcoming />} />  
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/hindi" element={<HindiMovies />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;
