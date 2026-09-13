const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (
    email,
    username,
    verificationToken
) => {
    const verificationUrl =
        `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    console.log("📧 Sending verification email...");
    console.log("To:", email);

    try {
        const { data, error } = await resend.emails.send({
            from: "CP Analytics <onboarding@resend.dev>",
            to: [email],
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

        if (error) {
            console.error("❌ Verification email failed:");
            console.error(error);
            throw new Error(error.message || "Failed to send email");
        }

        console.log("✅ Verification email sent:", data.id);

        return data;
    } catch (error) {
        console.error("❌ Verification email failed:");
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

    console.log("📧 Sending password reset email...");
    console.log("To:", email);

    try {
        const { data, error } = await resend.emails.send({
            from: "CP Analytics <onboarding@resend.dev>",
            to: [email],
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

        if (error) {
            console.error("❌ Password reset email failed:");
            console.error(error);
            throw new Error(error.message || "Failed to send email");
        }

        console.log("✅ Password reset email sent:", data.id);

        return data;
    } catch (error) {
        console.error("❌ Password reset email failed:");
        console.error("Message:", error.message);

        throw error;
    }
};


module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
};