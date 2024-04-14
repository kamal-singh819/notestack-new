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
const sendEmailHandler = ({email, subject, body}) => {
    console.log("User Email is ", email);
    const mailOptions = {
        from: "kamalsinghkanth@gmail.com",
        to: email,
        subject: subject,
        html: body
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) console.log(err);
        else console.log('Email Sent', info.response);
    });
}

export default sendEmailHandler;