import { useEffect, useState } from 'react';
import PageWrapper from './PageWrapper';

const TMDB_API_KEY = 'aa417ff1109d07bccd5d37f52c23ead9';
function Browse() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const categories = ['All', 'Action', 'Comedy', 'Drama', 'Documentary'];

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`);
      const data = await res.json();
      setMovies(data.results || []);
      setError('');
    } catch (err) {
      console.error('TMDB fetch error:', err);
      setError('❌ Failed to load movies.');
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
      const data = await res.json();
      setMovies(data.results || []);
      setError('');
    } catch (err) {
      console.error('Search failed:', err);
      setError('❌ Failed to search. Try again.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchSearchResults(searchTerm);
    } else {
      fetchTrending(); // fallback to trending
    }
  };

  const filterByCategory = (movie) => {
    if (category === 'All') return true;
    const genreMatch = movie.genre_ids?.includes(getGenreId(category));
    return genreMatch;
  };

  const getGenreId = (genreName) => {
    const genres = {
      Action: 28,
      Comedy: 35,
      Drama: 18,
      Documentary: 99,
    };
    return genres[genreName];
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <PageWrapper noTitle>
        {/* Search bar */}
        <div className="flex justify-center mt-4 mb-6">
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-2xl bg-white rounded overflow-hidden shadow-lg"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search movies..."
              className="flex-grow px-6 py-4 text-black text-lg focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 px-6 py-4 text-white text-lg font-semibold hover:bg-red-700"
            >
              🔍
            </button>
          </form>
        </div>

        {/* Category buttons */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded ${
                category === cat ? 'bg-red-600' : 'bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Movie grid */}
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : movies.length === 0 ? (
          <p className="text-center text-gray-400">Loading movies...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
            {movies.filter(filterByCategory).map((movie) => (
              <div key={movie.id} className="bg-gray-900 p-2 rounded shadow">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded w-full"
                  />
                ) : (
                  <div className="bg-gray-700 h-[300px] rounded flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <h3 className="mt-2 font-semibold text-sm">{movie.title}</h3>
              </div>
            ))}
          </div>
        )}
      </PageWrapper>
    </div>
  );
}

export default Browse;
