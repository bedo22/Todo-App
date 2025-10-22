import { useEffect,useState } from "react";

export function useTheme(){
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );
    useEffect(() => {
        const root =window.document.documentElement;
        theme === "dark" 
            ? root.classList.add("dark") 
            : root.classList.remove("dark");
        localStorage.setItem("theme", theme)
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }
    return {theme, toggleTheme};
}