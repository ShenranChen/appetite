
//const express = require("express");
import express from 'express'
//const mongoose = require("mongoose");
import mongoose from 'mongoose'
//const User = require("../models/User");
import User from '../models/User.js'
import Catalog from '../models/Catalog.js'
import Food from '../models/Food.js'
import Review from '../models/Review.js'

const app = express()
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log('server running on port ${PORT}'));


mongoose.connect("mongodb+srv://jasontchan:Appetite123@appetite.uy0okn0.mongodb.net/dhh-data?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json('yeah');
        console.log("here A")
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})


const CATALOG_OBJID = '655aa00fecfff2b51574ed70'
app.get("/api/catalog", async (req, res) => {
    try {
        //let catalog = await Catalog.findById(CATALOG_OBJID)
        let catalog = await Catalog.find()
        console.log(catalog)
        res.json(catalog)
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

app.get("/api/food", async (req, res) => {
    try {
        let food = await Food.find();
        res.json(food);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

app.get("/api/reviews", async (req, res) => {
    try {
        let reviews = await Review.find();
        console.log('got reviews:', reviews)
        res.json(reviews);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

//middleware to parse JSON in the request body
app.use(express.json());

// Endpoint that handles adding new review 
app.post("/api/reviews", async (req, res) => {
    try {
        console.log('hello review endpoint start')
        console.log(req.body);
        const { selectedFoodItem, reviewText, rating } = req.body;
        //create new review 
        console.log("Received Rating:", rating);
        const newReview = new Review({
            photo: "",
            caption: reviewText,
            rating: rating,
        });
        console.log("made a new review")
        // save to reviews collection
        const savedReview = await newReview.save();
        // find the food item by ID
        let foodItem = await Food.findById(selectedFoodItem);
        if (!foodItem) {
            return res.status(404).json({ error: "Food item not found" });
        }
        // add new review to reviews array of the food item
        foodItem.reviews.push(savedReview._id);
        console.log("added review to food review array!")

        // update the average rating of food item here: 

        // save updated food item
        await foodItem.save();
        res.json({ success: true, foodItem, savedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});
