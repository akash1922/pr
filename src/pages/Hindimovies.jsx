import { useState, useEffect } from 'react';
import MovieCard from '../components/Moviecard';
import { getHindiMovies } from '../services/api';  

function HindiMovies() {
  const [hindiMovies, setHindiMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHindiMovies = async () => {
      try {
        const data = await getHindiMovies();
        setHindiMovies(data);
      } catch (err) {
        setError("Failed to load Hindi movies...");
      } finally {
        setLoading(false);
      }
    };

    loadHindiMovies();
  }, []);

  return (
    <div className="hindi-movies">
      <h1>Hindi Movies</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className="movies-grid">
        {hindiMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default HindiMovies;
