
//const express = require("express");
import express from 'express'
//const mongoose = require("mongoose");
import mongoose from 'mongoose'
//const User = require("../models/User");
import User from '../models/User.js'
import Catalog from '../models/Catalog.js'
import Food from '../models/Food.js'

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
        //const food = await Food.find();
        console.log('got food:', food)
        res.json(food);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})