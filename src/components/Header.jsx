import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

function Header({
  onGenreSelect,
  onCategorySelect,
  onYearSelect,
  onRatingSelect,
  onHomeClick,
  onShowFavorites,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Animation"];
  const categories = ["movie", "series"];
  const years = ["2025", "2024", "2023", "2022", "2021", "2020"];
  const ratings = ["G", "PG", "PG-13", "R", "Not Rated"];

  const toggleDropdown = (name) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  return (
    <header className="bg-[#84994F] text-white w-full shadow-md relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
      
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onHomeClick}>
          <img
            src="MovieLogo.png"
            alt="App Logo"
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <h1 className="text-2xl sm:text-4xl font-bold">Movie Mood</h1>
        </div>

       
        <nav className="hidden md:flex space-x-6 text-lg font-medium relative">
          <button onClick={onHomeClick} className="hover:text-gray-200">
            Home
          </button>
          <button onClick={onShowFavorites} className="hover:text-gray-200">
            Favorites
          </button>

         
          <div className="relative">
            <button
              onClick={() => toggleDropdown("genre")}
              className="flex items-center hover:text-gray-200"
            >
              Genre <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {dropdownOpen === "genre" && (
              <div className="absolute bg-[#748842] mt-2 rounded-md shadow-md w-40 z-10">
                {genres.map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      onGenreSelect(g);
                      setDropdownOpen(null);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-[#5e6e35]"
                  >
                    {g}
                  </button>
                ))}
              </div>
            )}
          </div>

      
          <div className="relative">
            <button
              onClick={() => toggleDropdown("category")}
              className="flex items-center hover:text-gray-200"
            >
              Category <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {dropdownOpen === "category" && (
              <div className="absolute bg-[#748842] mt-2 rounded-md shadow-md w-40 z-10">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onCategorySelect(c);
                      setDropdownOpen(null);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-[#5e6e35]"
                  >
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

      
          <div className="relative">
            <button
              onClick={() => toggleDropdown("year")}
              className="flex items-center hover:text-gray-200"
            >
              Year <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {dropdownOpen === "year" && (
              <div className="absolute bg-[#748842] mt-2 rounded-md shadow-md w-32 z-10">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => {
                      onYearSelect(y);
                      setDropdownOpen(null);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-[#5e6e35]"
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>

          
          <div className="relative">
            <button
              onClick={() => toggleDropdown("rating")}
              className="flex items-center hover:text-gray-200"
            >
              Rating <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {dropdownOpen === "rating" && (
              <div className="absolute bg-[#748842] mt-2 rounded-md shadow-md w-40 z-10">
                {ratings.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onRatingSelect(r);
                      setDropdownOpen(null);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-[#5e6e35]"
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

     
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
