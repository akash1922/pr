import "../css/Moviecard.css";
import { Link } from "react-router-dom"; // ✅ Import Link

function MovieCard({ movie }) {
    return (
        <Link to={`/movie/${movie.id}`} className="movie-link"> {/* ✅ Link to movie details */}
            <div className="movie-card">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date?.split("-")[0]}</p>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;
