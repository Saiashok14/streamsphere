import { useEffect, useState } from 'react';
import PageWrapper from './PageWrapper';

const API_KEY = 'AIzaSyAe0fwNQ9hJINaNvEl4Po0J2htb4inl3W8';

function Browse() {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState('Action');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const categories = ['Action', 'Comedy', 'Drama', 'Documentary'];

  useEffect(() => {
    fetchVideos(category);
  }, [category]);

  const fetchVideos = async (query) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&q=${query}+movies&type=video&key=${API_KEY}`
      );
      const data = await res.json();
      setVideos(data.items || []);
      setCurrentVideoId(null); // Stop current playing
    } catch (err) {
      console.error('Failed to fetch videos:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchVideos(searchTerm);
    }
  };

  const handlePlay = (videoId) => {
    setCurrentVideoId(videoId);

    setTimeout(() => {
      const iframe = document.getElementById(`iframe-${videoId}`);
      if (iframe?.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe?.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <PageWrapper noTitle>
        {/* 🔍 Big Search Bar */}
        <div className="flex justify-center mt-6 mb-8">
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-3xl bg-white rounded overflow-hidden shadow-lg"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for videos..."
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

        {/* 🎞️ Category Buttons */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded ${
                category === cat ? 'bg-red-600 text-white' : 'bg-gray-700 text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🎥 Videos */}
        {videos.length === 0 ? (
          <p className="text-center text-gray-400">Loading videos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
            {videos.map((video) => {
              const videoId = video.id.videoId;
              const isPlaying = videoId === currentVideoId;

              return (
                <div
                  key={videoId}
                  className="bg-gray-900 text-white p-2 rounded shadow hover:scale-105 transition cursor-pointer"
                  onClick={() => handlePlay(videoId)}
                >
                  {isPlaying ? (
                    <iframe
                      id={`iframe-${videoId}`}
                      width="100%"
                      height="200"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                      title={video.snippet.title}
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      className="rounded"
                    />
                  ) : (
                    <img
                      src={video.snippet.thumbnails?.medium?.url}
                      alt={video.snippet.title}
                      className="w-full h-[200px] object-cover rounded"
                    />
                  )}
                  <h3 className="mt-2 font-semibold text-sm">{video.snippet.title}</h3>
                </div>
              );
            })}
          </div>
        )}
      </PageWrapper>
    </div>
  );
}

export default Browse;
