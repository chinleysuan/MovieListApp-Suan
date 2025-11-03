import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function Favorites({ onSelectMovie }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((m) => m.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <Heart className="mx-auto w-12 h-12 text-gray-400 mb-3" />
        <p>No favorites yet 💔</p>
        <p className="text-sm mt-2">Heart some movies to save them here!</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-[#374151] mb-6">❤️ My Favorite Movies</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {favorites.map((movie) => (
          <div
            key={movie.imdbID}
            className="relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
              alt={movie.Title}
              className="w-full h-64 object-cover cursor-pointer"
              onClick={() => onSelectMovie(movie.imdbID)}
            />
            <div className="p-3 text-center">
              <h3 className="text-sm font-semibold text-gray-800 truncate">{movie.Title}</h3>
              <p className="text-xs text-gray-500">{movie.Year}</p>
            </div>
            <button
              onClick={() => removeFavorite(movie.imdbID)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-red-100"
            >
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
