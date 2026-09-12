import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import api from "../api/axios";

import "../styles/VerifyEmail.css";

function VerifyEmail() {
    const [searchParams] = useSearchParams();

    const [status, setStatus] = useState("verifying");
    const [message, setMessage] = useState("");

    const verificationStarted = useRef(false);

    useEffect(() => {
        if (verificationStarted.current) {
            return;
        }

        verificationStarted.current = true;

        const verifyEmail = async () => {
            const token = searchParams.get("token");

            if (!token) {
                setStatus("error");
                setMessage(
                    "Invalid verification link."
                );
                return;
            }

            try {
                const response = await api.get(
                    `/auth/verify-email?token=${encodeURIComponent(
                        token
                    )}`
                );

                setStatus("success");
                setMessage(
                    response.data.message ||
                        "Your email has been verified successfully."
                );
            } catch (error) {
                setStatus("error");

                setMessage(
                    error.response?.data?.message ||
                        "This verification link is invalid or has expired."
                );
            }
        };

        verifyEmail();
    }, [searchParams]);

    return (
        <div className="verify-email-page">
            <div className="verify-email-card">
                <div className="verify-email-logo">
                    <img
                        src="/logo.png"
                        alt="CP Analytics"
                    />
                </div>

                {status === "verifying" && (
                    <>
                        <div className="verify-icon">
                            ⏳
                        </div>

                        <h1>
                            Verifying your email
                        </h1>

                        <p>
                            Please wait while we verify
                            your email address.
                        </p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="verify-icon success">
                            ✓
                        </div>

                        <h1>
                            Email Verified!
                        </h1>

                        <p>
                            {message}
                        </p>

                        <Link
                            to="/login"
                            className="verify-login-btn"
                        >
                            Continue to Login
                        </Link>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="verify-icon error">
                            !
                        </div>

                        <h1>
                            Verification Failed
                        </h1>

                        <p>
                            {message}
                        </p>

                        <Link
                            to="/login"
                            className="verify-login-btn"
                        >
                            Go to Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;