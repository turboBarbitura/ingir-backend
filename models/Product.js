import mongoose from "mongoose";

//Модель продукта.
const ProductSchema = new mongoose.Schema({
  article: { //Артикул. Код товара. ТЫ ПРОСИЛА СДЕЛАТЬ =) (ОБЯЗАТЕЛЬНОЕ ПОЛЕ).
    type: Number,
    required: true,
    unique: true
  },
  title: { //Название(ОБЯЗАТЕЛЬНОЕ ПОЛЕ).
    type: String,
    required: true,
  },
  imageUrl: { //Картинка продукта(ОБЯЗАТЕЛЬНОЕ ПОЛЕ).
    type: String,
    required: true,
  },
  description: String, //Описание продукта.
  method: String, //Способ применения.
  skinType: {    //Тип кожи(ОБЯЗАТЕЛЬНОЕ ПОЛЕ).
    type: Number,
    required: true,
  },
  category: { //Категория(ОБЯЗАТЕЛЬНОЕ ПОЛЕ).
    type: Number,
    required: true,
  },
  subCategory: { //Подкатегория(ОБЯЗАТЕЛЬНОЕ ПОЛЕ).
    type: Number,
    required: true,
  },
  volume: { //Объем(ОБЯЗАТЕЛЬНОЕ ПОЛЕ).
    type: Array,
    required: true,
  },
  volumeType: { //Тип объема (гр. мл.)(ОБЯЗАТЕЛЬНОЕ ПОЛЕ).
    type: Number,
    required: true,
  },
  price: { //Цена продукта (ОБЯЗАТЕЛЬНОЕ ПОЛЕ).
    type: Number,
    required: true,
  },
  hotSale: Boolean, //Хит продаж (БУДЕТ ЧТО-ТО ТИПА ОГОНЕЧКА НА КАРТОЧКЕ).
  rating: Number, //Рейтинг продукта. Пригодится, когда добавим отзывы на сайт.
  sale: Number, //Скидка. Будет указываться в процентах и автоматически вычитаться из цены.
  }, {
  timestamps: true, //Добавляет дату и время создания.
})


export default mongoose.model('product', ProductSchema)