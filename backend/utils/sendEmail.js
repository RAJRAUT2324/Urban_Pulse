import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (options) => {
    // 1. Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'raj23raut@gmail.com',
            pass: process.env.EMAIL_PASS, // This MUST be an App Password, not a regular password
        },
    });

    // 2. Define email options
    const mailOptions = {
        from: `Urban Pulse <${process.env.EMAIL_USER || 'raj23raut@gmail.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    // 3. Send email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ REAL EMAIL SENT TO: ${options.email} - MessageID: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`❌ REAL EMAIL FAILED: ${error.message}`);
        return { success: false, error: error.message };
    }
};

export default sendEmail;
