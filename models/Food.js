import mongoose from 'mongoose'
const { Schema, model } = mongoose

const FoodSchema = new Schema({
    name: String,
    reviews: [{ type: String }],
    averageRating: Number
})

const Food = model('Food', FoodSchema, 'food')
export default Food;