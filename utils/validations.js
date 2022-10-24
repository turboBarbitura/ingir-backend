import {body} from "express-validator";

//Валидирует введенные пользователем данные при регистрации.
export const registerValidation = [
  body('userName', 'Укажите имя').isLength({min: 3, max: 16}).notEmpty(),
  body('email', 'Неверный формат почты').isEmail().notEmpty(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 8}).notEmpty(),
  body('avatarUrl', 'Неверная ссылка на аву').optional().isURL(), //Optional() - означает что аватарка может быть или не быть. Не обязательный параметр.
]