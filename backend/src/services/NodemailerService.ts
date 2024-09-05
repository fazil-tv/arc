import nodemailer from 'nodemailer';
import { EmailServiceInterface } from '../repositories';
import dotenv from 'dotenv';
dotenv.config();



export class NodemailerEmailService implements EmailServiceInterface {


    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
                // clientId:process.env.OAUTH_CLIENTI,
                // clientSecret:process.env.OAUTH_CLIENT_SECRET
            },
        });
    }

    async sendOtpEmail(email: string, otp: string): Promise<void> {
        const mailOptions = {
            from: 'farc348@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It will expire in 1 minute.`,
        };

       
    try {
        await this.transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending OTP email: ${error}`);
    }
    }
}
