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

// SMTP Configuration - Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'starvision.comex@gmail.com',
        pass: 'mvnbasnjdvxooklc'
    }
});

// Endpoint para o novo formulário Starvision
app.post('/api/submit-form', (req, res) => {
    const { nome, email, whatsapp, empresa } = req.body;

    // Validação de dados
    if (!nome || !email || !whatsapp || !empresa) {
        return res.status(400).json({
            success: false,
            message: 'Todos os campos são obrigatórios'
        });
    }

    const mailOptions = {
        from: 'starvision.comex@gmail.com',
        to: 'starvision.comex@gmail.com',
        subject: `🇨🇳 Nova Inscrição: Missão Código China - ${nome}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px;">
                <div style="background: #A71D2A; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1 style="color: #F1F1F1; margin: 0; font-size: 24px;">Nova Inscrição - Missão Código China</h1>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
                    <h2 style="color: #A71D2A; margin-top: 0;">Dados do Participante</h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px; background: #f9f9f9; font-weight: bold; width: 40%;">Nome Completo:</td>
                            <td style="padding: 12px; background: #f9f9f9;">${nome}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; background: white; font-weight: bold;">E-mail:</td>
                            <td style="padding: 12px; background: white;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; background: #f9f9f9; font-weight: bold;">WhatsApp:</td>
                            <td style="padding: 12px; background: #f9f9f9;">${whatsapp}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; background: white; font-weight: bold;">Empresa:</td>
                            <td style="padding: 12px; background: white;">${empresa}</td>
                        </tr>
                    </table>
                    
                    <div style="margin-top: 30px; padding: 20px; background: #FFF9E6; border-left: 4px solid #FFC72C; border-radius: 4px;">
                        <p style="margin: 0; color: #666; font-size: 14px;">
                            📅 Data de inscrição: ${new Date().toLocaleString('pt-BR')}
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                    <p>Powered by Starvision</p>
                </div>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar email:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro ao enviar email. Tente novamente mais tarde.'
            });
        }
        console.log('✅ Email enviado com sucesso:', info.response);
        res.status(200).json({
            success: true,
            message: 'Formulário enviado com sucesso!'
        });
    });
});

// Endpoint to handle form submission
app.post('/api/send-email', (req, res) => {
    const { nome, email, whatsapp, mensagem, empresa } = req.body;

    const mailOptions = {
        from: 'starvision.comex@gmail.com',
        to: 'starvision.comex@gmail.com', // Recipient email
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
