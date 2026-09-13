import { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";

function Register() {
    const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
});

    const [loading, setLoading] = useState(false);

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await registerUser({
    name: formData.name,
    username: formData.username,
    email: formData.email,
    password: formData.password,
});

            navigate("/google-verify", {
    state: {
        email: formData.email,
        fromRegister: true,
    },
});
        } catch (error) {
            console.error("Registration failed:", error);

            alert(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
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

                .register-page {
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

                .register-overlay {
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

                .register-content {
                    position: relative;
                    z-index: 2;

                    width: min(92vw, 440px);

                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    transform: translateY(
                        clamp(0px, 1vh, 10px)
                    );
                }

                .register-card {
                    width: 100%;

                    padding: clamp(
                        18px,
                        3.2vh,
                        30px
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

                .register-logo {
                    display: block;

                    width: clamp(
                        145px,
                        21vw,
                        195px
                    );

                    max-height: 60px;

                    object-fit: contain;

                    margin: 0 auto clamp(
                        10px,
                        2vh,
                        17px
                    );
                }

                .register-header {
                    text-align: center;

                    margin-bottom: clamp(
                        14px,
                        2.5vh,
                        22px
                    );
                }

                .register-header h1 {
                    margin: 0;

                    color: #1d2b22;

                    font-family:
                        Georgia,
                        "Times New Roman",
                        serif;

                    font-size: clamp(
                        23px,
                        3.8vh,
                        30px
                    );

                    font-weight: 700;

                    letter-spacing: -0.6px;
                }

                .register-header p {
                    margin: 6px 0 0;

                    color: #68716b;

                    font-size: clamp(
                        10px,
                        1.6vh,
                        12px
                    );

                    line-height: 1.45;
                }

                .register-form {
                    display: flex;
                    flex-direction: column;

                    gap: clamp(
                        9px,
                        1.7vh,
                        15px
                    );
                }

                .register-field {
                    display: flex;
                    flex-direction: column;

                    gap: 6px;
                }

                .register-field label {
                    color: #26332b;

                    font-size: clamp(
                        10px,
                        1.6vh,
                        12px
                    );

                    font-weight: 600;
                }

                .register-field input {
                    width: 100%;

                    height: clamp(
                        39px,
                        5.9vh,
                        48px
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
                        11px,
                        1.6vh,
                        13px
                    );

                    transition:
                        border-color 0.2s ease,
                        box-shadow 0.2s ease,
                        background 0.2s ease;
                }

                .register-field input::placeholder {
                    color: #9aa29d;
                }

                .register-field input:focus {
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

                .register-button {
                    width: 100%;

                    height: clamp(
                        40px,
                        6vh,
                        49px
                    );

                    margin-top: 3px;

                    border: none;

                    border-radius: 10px;

                    background: #357a45;

                    color: #ffffff;

                    font-size: clamp(
                        11px,
                        1.7vh,
                        13px
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

                .register-button:hover:not(:disabled) {
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

                .register-button:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                }

                .register-divider {
                    width: 100%;

                    height: 1px;

                    margin: clamp(
                        12px,
                        2vh,
                        18px
                    ) 0 clamp(
                        10px,
                        1.7vh,
                        15px
                    );

                    background: #e2e5e2;
                }

                .register-login {
                    text-align: center;

                    color: #707872;

                    font-size: clamp(
                        9px,
                        1.5vh,
                        11px
                    );
                }

                .register-login a {
                    color: #347744;

                    font-weight: 700;

                    text-decoration: none;
                }

                .register-login a:hover {
                    color: #245b32;

                    text-decoration: underline;
                }

                .register-footer {
                    margin-top: clamp(
                        7px,
                        1.5vh,
                        13px
                    );

                    color: rgba(
                        35,
                        45,
                        38,
                        0.72
                    );

                    font-size: clamp(
                        7px,
                        1.2vh,
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

                /*
                 * Short laptop screens
                 */

                @media (max-height: 720px) {
                    .register-card {
                        padding-top: 15px;
                        padding-bottom: 15px;
                    }

                    .register-logo {
                        margin-bottom: 8px;
                    }

                    .register-header {
                        margin-bottom: 12px;
                    }

                    .register-form {
                        gap: 7px;
                    }

                    .register-field {
                        gap: 4px;
                    }

                    .register-divider {
                        margin-top: 10px;
                        margin-bottom: 8px;
                    }
                }

                /*
                 * Very short screens
                 */

                @media (max-height: 600px) {
                    .register-card {
                        padding: 10px 20px;
                        border-radius: 14px;
                    }

                    .register-logo {
                        width: 135px;
                        max-height: 38px;
                        margin-bottom: 5px;
                    }

                    .register-header {
                        margin-bottom: 6px;
                    }

                    .register-header h1 {
                        font-size: 20px;
                    }

                    .register-header p {
                        display: none;
                    }

                    .register-form {
                        gap: 5px;
                    }

                    .register-field {
                        gap: 2px;
                    }

                    .register-field input {
                        height: 34px;
                    }

                    .register-button {
                        height: 35px;
                    }

                    .register-divider {
                        margin: 6px 0;
                    }

                    .register-footer {
                        display: none;
                    }
                }

                /*
                 * Mobile
                 */

                @media (max-width: 600px) {
                    .register-content {
                        width: min(
                            calc(100vw - 28px),
                            420px
                        );
                    }

                    .register-card {
                        padding-left: 18px;
                        padding-right: 18px;
                    }
                }
            `}</style>

            <div className="register-page">
                <div className="register-overlay"></div>

                <main className="register-content">
                    <section className="register-card">

                        <img
                            className="register-logo"
                            src="/logo.png"
                            alt="CP Analytics"
                        />

                        <div className="register-header">
                            <h1>Create your account</h1>

                            <p>
                                Start tracking your competitive
                                programming journey.
                            </p>
                        </div>

                        <form
                            className="register-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="register-field">
                                <label htmlFor="name">
                                    Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="register-field">
                                <label htmlFor="username">
                                    Username
                                </label>
                                        
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    placeholder="Choose a unique username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    minLength={3}
                                    maxLength={20}
                                    pattern="[a-zA-Z0-9_]+"
                                    title="Username can contain only letters, numbers and underscores"
                                />
                            </div>

                            <div className="register-field">
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

                            <div className="register-field">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="register-field">
                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>

                                <input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                className="register-button"
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating account..."
                                    : "Create account"}
                            </button>
                        </form>

                        <div className="register-divider"></div>

                        <div className="register-login">
                            Already have an account?{" "}
                            <Link to="/login">
                                Sign in
                            </Link>
                        </div>

                    </section>

                    <div className="register-footer">
                        CP Analytics · Track. Analyze. Improve.
                    </div>
                </main>
            </div>
        </>
    );
}

export default Register;