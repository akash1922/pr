import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/MovieDetails.css";
import { getMovieDetails, getMovieVideos } from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);

        const videoData = await getMovieVideos(id);
        const trailer = videoData.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer?.key || null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie details or trailer.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return null;

  return (
    <div className="movie-details">
      <div className="poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </div>

      <div className="info">
        <h1>{movie.title}</h1>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Duration:</strong> {movie.runtime} minutes</p>
        <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
        <p><strong>Overview:</strong> {movie.overview}</p>

        {trailerKey && (
          <div className="trailer">
            <h2>Watch Trailer</h2>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Movie Trailer"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
