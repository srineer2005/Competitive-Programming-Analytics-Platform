const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
});

const sendVerificationEmail = async (
    email,
    username,
    verificationToken
) => {
    const verificationUrl =
        `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    console.log("📧 Sending verification email...");
    console.log("From:", process.env.GMAIL_USER);
    console.log("To:", email);

    try {
        const info = await transporter.sendMail({
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

        console.log("✅ Verification email sent:", info.messageId);

        return info;
    } catch (error) {
        console.error("❌ Verification email failed:");
        console.error("Code:", error.code);
        console.error("Message:", error.message);

        throw error;
    }
};

const sendPasswordResetEmail = async (
    email,
    username,
    resetToken
) => {
    const resetUrl =
        `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    try {
        const info = await transporter.sendMail({
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

                    <p>Hi ${username},</p>

                    <p>
                        We received a request to reset your
                        CP Analytics password.
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
                        This password reset link will expire in 30 minutes.
                    </p>
                </div>
            `,
        });

        console.log("✅ Password reset email sent:", info.messageId);

        return info;
    } catch (error) {
        console.error("❌ Password reset email failed:");
        console.error("Code:", error.code);
        console.error("Message:", error.message);

        throw error;
    }
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
};