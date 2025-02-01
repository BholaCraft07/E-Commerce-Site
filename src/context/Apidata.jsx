'use client'
import React, { createContext, useContext, useCallback, useState } from 'react';

// Create the Context
const ApiContext = createContext();

// Base URL
const BASE_URL = 'https://dummyjson.com';

// Provider Component
export const ApiProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Function to make API requests
    const fetchData = useCallback(async (endpoint, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers, // Pass any custom headers
                },
                ...options, // Pass additional options like method, body, etc.
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            setError(error.message || 'An error occurred'); 
            console.error('API Fetch Error:', error);
            throw error; // Re-throw error to be handled in consuming components
        }
    }, []);

    return (
        <ApiContext.Provider value={{ fetchData,loading,error}}>
            {children}
        </ApiContext.Provider>
    );
};

// Custom Hook for Using the API Context
export const useApi = () => {
    return useContext(ApiContext);
};
