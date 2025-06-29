import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Banner */}
      <div
        className="relative h-[75vh] bg-cover bg-center"
        style={{
        backgroundImage: `url('https://wallpaperaccess.com/full/3295833.jpg')`,



        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
        <div className="absolute bottom-10 left-10">
          {/* ✅ Animated Logo */}
          <h1 className="text-6xl font-black text-white drop-shadow-lg mb-4">
            <span className="text-red-600 animate-pulse">STREAM</span>
            <span className="text-white">SPHERE</span>
          </h1>

          <p className="text-xl mb-6">Unlimited Entertainment, Anytime, Anywhere.</p>
          <Link
            to="/signup"
            className="bg-red-600 px-6 py-3 text-white font-semibold rounded hover:bg-red-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Trending Movies (Placeholder Boxes) */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">🔥 Trending Now</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-700 h-40 rounded-lg shadow hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
