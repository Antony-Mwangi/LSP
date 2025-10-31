import { useState, useEffect } from 'react';
import { getUser, loginUser, logoutUser } from '../services/authService';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getUser();
            setUser(currentUser);
            setLoading(false);
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        const loggedInUser = await loginUser(email, password);
        setUser(loggedInUser);
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return { user, loading, login, logout };
};

export default useAuth;