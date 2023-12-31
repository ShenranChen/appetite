import mongoose from 'mongoose'
const { Schema, model } = mongoose

const ReviewSchema = new Schema({
    photo: String,
    caption: String,
    rating: Number,
    item: String,
    likes: Number
})

const Review = model('Review', ReviewSchema, 'reviews')
export default Review;