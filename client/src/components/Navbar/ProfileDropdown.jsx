import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileDropdown() {
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const username = user?.username || "User";

    const initial = username.charAt(0).toUpperCase();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleProfile = () => {
        setOpen(false);
        navigate("/profile");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setOpen(false);

        navigate("/login", {
            replace: true,
        });
    };

    return (
        <div
            className="profile-dropdown"
            ref={dropdownRef}
        >
            <button
                className="profile-avatar"
                onClick={() => setOpen(!open)}
                aria-label="Open profile menu"
            >
                {initial}
            </button>

            {open && (
                <div className="profile-menu">
                    <div className="profile-menu-header">
                        <div className="profile-menu-avatar">
                            {initial}
                        </div>

                        <div>
                            <strong>{username}</strong>

                            <span>
                                {user?.email || ""}
                            </span>
                        </div>
                    </div>

                    <div className="profile-menu-divider" />

                    <button
                        className="profile-menu-item"
                        onClick={handleProfile}
                    >
                        <span>Profile</span>
                    </button>

                    <button
                        className="profile-menu-item logout-item"
                        onClick={handleLogout}
                    >
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;