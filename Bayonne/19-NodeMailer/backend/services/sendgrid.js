const sgMail = require('@sendgrid/mail');

exports.sendEmail = async (to, subject, text, html) => {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to,
            from: process.env.SENDGRID_SEND,
            subject,
            text,
            html
        }

        await sgMail.send(msg);
        return true
    } catch (error) {
        return error;
    }
}