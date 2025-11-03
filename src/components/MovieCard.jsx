function MovieCard({ movie, onSelectMovie }) {
  const openTrailer = (e) => {
    e.stopPropagation();
    const query = encodeURIComponent(`${movie.Title} trailer site:youtube.com`);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  };

  return (
    <div
      onClick={() => onSelectMovie(movie)}
      className="bg-white shadow rounded-lg p-3 text-center transition-transform transform hover:scale-105 cursor-pointer"
    >
      <img
        src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/images/fallback.jpg"}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded-md"
      />
      <h2 className="font-bold mt-2 text-lg">{movie.Title}</h2>
      <p className="text-sm text-gray-600">{movie.Year}</p>

      <button
        onClick={openTrailer}
        className="mt-2 bg-[#BBC863] text-white px-3 py-1 rounded hover:bg-[#31694E]"
      >
        Watch Trailer
      </button>
    </div>
  );
}

export default MovieCard;
