import { body, validationResult } from "express-validator";

// Middleware de validación
export const validateUserData = [
  body('first_name').not().isEmpty().withMessage('El nombre es obligatorio'),

  body('last_name').not().isEmpty().withMessage('El apellido es obligatorio'),

  body('email')
    .isEmail().withMessage('Debe ser un correo electrónico válido'),
  body('age')
    .isNumeric().withMessage('La edad debe ser un número')
    .custom(value => {
      if (value < 18 || value > 90) {
        throw new Error('La edad debe ser entre 18 y 90 años');
      }
      return true;
    }),

  body('password')
    .isAlphanumeric().withMessage('La contraseña debe ser alfanumérica')
    .isLength({ min: 7 }).withMessage('La contraseña debe tener al menos 7 caracteres')
];

// Middleware para manejar los errores de validación
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
