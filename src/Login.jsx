import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from './PageWrapper';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ email }));
      navigate('/browse');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <PageWrapper title="Login to STREAMSPHERE">
      <form onSubmit={handleLogin} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-black">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Login
        </button>
      </form>
    </PageWrapper>
  );
}

export default Login;
