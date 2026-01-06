const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files

// SMTP Configuration
// IMPORTANT: Replace with your real SMTP credentials
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
        user: 'YOUR_EMAIL@gmail.com',
        pass: 'YOUR_APP_PASSWORD'
    }
});

// Endpoint to handle form submission
app.post('/api/send-email', (req, res) => {
    const { nome, email, whatsapp, mensagem, empresa } = req.body;

    const mailOptions = {
        from: 'YOUR_EMAIL@gmail.com',
        to: 'contato@e-starvision.com', // Recipient email
        subject: `Nova Mensagem: Missão Código China (de ${nome})`,
        text: `
            Nome: ${nome}
            Empresa: ${empresa || 'N/A'}
            Email: ${email}
            WhatsApp: ${whatsapp}
            Mensagem: ${mensagem || 'N/A'}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Erro ao enviar email');
        }
        console.log('Email enviado: ' + info.response);
        res.status(200).send('Email enviado com sucesso');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
