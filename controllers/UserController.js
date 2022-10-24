import UserModel from "../models/User.js";
import RoleModel from "../models/Role.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()


export const register = async (req, res) => {
  try {

    //Вытаскиваем почту и пароль из запроса
    const {password, email} = req.body

    //Ищем введенную почту в базе данных
    const candidate = await UserModel.findOne({email})
    //Если база данных что-то вернула, то прекращаем регистрацию
    if (candidate) {
      return res.status(400).json({message: 'Пользователь с такой электронной почтой уде существует'})
    }

    //Шифруем пароль
    const passwordHash = bcrypt.hashSync(password, 10)

    //Получаем роль
    const userRole = await RoleModel.findOne({value: 'USER'})

    //Создание документа нового пользователя
    const doc = new UserModel({
      email: req.body.email,
      userName: req.body.userName,
      avatarUrl: req.body.avatarUrl,
      password: passwordHash,
      roles: [userRole.value]
    })

    //Создаём самого пользователя с помощью моногоДБ(Сохраняем)
    const user = await doc.save()


    res.json({
      user
    })
  } catch (err) { //Обработка ошибки.
    console.log(err)
    res.status(500).json({
      message: 'Не удалось зарегистрироваться...'
    })
  }
}


const generateAccessToken = (id, roles) =>
{
  //Эта информация и будет закодирована в токене.
  const payload = {
    id,
    roles
  }

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "24h"})
}



export const login = async (req, res) => {
  try {

    const {email, password} = req.body

    const user = await UserModel.findOne({email})

    if (!user) {
      return res.status(400).json({message: `Пользователь с данной почтой не найден`})
    }

    //Сравниваем пароли. Пришедший с фронта и который принадлежит почте в БД.
    //Данная конструкция вернёт булевое значение.
    const validPassword = bcrypt.compareSync(password, user.password)

    if(!validPassword) {
      return res.status(400).json({message: `Неверный логин или пароль`})
    }

    const token = generateAccessToken(user._id, user.roles)
    return res.json(token)



  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: 'Ошибка входа в систему'
    })
  }
}




export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find()

    res.json(users)

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получить пользователя'
    })
  }
}