import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log('login', { email, password });
    navigate('/');
  }

  return (
    <div>
      <style>{`
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #4f46e5, #6d28d9);
          font-family: 'Poppins', sans-serif;
        }
        .login-container {
          background-color: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          width: 360px;
          text-align: center;
        }
        .login-container h2 {
          color: #333;
          margin-bottom: 25px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        label {
          text-align: left;
          font-weight: 500;
          color: #555;
          margin-bottom: 5px;
        }
        input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          transition: 0.3s ease;
        }
        input:focus {
          border-color: #4f46e5;
          outline: none;
          box-shadow: 0 0 5px rgba(79, 70, 229, 0.3);
        }
        button {
          background-color: #4f46e5;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #4338ca;
        }
      `}</style>

      <div className="login-page">
        <div className="login-container">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
