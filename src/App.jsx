import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";
import Banner from "./components/Banner"; 

const API_URL = "http://www.omdbapi.com?apikey=894c3be2";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchMovies = async (query, type = "", year = "") => {
    try {
      let url = `${API_URL}&s=${query}`;
      if (type) url += `&type=${type}`;
      if (year) url += `&y=${year}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.Response === "True" ? data.Search : [];
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(`${API_URL}&i=${imdbID}`);
      const data = await response.json();
      return data.Response === "True" ? data : null;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadDefaultMovies = async () => {
      const defaultMovies = await fetchMovies("Avengers");
      setMovies(defaultMovies);
    };
    loadDefaultMovies();
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;
    const found = await fetchMovies(searchTerm);
    setMovies(found);
    setSelectedMovie(null);
  };

  const handleGenreSelect = async (genre) => {
    setMovies(await fetchMovies(genre));
    setSelectedMovie(null);
  };

  const handleCategorySelect = async (category) => {
    setMovies(await fetchMovies("star", category));
    setSelectedMovie(null);
  };

  const handleYearSelect = async (year) => {
    setMovies(await fetchMovies("love", "", year));
    setSelectedMovie(null);
  };

  const handleRatingSelect = async (rating) => {
    const generalMovies = await fetchMovies("movie");
    const detailed = await Promise.all(
      generalMovies.map((m) => fetchMovieDetails(m.imdbID))
    );

    const valid = detailed.filter((m) => m && m.Rated);
    const filtered = valid.filter(
      (m) => m.Rated.toUpperCase().includes(rating.toUpperCase())
    );

    if (filtered.length > 0) {
      setMovies(filtered);
    } else {
      setMovies(valid.slice(0, 10));
    }

    setSelectedMovie(null);
  };

  const handleHomeClick = () => {
    fetchMovies("Avengers").then(setMovies);
    setSearchTerm("");
    setSelectedMovie(null);
  };

  const handleToggleFavorite = (movie) => {
    const exists = favorites.find((fav) => fav.imdbID === movie.imdbID);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-gray-800">
      <Header
        onGenreSelect={handleGenreSelect}
        onCategorySelect={handleCategorySelect}
        onYearSelect={handleYearSelect}
        onRatingSelect={handleRatingSelect}
        onHomeClick={handleHomeClick}
        onShowFavorites={() => setMovies(favorites)}
      />

      <div className="w-full">
        {selectedMovie ? (
          <MovieDetails
            movie={selectedMovie}
            onBack={() => setSelectedMovie(null)}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
        ) : (
          <>
            
           <Banner movies={movies} />


            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
            />

            {movies.length > 0 ? (
              <MovieList movies={movies} onSelectMovie={setSelectedMovie} />
            ) : (
              <p className="mt-10 text-gray-600 text-center">No movies found</p>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
