import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log('register', { username, email, password });
    navigate('/login'); // redirect after register
  }

  return (
    <div>
      {/* Internal CSS */}
      <style>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
          font-family: 'Poppins', sans-serif;
        }

        .register-box {
          background: #fff;
          padding: 40px 50px;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .register-box h2 {
          margin-bottom: 25px;
          color: #333;
          font-size: 26px;
          font-weight: 600;
        }

        .register-form label {
          display: block;
          text-align: left;
          font-weight: 500;
          margin-bottom: 8px;
          color: #444;
        }

        .register-form input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 20px;
          outline: none;
          transition: all 0.3s ease;
        }

        .register-form input:focus {
          border-color: #667eea;
          box-shadow: 0 0 4px rgba(102, 126, 234, 0.4);
        }

        .register-btn {
          width: 100%;
          padding: 12px;
          background-color: #667eea;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .register-btn:hover {
          background-color: #5563d6;
        }

        @media (max-width: 480px) {
          .register-box {
            padding: 30px 25px;
          }
          .register-box h2 {
            font-size: 22px;
          }
        }
      `}</style>

      <div className="register-container">
        <div className="register-box">
          <h2>Create Account</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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
                minLength={6}
              />
            </div>

            <button className="register-btn" type="submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
