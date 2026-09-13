import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { googleVerifyUser } from "../services/auth.service";

const GoogleVerify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const googleButtonRef = useRef(null);

    const expectedEmail = location.state?.email;

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!expectedEmail) {
            navigate("/login");
            return;
        }

        const loadGoogleScript = () => {
            if (window.google) {
                initializeGoogle();
                return;
            }

            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;

            script.onload = initializeGoogle;

            document.body.appendChild(script);
        };

        const initializeGoogle = () => {
            if (!window.google || !googleButtonRef.current) {
                return;
            }

            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

                callback: async (response) => {
                    try {
                        setLoading(true);
                        setError("");

                        const result = await googleVerifyUser(
                            response.credential,
                            expectedEmail
                        );

                        localStorage.setItem(
                            "token",
                            result.data.token
                        );

                        localStorage.setItem(
                            "user",
                            JSON.stringify(result.data.user)
                        );

                        navigate("/dashboard");
                    } catch (err) {
                        setError(
                            err.response?.data?.message ||
                            "Google verification failed."
                        );
                    } finally {
                        setLoading(false);
                    }
                },
            });

            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                {
                    theme: "outline",
                    size: "large",
                    width: 300,
                    text: "signin_with",
                }
            );
        };

        loadGoogleScript();
    }, [expectedEmail, navigate]);

    return (
        <div>
            <h2>Verify Your Account</h2>

            <p>
                Sign in with Google using:
            </p>

            <strong>{expectedEmail}</strong>

            <div ref={googleButtonRef}></div>

            {loading && <p>Verifying...</p>}

            {error && <p>{error}</p>}
        </div>
    );
};

export default GoogleVerify;