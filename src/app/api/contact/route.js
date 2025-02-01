import nodemailer from "nodemailer";

export async function POST(req) {
    const body = await req.json();

    const { name, email, phone, message, communicationMethod } = body;

    if (!name || !email || !phone || !message || !communicationMethod) {
        return new Response(JSON.stringify({ message: "All fields are required" }), {
            status: 400,
        });
    }

    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "your-email@example.com", // Replace with your email
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Communication: ${communicationMethod}\n\nMessage:\n${message}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: "Email sent successfully!" }), { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ message: "Error sending email", error }), {
            status: 500,
        });
    }
}
