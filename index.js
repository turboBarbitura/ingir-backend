import express from 'express'
import mongoose from 'mongoose'
import {ProductController} from './controllers/index.js'
import {UserController} from './controllers/index.js'
import {registerValidation} from './utils/validations.js'
import handleValidationErrors from './utils/handleValidationErrors.js'

import authMiddleware from "./middlewares/authMiddleware.js";
import roleMiddleware from "./middlewares/roleMiddleware.js";

import cors from 'cors'

import * as dotenv from 'dotenv'
dotenv.config()

//Аккаунт на монго через виртуальную машину. Подключение к базе данных.
// mongoose.connect( 'mongodb://localhost:27017/ingirdb'
mongoose.connect( process.env.DATABASE_URI

  // process.env.MONGODB_URI
)
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB error', err))


//Создаем приложение по средствам експресс.
const app = express();



//Учит приложения распознавать JSON
app.use(express.json());

//Учит приложения получать запросы с другого локалхоста
app.use(cors());


//Гет запрос на получение всех статей.
app.get('/', ProductController.getAll)


// app.get('/users', authMiddleware, UserController.getUsers) - так будет доступ к контенту зарегистрированным пользователям.
app.get('/users', roleMiddleware(["ADMIN"]), UserController.getUsers) //А так с ролью админ.


//Регистрация
app.post('/register', registerValidation, handleValidationErrors, UserController.register)

//Вход
app.post('/login',  UserController.login)

//Создание продукта
app.post('/admin/addproduct', roleMiddleware(["ADMIN"]), ProductController.create)


//Говорим приложению слушать порт 4444 и запускаться на нем. И в случае ошибки выводить ее в консоль
app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});