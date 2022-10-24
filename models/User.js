import mongoose from "mongoose";

//Создание карточки юзера
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true, //Обязательное поле.
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: String,

  roles: [{
    type: String,
    ref: 'Role'
  }],

}, {
  timestamps: true, //Добавляет дату и время.
})


export default mongoose.model('User', UserSchema)