import { useState, useEffect } from 'react';
import PageWrapper from './PageWrapper';

function Admin() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('videos');
    if (stored) setVideos(JSON.parse(stored));
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    const newVideo = { title, url, category };
    const updated = [...videos, newVideo];
    setVideos(updated);
    localStorage.setItem('videos', JSON.stringify(updated));
    setTitle('');
    setUrl('');
    setCategory('');
  };

  return (
    <PageWrapper title="Admin Panel - Upload Videos">
      <form onSubmit={handleUpload} className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl text-black">
        <h2 className="text-2xl font-bold mb-4 text-center">🛠 Upload New Video</h2>
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Documentary">Documentary</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      <div className="mt-8 text-white">
        <h3 className="text-xl font-semibold mb-2">📺 Uploaded Videos</h3>
        <ul className="space-y-2">
          {videos.map((video, index) => (
            <li key={index} className="p-3 border rounded shadow-sm bg-gray-800">
              <strong>{video.title}</strong> ({video.category})<br />
              <a href={video.url} className="text-blue-400" target="_blank" rel="noopener noreferrer">
                Watch ▶️
              </a>
            </li>
          ))}
        </ul>
      </div>
    </PageWrapper>
  );
}

export default Admin;
