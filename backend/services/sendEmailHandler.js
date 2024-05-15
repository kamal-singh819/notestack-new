import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "kamalsinghkanth@gmail.com",
        pass: "lpud wctv jisy xmmk"
    }
});
const sendEmailHandler = ({ toEmail, fromEmail, subject, body }) => {
    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: subject,
        html: body
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log('Email Sent', info.response);
    });
}

export default sendEmailHandler;