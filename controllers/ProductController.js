import ProductModel from '../models/Product.js'

export const getAll = async (req, res) => {
  try {
    const products = await ProductModel.find()  //.populate('products')
    res.json(products)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получить продукты'
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new ProductModel({
      article: req.body.article,
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      method: req.body.method,
      skinType: req.body.skinType,
      category: req.body.category,
      subCategory: req.body.subCategory,
      volume: req.body.volume,
      volumeType: req.body.volumeType,
      price: req.body.price,
      hotSale: req.body.hotSale,
      rating: req.body.rating,
      sale: req.body.sale
    })

    const product = await doc.save()

    res.json(product)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось создать продукт...'
    })
  }
}