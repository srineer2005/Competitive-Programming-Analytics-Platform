import { useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import api from "../api/axios";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const resetStarted = useRef(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");

        if (!token) {
            setErrorMessage("Invalid password reset link.");
            return;
        }

        if (password.length < 6) {
            setErrorMessage(
                "Password must be at least 6 characters."
            );
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                "/auth/reset-password",
                {
                    token,
                    newPassword: password,
                }
            );

            setSuccessMessage(
                response.data?.message ||
                    "Password has been reset successfully."
            );

            setPassword("");
            setConfirmPassword("");

            resetStarted.current = true;

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error(
                "Password reset failed:",
                error
            );

            setErrorMessage(
                error.response?.data?.message ||
                    "Unable to reset password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-page">
            <div className="reset-overlay">
                <div className="reset-card">

                    <img
                        src="/logo.png"
                        alt="CP Analytics"
                        className="reset-logo"
                    />

                    <div className="reset-header">
                        <h1>Reset Password</h1>

                        <p>
                            Create a new password for your
                            CP Analytics account.
                        </p>
                    </div>

                    {!token ? (
                        <div className="reset-error">
                            Invalid password reset link.
                        </div>
                    ) : (
                        <form
                            className="reset-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="reset-field">
                                <label htmlFor="password">
                                    New Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(
                                            event.target.value
                                        );
                                        setErrorMessage("");
                                    }}
                                    placeholder="Enter new password"
                                    minLength={6}
                                    required
                                />
                            </div>

                            <div className="reset-field">
                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>

                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(event) => {
                                        setConfirmPassword(
                                            event.target.value
                                        );
                                        setErrorMessage("");
                                    }}
                                    placeholder="Confirm new password"
                                    minLength={6}
                                    required
                                />
                            </div>

                            {errorMessage && (
                                <div className="reset-error">
                                    {errorMessage}
                                </div>
                            )}

                            {successMessage && (
                                <div className="reset-success">
                                    {successMessage}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="reset-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Resetting..."
                                    : "Reset Password"}
                            </button>
                        </form>
                    )}

                    <div className="reset-login">
                        <Link to="/login">
                            Back to Login
                        </Link>
                    </div>

                    <div className="reset-footer">
                        © 2026 CP Analytics
                    </div>
                </div>
            </div>

            <style>{`
                .reset-page {
                    min-height: 100vh;
                    width: 100%;
                    background: url("/background.png") center center / cover no-repeat;
                    position: relative;
                }

                .reset-overlay {
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 24px;
                    background: rgba(250, 249, 245, 0.25);
                    box-sizing: border-box;
                }

                .reset-card {
                    width: 100%;
                    max-width: 440px;
                    padding: 40px;
                    box-sizing: border-box;
                    border-radius: 18px;
                    background: rgba(255, 255, 255, 0.94);
                    box-shadow: 0 20px 60px rgba(37, 42, 38, 0.16);
                    backdrop-filter: blur(12px);
                }

                .reset-logo {
                    display: block;
                    width: 90px;
                    max-width: 100%;
                    margin: 0 auto 20px;
                }

                .reset-header {
                    text-align: center;
                    margin-bottom: 28px;
                }

                .reset-header h1 {
                    margin: 0 0 8px;
                    color: #252A26;
                    font-size: 28px;
                }

                .reset-header p {
                    margin: 0;
                    color: #686C65;
                    font-size: 14px;
                    line-height: 1.5;
                }

                .reset-form {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }

                .reset-field {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                }

                .reset-field label {
                    color: #252A26;
                    font-size: 14px;
                    font-weight: 600;
                }

                .reset-field input {
                    width: 100%;
                    padding: 13px 14px;
                    box-sizing: border-box;
                    border: 1px solid #E8E3D8;
                    border-radius: 8px;
                    outline: none;
                    background: #FFFFFF;
                    color: #252A26;
                    font-size: 14px;
                }

                .reset-field input:focus {
                    border-color: #347744;
                    box-shadow: 0 0 0 3px rgba(52, 119, 68, 0.10);
                }

                .reset-button {
                    width: 100%;
                    border: none;
                    border-radius: 8px;
                    padding: 13px;
                    margin-top: 4px;
                    background: #347744;
                    color: #FFFFFF;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                }

                .reset-button:hover {
                    background: #2d683c;
                }

                .reset-button:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                }

                .reset-error {
                    padding: 11px 13px;
                    border-radius: 8px;
                    background: #FFF0DF;
                    color: #B65D18;
                    font-size: 13px;
                    line-height: 1.4;
                }

                .reset-success {
                    padding: 11px 13px;
                    border-radius: 8px;
                    background: #EAF4EB;
                    color: #347744;
                    font-size: 13px;
                    line-height: 1.4;
                }

                .reset-login {
                    text-align: center;
                    margin-top: 22px;
                }

                .reset-login a {
                    color: #347744;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 600;
                }

                .reset-login a:hover {
                    text-decoration: underline;
                }

                .reset-footer {
                    text-align: center;
                    margin-top: 24px;
                    color: #686C65;
                    font-size: 12px;
                }

                @media (max-width: 480px) {
                    .reset-overlay {
                        padding: 16px;
                    }

                    .reset-card {
                        padding: 28px 22px;
                    }

                    .reset-header h1 {
                        font-size: 24px;
                    }
                }
            `}</style>
        </div>
    );
}

export default ResetPassword;