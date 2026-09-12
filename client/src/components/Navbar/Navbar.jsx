import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import ProfileDropdown from "./ProfileDropdown";
import NotificationBell from "../Notifications/NotificationBell";

import "./Navbar.css";

function Navbar() {
    const [needsMobileMenu, setNeedsMobileMenu] =
        useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    const navbarRef = useRef(null);
    const measureLinksRef = useRef(null);
    const actionsRef = useRef(null);

    useEffect(() => {
        const checkNavbarSpace = () => {
            const navbar = navbarRef.current;
            const links = measureLinksRef.current;
            const actions = actionsRef.current;

            if (!navbar || !links || !actions) {
                return;
            }

            const navbarWidth = navbar.clientWidth;
            const logoWidth =
                navbar.querySelector(".navbar-logo")
                    ?.offsetWidth || 190;

            const linksWidth = links.scrollWidth;
            const actionsWidth = actions.scrollWidth;

            const requiredWidth =
                logoWidth +
                linksWidth +
                actionsWidth +
                80;

            const shouldUseMenu =
                navbarWidth < requiredWidth;

            setNeedsMobileMenu(shouldUseMenu);

            if (!shouldUseMenu) {
                setMenuOpen(false);
            }
        };

        checkNavbarSpace();

        const resizeObserver =
            new ResizeObserver(checkNavbarSpace);

        if (navbarRef.current) {
            resizeObserver.observe(
                navbarRef.current
            );
        }

        window.addEventListener(
            "resize",
            checkNavbarSpace
        );

        return () => {
            resizeObserver.disconnect();

            window.removeEventListener(
                "resize",
                checkNavbarSpace
            );
        };
    }, []);

    return (
        <nav
            className="navbar"
            ref={navbarRef}
        >
            <div className="navbar-logo">
                <img
                    src="/logo.png"
                    alt="CP Analytics"
                />
            </div>

            {/* Hidden measurement copy.
                This allows us to calculate the natural
                width of the navigation links even when
                the hamburger menu is being used. */}
            <div
                ref={measureLinksRef}
                className="navbar-links navbar-links-measure"
                aria-hidden="true"
            >
                <NavLink to="/dashboard">
                    Home
                </NavLink>

                <NavLink to="/performance">
                    Performance
                </NavLink>

                <NavLink to="/contests">
                    Contests
                </NavLink>

                <NavLink to="/dashboards">
                    Dashboards
                </NavLink>
            </div>

            {!needsMobileMenu && (
                <div className="navbar-links">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/performance"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Performance
                    </NavLink>

                    <NavLink
                        to="/contests"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Contests
                    </NavLink>

                    <NavLink
                        to="/dashboards"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Dashboards
                    </NavLink>
                </div>
            )}

            <div
                className="navbar-actions"
                ref={actionsRef}
            >
                {needsMobileMenu && (
                    <button
                        type="button"
                        className="navbar-menu-button"
                        onClick={() =>
                            setMenuOpen(
                                !menuOpen
                            )
                        }
                        aria-label={
                            menuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                )}

                <NotificationBell />

                <ProfileDropdown />
            </div>

            {needsMobileMenu && menuOpen && (
                <div className="navbar-mobile-menu">
                    <NavLink
                        to="/dashboard"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/performance"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Performance
                    </NavLink>

                    <NavLink
                        to="/contests"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Contests
                    </NavLink>

                    <NavLink
                        to="/dashboards"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Dashboards
                    </NavLink>
                </div>
            )}
        </nav>
    );
}

export default Navbar;