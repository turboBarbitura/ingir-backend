import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

export default (req, res, next) => {
  //Исключаем метод опшенс
  if (req.method === 'OPTIONS') {
    next()
  }
  
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({message: 'Пользователь не авторизован'})
    }


    //При раскодировании получится объект пейлоад с айди и ролью,
    //Который был закодирован в юзерконтроллер в функции generateAccessToken
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = decodedData
    next()

  } catch (err) {
    console.log(err)
    return res.status(403).json({message: 'Пользователь не авторизован'})
  }

}