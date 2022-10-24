import mongoose from "mongoose";

//Создание карточки ролей
const RoleSchema = new mongoose.Schema({
  value: {
    type: String,
    unique: true,
    default: 'USER'
  }
}, {
  timestamps: true, //Добавляет дату и время.
})


export default mongoose.model('Role', RoleSchema)