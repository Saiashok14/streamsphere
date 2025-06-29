import { useEffect, useRef, useState } from 'react';
import PageWrapper from './PageWrapper';

function extractYouTubeID(url) {
  const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : '';
}

function Browse() {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('videos');
    if (stored) {
      setVideos(JSON.parse(stored));
    }

    // Auto-focus search bar
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  const filteredVideos = videos.filter((video) => {
    const matchCategory = selectedCategory ? video.category === selectedCategory : true;
    const matchSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const extractYouTubeID = (url) => {
    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n]+)/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  return (
    <PageWrapper title="Browse All Available Videos">
      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded bg-white text-black outline-none"
        />
      </div>

      {/* 🎬 Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded ${selectedCategory === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setSelectedCategory('')}
        >
          All
        </button>
        {['Action', 'Comedy', 'Drama', 'Documentary'].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🎞 Video List */}
      {filteredVideos.length === 0 ? (
        <p className="text-center text-gray-400">No videos available.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => {
            const id = extractYouTubeID(video.url);
            return (
              <li key={index} className="p-4 border rounded shadow bg-gray-800 text-white">
                <h3 className="text-lg font-semibold mb-1">{video.title}</h3>
                <p className="text-sm text-gray-300 mb-3">{video.category}</p>
                { id ? (
  <div className="aspect-video mb-2">
  <iframe
    src={`https://www.youtube.com/embed/${extractYouTubeID(video.url)}`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className="w-full h-full rounded"
    title={video.title}
  ></iframe>
</div>

) : (
  <p className="text-red-400">Invalid YouTube URL</p>
)}

              </li>
            );
          })}
        </ul>
      )}
    </PageWrapper>
  );
}

export default Browse;
