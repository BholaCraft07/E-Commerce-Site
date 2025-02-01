// 'use client'
// import { createContext, useContext, useEffect, useState } from 'react';

// const ThemeContext = createContext();
// export function ThemeProvider({ children }) {
//     const [isDarkMode, setIsDarkMode] = useState(false);
//     const toggleDarkMode = () => {
//         setIsDarkMode(!isDarkMode);
//     };
//     useEffect(() => {
//         if (isDarkMode) {
//             document.body.classList.add('dark');
//         } else {
//             document.body.classList.remove('dark');
//         }
//     }, [isDarkMode]);
//     console.log(isDarkMode)
//     return (
//         <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// }
// export function useTheme() {
//     return useContext(ThemeContext);
// }

'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode((prevState) => !prevState);
    };

    useEffect(() => {
        // Retrieve dark mode state from localStorage
        const storedTheme = localStorage.getItem('isDarkMode');

        if (storedTheme) {
            setIsDarkMode(JSON.parse(storedTheme)); // Set theme state based on localStorage value
        }
    }, []);

    useEffect(() => {
        // Store the theme preference in localStorage whenever it changes
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));

        // Apply the theme class to the body
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
