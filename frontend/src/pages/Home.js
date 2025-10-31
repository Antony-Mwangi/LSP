import React from 'react';

const Home = () => {
    return (
        <div>
            <style>{`
                .home-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background: linear-gradient(135deg, #4a90e2, #9013fe);
                    color: white;
                    font-family: 'Poppins', sans-serif;
                    text-align: center;
                }

                .home-container h1 {
                    font-size: 2.8rem;
                    margin-bottom: 15px;
                    letter-spacing: 1px;
                    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
                }

                .home-container p {
                    font-size: 1.2rem;
                    max-width: 600px;
                    line-height: 1.6;
                    color: #f0f0f0;
                }
            `}</style>

            <div className="home-container">
                <h1>Welcome to the Home Page</h1>
                <p>This is the landing page of the application. Explore and discover amazing features built with React.</p>
            </div>
        </div>
    );
};

export default Home;
