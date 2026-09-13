import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";

import { loginUser } from "../services/auth.service";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");

        try {
            setLoading(true);

            const response = await loginUser(formData);

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);

            if (error.response?.status === 403) {
    navigate("/google-verify", {
        state: {
            email: formData.email,
        },
    });
    return;
}

const message =
    error.response?.data?.message ||
    "Login failed. Please check your credentials.";

setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    };

    
    const handleForgotPassword = () => {
    if (!formData.email.trim()) {
        setErrorMessage("Enter your email address first.");
        return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    navigate("/google-verify", {
        state: {
            email: formData.email,
            fromPasswordReset: true,
        },
    });
};

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

                .login-page {
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

                /*
                 * Very light overlay.
                 * Keeps the original photograph visible while
                 * making the form easier to read.
                 */
                .login-overlay {
                    position: absolute;
                    inset: 0;

                    background: rgba(255, 255, 255, 0.03);

                    pointer-events: none;
                }

                .login-content {
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

                .login-card {
                    width: 100%;

                    padding: clamp(
                        20px,
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
                }

                .login-logo {
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

                .login-header {
                    text-align: center;

                    margin-bottom: clamp(
                        16px,
                        3vh,
                        25px
                    );
                }

                .login-header h1 {
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

                .login-header p {
                    margin: 7px 0 0;

                    color: #68716b;

                    font-size: clamp(
                        11px,
                        1.7vh,
                        13px
                    );

                    line-height: 1.5;
                }

                .login-form {
                    display: flex;
                    flex-direction: column;

                    gap: clamp(
                        12px,
                        2.1vh,
                        18px
                    );
                }

                .login-field {
                    display: flex;
                    flex-direction: column;

                    gap: 7px;
                }

                .login-field label {
                    color: #26332b;

                    font-size: clamp(
                        11px,
                        1.7vh,
                        13px
                    );

                    font-weight: 600;
                }

                .login-field input {
                    width: 100%;

                    height: clamp(
                        42px,
                        6.3vh,
                        50px
                    );

                    padding: 0 14px;

                    border: 1px solid #d7ddd8;

                    border-radius: 10px;

                    outline: none;

                    background: rgba(
                        255,
                        255,
                        255,
                        0.86
                    );

                    color: #202720;

                    font-size: clamp(
                        12px,
                        1.7vh,
                        14px
                    );

                    transition:
                        border-color 0.2s ease,
                        box-shadow 0.2s ease,
                        background 0.2s ease;
                }

                .login-field input::placeholder {
                    color: #9aa29d;
                }

                .login-field input:focus {
                    border-color: #3d7c4b;

                    background: #ffffff;

                    box-shadow:
                        0 0 0 3px rgba(
                            61,
                            124,
                            75,
                            0.12
                        );
                }

                .login-button {
                    width: 100%;

                    height: clamp(
                        43px,
                        6.5vh,
                        51px
                    );

                    margin-top: 3px;

                    border: none;

                    border-radius: 10px;

                    background: #357a45;

                    color: #ffffff;

                    font-size: clamp(
                        12px,
                        1.8vh,
                        14px
                    );

                    font-weight: 700;

                    cursor: pointer;

                    box-shadow:
                        0 7px 18px rgba(
                            53,
                            122,
                            69,
                            0.20
                        );

                    transition:
                        background 0.2s ease,
                        transform 0.2s ease,
                        box-shadow 0.2s ease,
                        opacity 0.2s ease;
                }

                .login-button:hover:not(:disabled) {
                    background: #2e6d3d;

                    transform: translateY(-1px);

                    box-shadow:
                        0 10px 22px rgba(
                            53,
                            122,
                            69,
                            0.25
                        );
                }

                .login-button:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                }

                .login-divider {
                    width: 100%;

                    height: 1px;

                    margin: clamp(
                        16px,
                        2.7vh,
                        23px
                    ) 0 clamp(
                        13px,
                        2.2vh,
                        19px
                    );

                    background: #e2e5e2;
                }

                .login-register {
                    text-align: center;

                    color: #707872;

                    font-size: clamp(
                        10px,
                        1.6vh,
                        12px
                    );
                }

                .login-register a {
                    color: #347744;

                    font-weight: 700;

                    text-decoration: none;
                }

                .login-register a:hover {
                    color: #245b32;

                    text-decoration: underline;
                }

                .login-footer {
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

                .login-error {
                    padding: 9px 12px;

                    border-radius: 8px;

                    background: #fff0df;

                    color: #a85c16;

                    font-size: 11px;

                    line-height: 1.4;
                }

                .login-success {
                    padding: 9px 12px;

                    border-radius: 8px;

                    background: #eaf4eb;

                    color: #347744;

                    font-size: 11px;

                    line-height: 1.4;
                }

                .resend-button {
                    align-self: flex-start;

                    margin-top: -9px;

                    padding: 0;

                    border: none;

                    background: transparent;

                    color: #347744;

                    font-size: 11px;

                    font-weight: 700;

                    cursor: pointer;
                }

                .resend-button:hover:not(:disabled) {
                    text-decoration: underline;
                }

                .resend-button:disabled {
                    opacity: 0.6;

                    cursor: not-allowed;
                }

                /*
                 * Short laptop screens
                 */

                @media (max-height: 720px) {
                    .login-card {
                        padding-top: 18px;
                        padding-bottom: 18px;
                    }

                    .login-logo {
                        margin-bottom: 12px;
                    }

                    .login-header {
                        margin-bottom: 15px;
                    }

                    .login-form {
                        gap: 10px;
                    }

                    .login-field {
                        gap: 5px;
                    }

                    .login-divider {
                        margin-top: 12px;
                        margin-bottom: 10px;
                    }
                }

                /*
                 * Very short screens
                 */

                @media (max-height: 600px) {
                    .login-card {
                        padding: 13px 20px;
                        border-radius: 15px;
                    }

                    .login-logo {
                        width: 145px;
                        max-height: 42px;
                        margin-bottom: 8px;
                    }

                    .login-header {
                        margin-bottom: 9px;
                    }

                    .login-header h1 {
                        font-size: 21px;
                    }

                    .login-header p {
                        display: none;
                    }

                    .login-form {
                        gap: 7px;
                    }

                    .login-field {
                        gap: 3px;
                    }

                    .login-field input {
                        height: 36px;
                    }

                    .login-button {
                        height: 37px;
                    }

                    .login-divider {
                        margin: 8px 0;
                    }

                    .login-footer {
                        display: none;
                    }
                }

                /*
                 * Mobile
                 */
.forgot-password-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: -8px;
}

.forgot-password-button {
    border: none;
    background: transparent;
    color: #347744;
    font-size: 10px;
    font-weight: 600;
    cursor: pointer;
    margin-top:10px;
    padding: 0;
}

.forgot-password-button:hover {
    text-decoration: underline;
}

.forgot-password-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
                @media (max-width: 600px) {
    .login-page {
        background-size: cover;
        background-position: center center;
    }

    .login-content {
        width: min(
            calc(100vw - 28px),
            420px
        );
    }

    .login-card {
        padding-left: 20px;
        padding-right: 20px;
    }
}
            `}</style>

            <div className="login-page">
                <div className="login-overlay"></div>

                <main className="login-content">
                    <section className="login-card">

                        <img
                            className="login-logo"
                            src="/logo.png"
                            alt="CP Analytics"
                        />

                        <div className="login-header">
                            <h1>Welcome back</h1>

                            <p>
                                Sign in to continue your
                                coding journey.
                            </p>
                        </div>

                        <form
                            className="login-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="login-field">
                                <label htmlFor="email">
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="login-field">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="forgot-password-wrapper">
    <button
        type="button"
        className="forgot-password-button"
        onClick={handleForgotPassword}
        disabled={loading}
    >
        Forgot Password?
    </button>
</div>

                            {errorMessage && (
                                <div className="login-error">
                                    {errorMessage}
                                </div>
                            )}

                            {errorMessage ===
                                "Please verify your email before logging in." && (
                                <button
                                    type="button"
                                    className="resend-button"
                                    onClick={
                                        handleResendVerification
                                    }
                                    disabled={resending}
                                >
                                    {resending
                                        ? "Sending..."
                                        : "Resend verification email"}
                                </button>
                            )}

                            {successMessage && (
                                <div className="login-success">
                                    {successMessage}
                                </div>
                            )}

                            <button
                                className="login-button"
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Signing in..."
                                    : "Sign in"}
                            </button>
                        </form>

                        <div className="login-divider"></div>

                        <div className="login-register">
                            Don't have an account?{" "}
                            <Link to="/register">
                                Create an account
                            </Link>
                        </div>

                    </section>

                    <div className="login-footer">
                        CP Analytics · Track. Analyze. Improve.
                    </div>
                </main>
            </div>
        </>
    );
}

export default Login;