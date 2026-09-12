const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

const sendVerificationEmail = async (
    email,
    username,
    verificationToken
) => {
    const verificationUrl =
        `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    await transporter.sendMail({
        from: `"CP Analytics" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Verify your CP Analytics account",
        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                padding: 30px;
                color: #252A26;
            ">
                <h2 style="color: #347744;">
                    Welcome to CP Analytics, ${username}!
                </h2>

                <p>
                    Thanks for creating your account.
                    Please verify your email address to continue.
                </p>

                <a
                    href="${verificationUrl}"
                    style="
                        display: inline-block;
                        padding: 12px 22px;
                        background: #347744;
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                        margin: 15px 0;
                    "
                >
                    Verify Email
                </a>

                <p style="font-size: 13px; color: #686C65;">
                    This verification link will expire in 24 hours.
                </p>
            </div>
        `,
    });
};

const sendPasswordResetEmail = async (
    email,
    username,
    resetToken
) => {
    const resetUrl =
        `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
        from: `"CP Analytics" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Reset your CP Analytics password",
        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                padding: 30px;
                color: #252A26;
            ">
                <h2 style="color: #347744;">
                    Password Reset
                </h2>

                <p>
                    Hi ${username},
                </p>

                <p>
                    We received a request to reset your
                    CP Analytics password.
                </p>

                <p>
                    Click the button below to create a new
                    password.
                </p>

                <a
                    href="${resetUrl}"
                    style="
                        display: inline-block;
                        padding: 12px 22px;
                        background: #347744;
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                        margin: 15px 0;
                    "
                >
                    Reset Password
                </a>

                <p style="font-size: 13px; color: #686C65;">
                    This password reset link will expire in
                    30 minutes.
                </p>

                <p style="font-size: 13px; color: #686C65;">
                    If you did not request a password reset,
                    you can safely ignore this email.
                </p>
            </div>
        `,
    });
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
};