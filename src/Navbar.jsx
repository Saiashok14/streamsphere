// src/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      setUser(storedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/" className="text-red-500">STREAM</Link>
        <span>SPHERE</span>
      </div>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        {!user && <Link to="/login" className="hover:underline">Login</Link>}
        {!user && <Link to="/signup" className="hover:underline">Signup</Link>}
        {user && <Link to="/browse" className="hover:underline">Browse</Link>}
        {user && <Link to="/admin" className="hover:underline">Admin</Link>}
        {user && <span className="text-green-400">Hello, {user.email.split('@')[0]}</span>}
        {user && (
          <button
            onClick={handleLogout}
            className="text-red-400 hover:underline"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
