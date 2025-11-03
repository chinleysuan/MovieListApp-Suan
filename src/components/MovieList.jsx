import MovieCard from "./MovieCard";

export default function MovieList({ movies, onSelectMovie }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          onClick={() => onSelectMovie(movie)}
          className="cursor-pointer"
        >
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
