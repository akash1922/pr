
import { useState, useEffect } from 'react';
import MovieCard from '../components/Moviecard';
import { getUpcomingMovies } from '../services/api'; 

function Upcoming() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUpcomingMovies = async () => {
      try {
        const data = await getUpcomingMovies();
        setUpcomingMovies(data);
      } catch (err) {
        setError("Failed to load upcoming movies...");
      } finally {
        setLoading(false);
      }
    };

    loadUpcomingMovies();
  }, []);

  return (
    <div className="upcoming">
      <h1>Upcoming Movies</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className="movies-grid">
        {upcomingMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Upcoming;
