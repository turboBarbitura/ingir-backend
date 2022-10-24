import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

export default (roles) => {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(403).json({message: 'Пользователь не авторизован'})
      }


      const {roles: userRoles} = jwt.verify(token, process.env.JWT_SECRET_KEY)
      let hasRole = false
      userRoles.forEach(role=>{
        if (roles.includes(role)) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.status(403).json({message: 'У вас нет доступа'})
      }
      next()

    } catch (err) {
      console.log(err)
      return res.status(403).json({message: 'Пользователь не авторизован'})
    }
  }
}