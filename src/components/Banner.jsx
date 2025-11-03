import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Banner({ movies }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (movies.length <= 1 || paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [movies.length, paused]);

  if (!movies.length) return null;
  const movie = movies[index];

  const posterUrl =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster.replace("SX300", "SX1080")
      : "https://via.placeholder.com/1280x720?text=No+Image";

 
  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    movie.Title + " trailer"
  )}`;

  const handleNext = () => setIndex((prev) => (prev + 1) % movies.length);
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + movies.length) % movies.length);

  return (
    <div
      className="relative w-[90%] mx-auto mt-12 h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-xl transition-all duration-500"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
     
      <div
        className="block w-full h-full"
        style={{
          backgroundImage: `url(${posterUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(90%)",
          transition: "transform 0.6s ease-in-out",
        }}
      >
     
        <div className="absolute inset-0  from-black/90 via-black/60 to-transparent"></div>

       
        <div className="absolute bottom-10 left-10 text-white max-w-xl">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg tracking-wide">
            {movie.Title}
          </h2>
          <p className="text-gray-300 text-sm md:text-lg mb-4">
            {movie.Year} • {movie.Type?.toUpperCase() || "MOVIE"}
          </p>
      
          <button
            onClick={() => window.open(trailerUrl, "_blank")}
            className="bg-[#BBC863] hover:bg-[#31694E] transition px-6 py-2 rounded-md font-semibold shadow-lg"
          >
            Watch Trailer
          </button>
        </div>
      </div>

     
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

    
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

     
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.slice(0, 5).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
