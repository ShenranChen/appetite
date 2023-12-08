
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

console.log("running app")
app.use(express.json({ limit: '10mb' }));
app.post('/api/check-user', async (req, res) => {
    try {
        console.log('Request Body:', req.body)
        const { email, password } = req.body;
        const user = await User.findOne({ email, password })
        // Check if the user exists
        if (user) {
            res.json({ message: 'Found', userName: email });
        } else {
            res.json({ message: 'No Match' });
        }
    } catch (error) {
        console.error('Error checking credentials:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/api/users/:email/favoriteFoods", async (req, res) => {
    try {
        console.log("jasonc's api's request body", req.body)
        const usersFavFoods = req.body.favArr;
        console.log("usersFavFoods", usersFavFoods);
        const userEmail = req.params.email;
        console.log("the users email in api call: ", userEmail)
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.favoriteFoods = usersFavFoods;
        await user.save();

    } catch (error) {
        console.error('Error posting data:', error);
        res.status(500).send("Server Error");
    }
})

//gets user obj from email
app.get("/api/users/:email", async (req, res) => {
    try {
        const userEmail = req.params.email;
        console.log("the users email in api call: ", userEmail)
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log("specific user from email:", user)
        res.json(user);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send("Server Error");
    }
});


app.get("/api/users", async (req, res) => {
    try {
        console.log('response:', res.body)
        let users = await User.find();
        console.log("users:", users)
        res.json(users);
        console.log("here C")
        console.log("works")
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send("Server Error");

    }
});

app.post("/api/sign-up", async (req, res) => {
    try {
        console.log("sign-up");
        console.log(req.body);

        const { firstName, lastName, email, password, profilePhoto, reviews, favoriteFoods, badges, year } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            res.json({ message: 'Found' });
            return;
        } else {
            res.json({ message: 'No Match' });

            const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                profilePhoto: profilePhoto,
                reviews: reviews,
                favoriteFoods: favoriteFoods,
                badges: badges,
                year: year,
            });
            const savedUser = await newUser.save();
            // res.json(savedUser);
            console.log("User created")
            return;
        }
    } catch (error) {
        console.error("bad");
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
});

//api to get ONE review by ID
app.get("/api/reviews/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let review = await Review.findById(id);
        console.log('got reviews w certain ID:', review)
        res.json(review);
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
        const { selectedFoodItem, reviewText, rating, user, photostring } = req.body;

        // find the food item by ID
        let foodItem = await Food.findById(selectedFoodItem);
        if (!foodItem) {
            return res.status(404).json({ error: "Food item not found" });
        }
        // Find the user by ID
        const existingUser = await User.findById(user._id);
        //create new review 
        console.log("Received Rating:", rating);
        const newReview = new Review({
            photo: photostring,
            caption: reviewText,
            rating: rating,
            item: foodItem.name,
            likes: 0
        });
        console.log("made a new review")
        // save to reviews collection
        const savedReview = await newReview.save();

        // add new review to reviews array of the food item
        foodItem.reviews.push(savedReview._id);
        console.log("added review to food review array!")

        // update the average rating of food item: 
        const existingRatings = await Promise.all(foodItem.reviews.map(async (reviewId) => { // get array of all the current ratings 
            const review = await Review.findById(reviewId).select('rating');
            return review.rating;
        }));

        console.log('current average rating', foodItem.averageRating)
        const numRatings = existingRatings.length;
        const sumOfRatings = existingRatings.reduce((total, rating) => total + rating, 0); //this adds up each rating to total 
        console.log('sum of ratings: ', sumOfRatings)
        console.log('numRatings:', numRatings)
        const newAverageRating = sumOfRatings / numRatings;

        foodItem.averageRating = newAverageRating;
        console.log('updated average rating', foodItem.averageRating)

        // save updated food item
        await foodItem.save();

        // add new review to reviews array of existingUser 
        console.log("server user reviews:", existingUser.reviews)
        existingUser.reviews.push(savedReview._id);
        console.log("added review to user review array!")

        // save updated user
        await existingUser.save();
        console.log("new user reviews:", existingUser.reviews)


        res.json({ success: true, foodItem, savedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// endpoint to handle updating likes for a review
app.post("/api/reviews/:id", async (req, res) => {
    try {

        console.log("in the server for handling likes\n")

        const id = req.params.id;
        let review = await Review.findById(id);

        console.log("server review:", review)
        // Update the likes count
        review.likes += 1;

        console.log("new like amount:", review.likes)

        // Save the updated review
        await review.save();

        res.json({ likes: review.likes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// handle unliking a review
app.post("/api/reviews/:id/unlike", async (req, res) => {
    try {

        console.log("in the server for handling unlike\n")

        const id = req.params.id;
        let review = await Review.findById(id);

        console.log("server review:", review)
        // Update the likes count
        review.likes -= 1;

        console.log("new like amount:", review.likes)

        // Save the updated review
        await review.save();

        res.json({ likes: review.likes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

/*
app.post("/api/users/:favoriteFoods/isFavoriteFood", async (req, res) => { // handleFavoriteFoods
    try {
        console.log("in server for seeing if food is already in users' favorites")
        
        const {userID, currentFoodItem} = req.body; // selectedFoodItem is food id
        const user = await User.findById({userID}); // find current user

        let alreadyFavorite = false;
        await user.find({favoriteFoods: {$in: currentFoodItem}}, (err, result) => {
            if (err) {
                console.log("not a favorite")
            } else {
                console.log("already a favorite")
                alreadyFavorite = true;
            }
        });
        res.json(alreadyFavorite);

    } catch (error) {
        console.error("Couldn't add food to favorites");
    }
});
*/
