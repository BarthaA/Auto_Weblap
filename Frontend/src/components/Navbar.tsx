import { CgDarkMode } from "react-icons/cg";
import { useState } from "react";

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("dark-theme", !isDarkMode);
    };
    return (
        <>
            <nav>
                <ul>
                    <a href="/">Főoldal</a>
                    <a href="/autolista">Lista</a>
                    <a href="/autofelvetel">Felvétel</a>
                    <a href="/admin">Admin</a>
                </ul>
                <div className="mode-wrap">
                    <div className="center">
                        <input
                            type="checkbox"
                            name="ld-switch"
                            id="ld-switch"
                            hidden
                            checked={isDarkMode}
                            onChange={toggleTheme}
                        />
                        <label htmlFor="ld-switch" className="button"></label>
                    </div>
                    <CgDarkMode className="icon" size={40} />
                </div>
            </nav>
        </>
    );
};

export default Navbar;
