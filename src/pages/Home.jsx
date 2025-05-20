import 'react-toastify/dist/ReactToastify.css';
import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';
import "../css/Home.css";
import { searchMovies, getPopularMovies, getUpcomingMovies } from "../services/api";
import Toast from '../components/Toast';

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [popularMovies, upcoming] = await Promise.all([
          getPopularMovies(),
          getUpcomingMovies()
        ]);

        setMovies(popularMovies);
        setUpcomingMovies(upcoming);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();

    const randomNames = ["RVCJ", "Tube.Indian", "WLDD", "OpraahFX"];
    const random = randomNames[Math.floor(Math.random() * randomNames.length)];
    setToastMessage(`${random} just contacted for movie promotion🤑`);
    setShowToast(true);

    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("failed to search movies...");
    } finally {
      setLoading(false);
    }

    setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies.."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          SEARCH
        </button>
      </form>

      {error && <div className="error-message">{error}</div>} 

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          {upcomingMovies.length > 0 && (
            <div className="upcoming-section">
              <h2>Upcoming Movies</h2>
              <div className="movies-grid">
                {upcomingMovies.map((movie) => (
                  <MovieCard movie={movie} key={`upcoming-${movie.id}`} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}

export default Home;
