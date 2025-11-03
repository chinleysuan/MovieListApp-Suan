import { useEffect, useState } from "react";

const API_URL = "http://www.omdbapi.com?apikey=894c3be2";

export default function MovieDetails({ movie, onBack, onToggleFavorite, favorites }) {
  const [details, setDetails] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(`${API_URL}&i=${movie.imdbID}&plot=full`);
      const data = await response.json();
      setDetails(data);

      const relatedRes = await fetch(`${API_URL}&s=${movie.Title.split(" ")[0]}`);
      const relatedData = await relatedRes.json();
      if (relatedData.Search) setRelatedMovies(relatedData.Search.slice(0, 6));
    };
    fetchDetails();
  }, [movie]);

  if (!details)
    return <p className="text-center mt-10 text-gray-600">Loading movie details...</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === "") return;
    setFeedbackList([...feedbackList, feedback]);
    setFeedback("");
  };


  const isChildFriendly = () => {
    const rating = details.Rated?.toUpperCase();
    return rating === "G" || rating === "PG" || rating === "PG-13";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-6">
      <button
        onClick={onBack}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={details.Poster !== "N/A" ? details.Poster : "https://via.placeholder.com/300x450"}
          alt={details.Title}
          className="w-full md:w-1/3 rounded-lg"
        />

        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{details.Title}</h2>
          <p><strong>Genre:</strong> {details.Genre}</p>
          <p><strong>Country:</strong> {details.Country}</p>
          <p><strong>Released:</strong> {details.Released}</p>
          <p><strong>Director:</strong> {details.Director}</p>
          <p><strong>Cast:</strong> {details.Actors}</p>
          <p><strong>Quality:</strong> HD</p>
          <p><strong>Rating:</strong> ⭐ {details.imdbRating}</p>
          <p><strong>Rated:</strong> {details.Rated || "N/A"}{" "}
            {isChildFriendly() ? (
              <span className="text-green-600 ml-1">(Good for children)</span>
            ) : (
              <span className="text-red-600 ml-1">( Not for children)</span>
            )}
          </p>
          <p className="mt-2 text-gray-700"><strong>Plot:</strong> {details.Plot}</p>

          <div className="flex gap-3 mt-3">
            <button
              onClick={() =>
                window.open(
                  `https://www.youtube.com/results?search_query=${details.Title}+trailer`,
                  "_blank"
                )
              }
              className="bg-[#BBC863] text-white px-4 py-2 rounded-md hover:bg-[#31694E]"
            >
              🎬 Watch Trailer
            </button>

            <button
              onClick={() => onToggleFavorite(details)}
              className={`text-2xl ${isFavorite ? "text-red-500" : "text-gray-400"} hover:scale-110`}
            >
              ♥
            </button>
          </div>
        </div>
      </div>

   
      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Rate "{details.Title}"</h3>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="ml-4 bg-[#F0E491] text-white px-3 py-1 rounded-md hover:bg-[#BBC863]"
            >
              Submit
            </button>
          </form>
        ) : (
          <p className="text-green-600 mt-2">
            You rated this movie {rating} star{rating > 1 ? "s" : ""}!
          </p>
        )}
      </div>

 
      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Give Feedback</h3>
        <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-2">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback about this movie..."
            className="border border-gray-300 p-2 rounded-md w-full h-24 resize-none"
          ></textarea>
          <button
            type="submit"
            className="self-end bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
          >
            Submit Feedback
          </button>
        </form>

        {feedbackList.length > 0 && (
          <div className="mt-3">
            <h4 className="font-medium mb-1">User Feedbacks:</h4>
            <ul className="space-y-2">
              {feedbackList.map((fb, index) => (
                <li key={index} className="bg-white p-2 rounded shadow-sm border">
                  {fb}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

     
      <h3 className="text-xl font-semibold mt-8 mb-3">Related Movies</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {relatedMovies.map((rel) => (
          <div key={rel.imdbID} className="bg-gray-50 p-2 rounded-lg shadow-sm hover:shadow-md">
            <img
              src={rel.Poster !== "N/A" ? rel.Poster : "https://via.placeholder.com/150"}
              alt={rel.Title}
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="text-sm mt-2 font-medium text-center">{rel.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
