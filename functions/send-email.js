const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const { name, email, message } = JSON.parse(event.body);

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', 
        port: 587,
        secure: false, 
        auth: {
            user: 'connordavis115@gmail.com', 
            pass: 'S,s,7p&vG3!U_mNyv,1n~r', 
        },
    });

    // Setup email data
    let mailOptions = {
        from: '"Portfolio Contact" <connordavis115@gmail.com>', 
        to: 'connordavis115@gmail.com', 
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        // Send mail
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
        };
    }
};