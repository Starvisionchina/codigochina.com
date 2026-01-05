const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// API Endpoint to send email
app.post('/api/send-email', async (req, res) => {
    const { nome, empresa, email, whatsapp } = req.body;

    if (!nome || !empresa || !email || !whatsapp) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    // Configure Nodemailer Transporter
    // IMPORTANT: Replace these with actual SMTP credentials
    // For Gmail, you might need "App Password" if 2FA is on.
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or use 'host', 'port' for other providers
        auth: {
            user: 'YOUR_EMAIL@gmail.com', // REPLACE THIS
            pass: 'YOUR_PASSWORD'         // REPLACE THIS
        }
    });

    const mailOptions = {
        from: `"${nome}" <${email}>`, // From user (might be restricted by SMTP provider, better to use auth user as 'from' and set 'replyTo')
        to: 'contato@e-starvision.com',
        subject: `Novo Contato do Site - ${empresa}`,
        text: `
            Novo contato recebido pelo site:
            
            Nome: ${nome}
            Empresa: ${empresa}
            Email: ${email}
            WhatsApp: ${whatsapp}
        `,
        html: `
            <h3>Novo contato recebido pelo site</h3>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Empresa:</strong> ${empresa}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Erro ao enviar email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} to view the site`);
});
