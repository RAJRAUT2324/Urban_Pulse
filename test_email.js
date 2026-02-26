import sendEmail from './backend/utils/sendEmail.js';
import dotenv from 'dotenv';

dotenv.config();

const testRealEmail = async () => {
    console.log('--- 📨 Testing Real Email Delivery ---');
    console.log(`Using Sender: ${process.env.EMAIL_USER}`);

    const result = await sendEmail({
        email: 'rautg7230@gmail.com',
        subject: 'Urban Pulse: Real Email Test',
        message: 'This is a test of the real email notification system from Urban Pulse.',
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2563eb;">Test Successful!</h2>
                <p>Nodemailer integration is working correctly with your Gmail App Password.</p>
                <p><strong>Sender:</strong> ${process.env.EMAIL_USER}</p>
                <p><strong>Recipient:</strong> rautg7230@gmail.com</p>
            </div>
        `
    });

    if (result.success) {
        console.log('\n✅ SUCCESS! Check your inbox.');
    } else {
        console.log('\n❌ FAILED. Please double-check your .env credentials.');
        console.log('Ensure you are using a 16-character Google App Password.');
    }
};

testRealEmail();
