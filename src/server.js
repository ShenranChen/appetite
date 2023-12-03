
//const express = require("express");
import express from 'express'
//const mongoose = require("mongoose");
import mongoose from 'mongoose'
//const User = require("../models/User");
import User from '../models/User.js'
import Catalog from '../models/Catalog.js'

const app = express()
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log('server running on port ${PORT}'));


mongoose.connect("mongodb+srv://jasontchan:Appetite123@appetite.uy0okn0.mongodb.net/dhh-data?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.post('/api/check-user', async (req, res) => {
    try {
    console.log('Request Body:', req.body)
      const { email, password } = req.body;
      const user = await User.findOne({ email, password })
      // Check if the user exists
      if (user) {
        res.json({ message: 'Found' });
      } else {
        res.json({ message: 'No Match' });
      }
    } catch (error) {
      console.error('Error checking credentials:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.get("/api/users", async (req, res) => {
    try {
        console.log("here E")
        const user = await User.find();
        // console.log("here B")
        res.json(user);
        // console.log("here C")
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send("Server Error");
    }
});


const CATALOG_OBJID = '655aa00fecfff2b51574ed70'
app.get("/api/catalog", async (req, res) =>
{
    try
    {
        let catalog = await Catalog.findById(CATALOG_OBJID)
        console.log(catalog)
        res.json(catalog)
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send("Server Error");
    }
});