import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Admin from './Admin';
import Browse from './Browse';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';

function AppContent({ user, handleLogout }) {
  const location = useLocation();

  // Hide Navbar on these routes
  const hideNavbarRoutes = ['/login', '/signup'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && (
        <nav className="bg-gray-800 text-white p-4 flex justify-center gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/browse" className="hover:underline">Browse</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
          {!user && (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Signup</Link>
            </>
          )}
          {user && (
            <>
              <span className="text-green-300">Hello, {user.email}</span>
              <button onClick={handleLogout} className="hover:underline text-red-300">
                Logout
              </button>
            </>
          )}
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/browse" element={
          <ProtectedRoute>
            <Browse />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('currentUser'));
    if (loggedIn) setUser(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    window.location.href = '/'; // Reload and redirect
  };

  return (
    <Router>
      <AppContent user={user} handleLogout={handleLogout} />
    </Router>
  );
}

export default App;
