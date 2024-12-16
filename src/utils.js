import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { fakerES as faker } from "@faker-js/faker";
import nodemailer from "nodemailer";
export const __dirname = dirname(fileURLToPath(import.meta.url));

//encrptacion de password
import bcrypt from "bcrypt";

export const createHash = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) =>
    bcrypt.compareSync(password, user.password);



// crear respuestas estandarizadas
export const createResponse = (req, res, statusCode, data, error= null, message="") =>{
    return res.status(statusCode).json({
        message,
        data, 
        status: statusCode,
        error,
        path: req.url        
    })
}

// Generar datos de prueba 

export const generateData=()=>{
    return{
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
    }
}

// Nodemailer config y configuracion codigo de seguridad
const cache = {};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

// generar codigos

function generarCodigoSeguridad(email) {
    const codigo = Math.floor(100000 + Math.random() * 900000).toString(); // Código aleatorio de 6 dígitos
    const expiracion = Date.now() + 5 * 60 * 1000; // Expiración en 5 minutos

    cache[email] = { codigo, expiracion };
    console.log(`Código ${codigo} generado para el usuario ${email}`);
    return codigo;
}

export async function enviarCodigoSeguridad(email) {
    const codigo = generarCodigoSeguridad(email);

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Código de Seguridad',
        text: `Tu código de seguridad es: ${codigo}. Expira en 5 minutos.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Código enviado correctamente');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}
export function validarCodigoSeguridad(email, codigoIngresado) {
    const entrada = cache[email];

    if (!entrada) {
        console.log('Código no encontrado o expirado');
        return false;
    }

    const { codigo, expiracion } = entrada;

    if (Date.now() > expiracion) {
        console.log('El código ha expirado');
        delete cache[email]; // Eliminar después de expirar
        return false;
    }

    if (codigo === codigoIngresado) {
        console.log('Código válido');
        delete cache[email]; // Eliminar después de validar
        return true;
    }

    console.log('Código incorrecto');
    return false;
}
