import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from './PageWrapper';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find((u) => u.email === email);
    if (exists) {
      alert('User already exists');
      return;
    }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ email }));
    navigate('/browse');
  };

  return (
    <PageWrapper title="Create a STREAMSPHERE account">
      <form onSubmit={handleSignup} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-black">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Sign Up
        </button>
      </form>
    </PageWrapper>
  );
}

export default Signup;
