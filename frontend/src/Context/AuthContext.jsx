import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/auth/me",
                {
                    withCredentials: true
                }
            );

            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const updateProfile = async (profileData) => {
        const response = await axios.put(
            "http://localhost:5000/api/auth/profile",
            profileData,
            {
                withCredentials: true
            }
        );

        setUser(response.data.user);

        return response.data;
    };

    const logout = async () => {
        await axios.post(
            "http://localhost:5000/api/auth/logout",
            {},
            {
                withCredentials: true
            }
        );

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                updateProfile,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);