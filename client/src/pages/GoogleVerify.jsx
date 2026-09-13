import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { googleVerifyUser } from "../services/auth.service";

function GoogleVerify() {
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

        const initializeGoogle = () => {
            if (!window.google || !googleButtonRef.current) {
                return;
            }

            window.google.accounts.id.initialize({
                client_id:
                    import.meta.env.VITE_GOOGLE_CLIENT_ID,

                callback: async (response) => {
                    try {
                        setLoading(true);
                        setError("");

                        const result =
                            await googleVerifyUser(
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

            googleButtonRef.current.innerHTML = "";

            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                {
                    theme: "outline",
                    size: "large",
                    width: 300,
                    text: "signin_with",
                    shape: "rectangular",
                }
            );
        };

        const loadGoogleScript = () => {
            if (window.google) {
                initializeGoogle();
                return;
            }

            const existingScript =
                document.querySelector(
                    'script[src="https://accounts.google.com/gsi/client"]'
                );

            if (existingScript) {
                existingScript.addEventListener(
                    "load",
                    initializeGoogle
                );
                return;
            }

            const script =
                document.createElement("script");

            script.src =
                "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.onload = initializeGoogle;

            document.body.appendChild(script);
        };

        loadGoogleScript();
    }, [expectedEmail, navigate]);

    return (
        <>
            <style>{`
                html,
                body,
                #root {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                }

                * {
                    box-sizing: border-box;
                }

                body {
                    overflow: hidden;
                }

                .google-page {
                    width: 100%;
                    height: 100vh;
                    height: 100dvh;

                    position: relative;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    overflow: hidden;

                    background-image:
                        linear-gradient(
                            rgba(255, 255, 255, 0.08),
                            rgba(255, 255, 255, 0.08)
                        ),
                        url("/background.png");

                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }

                .google-overlay {
                    position: absolute;
                    inset: 0;

                    background: rgba(
                        255,
                        255,
                        255,
                        0.03
                    );

                    pointer-events: none;
                }

                .google-content {
                    position: relative;
                    z-index: 2;

                    width: min(92vw, 420px);

                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    transform: translateY(
                        clamp(0px, 1vh, 10px)
                    );
                }

                .google-card {
                    width: 100%;

                    padding: clamp(
                        24px,
                        3.5vh,
                        32px
                    );

                    border-radius: 20px;

                    background: rgba(
                        255,
                        255,
                        255,
                        0.88
                    );

                    border: 1px solid rgba(
                        255,
                        255,
                        255,
                        0.85
                    );

                    box-shadow:
                        0 18px 50px rgba(
                            40,
                            35,
                            25,
                            0.18
                        ),
                        0 4px 14px rgba(
                            40,
                            35,
                            25,
                            0.10
                        );

                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);

                    text-align: center;
                }

                .google-logo {
                    display: block;

                    width: clamp(
                        155px,
                        22vw,
                        205px
                    );

                    max-height: 65px;

                    object-fit: contain;

                    margin: 0 auto clamp(
                        14px,
                        2.5vh,
                        22px
                    );
                }

                .google-header {
                    margin-bottom: clamp(
                        18px,
                        3vh,
                        25px
                    );
                }

                .google-header h1 {
                    margin: 0;

                    color: #1d2b22;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size: clamp(
                        24px,
                        4vh,
                        31px
                    );

                    font-weight: 700;

                    letter-spacing: -0.6px;
                }

                .google-header p {
                    margin: 8px 0 0;

                    color: #68716b;

                    font-size: clamp(
                        11px,
                        1.7vh,
                        13px
                    );

                    line-height: 1.5;
                }

                .google-email {
                    margin: 0 auto 20px;

                    padding: 10px 13px;

                    width: 100%;

                    border-radius: 9px;

                    background: #f1f5f1;

                    color: #344239;

                    font-size: 12px;

                    font-weight: 600;

                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .google-button-wrapper {
                    width: 100%;

                    display: flex;
                    justify-content: center;

                    min-height: 44px;
                }

                .google-loading {
                    color: #68716b;

                    font-size: 12px;

                    margin-top: 12px;
                }

                .google-error {
                    margin-top: 15px;

                    padding: 9px 12px;

                    border-radius: 8px;

                    background: #fff0df;

                    color: #a85c16;

                    font-size: 11px;

                    line-height: 1.4;
                }

                .google-back {
                    margin-top: 20px;

                    border: none;

                    background: transparent;

                    color: #347744;

                    font-size: 11px;

                    font-weight: 700;

                    cursor: pointer;
                }

                .google-back:hover {
                    text-decoration: underline;
                }

                .google-footer {
                    margin-top: clamp(
                        8px,
                        1.8vh,
                        15px
                    );

                    color: rgba(
                        35,
                        45,
                        38,
                        0.72
                    );

                    font-size: clamp(
                        8px,
                        1.3vh,
                        10px
                    );

                    text-align: center;

                    text-shadow:
                        0 1px 4px rgba(
                            255,
                            255,
                            255,
                            0.5
                        );
                }

                @media (max-height: 720px) {
                    .google-card {
                        padding-top: 20px;
                        padding-bottom: 20px;
                    }

                    .google-logo {
                        margin-bottom: 12px;
                    }

                    .google-header {
                        margin-bottom: 15px;
                    }
                }

                @media (max-width: 600px) {
                    .google-content {
                        width: min(
                            calc(100vw - 28px),
                            420px
                        );
                    }

                    .google-card {
                        padding-left: 20px;
                        padding-right: 20px;
                    }
                }
            `}</style>

            <div className="google-page">
                <div className="google-overlay"></div>

                <main className="google-content">
                    <section className="google-card">

                        <img
                            className="google-logo"
                            src="/logo.png"
                            alt="CP Analytics"
                        />

                        <div className="google-header">
                            <h1>Verify your account</h1>

                            <p>
                                Sign in with Google to verify
                                your email and continue.
                            </p>
                        </div>

                        <div className="google-email">
                            {expectedEmail}
                        </div>

                        <div className="google-button-wrapper">
                            <div ref={googleButtonRef}></div>
                        </div>

                        {loading && (
                            <div className="google-loading">
                                Verifying your account...
                            </div>
                        )}

                        {error && (
                            <div className="google-error">
                                {error}
                            </div>
                        )}

                        <button
                            type="button"
                            className="google-back"
                            onClick={() => navigate("/login")}
                        >
                            Back to login
                        </button>

                    </section>

                    <div className="google-footer">
                        CP Analytics · Track. Analyze. Improve.
                    </div>
                </main>
            </div>
        </>
    );
}

export default GoogleVerify;