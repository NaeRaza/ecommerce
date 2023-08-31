const { Schema, model, models } = require("mongoose");

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String, // Stockez ici l'URL de l'image dans Firebase Storage
    }
})

export const Product = models.Product || model('Product', productSchema)