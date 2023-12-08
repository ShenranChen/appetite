# APPetite
<img src="./images/App-logo.png" alt="APPetite Logo" width="200" height="200">

**_APPetite_** is mobile application designed to enhance the dining experience for UCLA students. The platform serves as a yelp for the three dining halls, allowing students to rate the individual dishes and see previous reviews for dishes the dining halls is serving that day. It will also be a catalog for dishes that have been served in the past, helping students plan ahead (especially useful for those that stalk UCLA dining). 

## Table of Contents
- [Why APPetite?](https://github.com/ShenranChen/appetite/#why-appetite)
- [Features](https://github.com/ShenranChen/appetite/#features)
- [How to run](https://github.com/ShenranChen/appetite/#how-to-run)
- [How to shutdown](https://github.com/ShenranChen/appetite/#how-to-shutdown)
- [Authors](https://github.com/ShenranChen/appetite/#authors)

## Why APPetite?
- Simple and intuitive UI to write reviews (comments + photos) 
- Login and maintain a profile with favorite dishes and user reviews 
- Search for specific dishes and look at reviews 
- Make Informed decisions about what to eat 
- Students find the most well-liked items and avoid unpopular dishes
- Reduce food waste, dining halls can gauge student interest 

## Features
- **Authentication:** Sign up and Sign in with email and password. 
- **Food Catalog:** Dynamically display food items and reviews.
- **Search for Food:** Find a food item in the catalog and see reviews.
- **Make a Review:** Search for a food, rate, and optionally write a review and upload a photo.
- **Like a Review:** Upvote reviews that you found helpful.
- **Favorite Foods:** Save your favorite foods to profile.
- **Earn Badges:** Earn badges on profile for making reviews.

## How to run
1. Clone the repository `https://github.com/ShenranChen/appetite.git`
2. Install NPM and Node.js from [their website](https://nodejs.org/en/download/)
3. Install XCode Simulator from App Store
4. In the repository, run `npm install` to install necessary libraries
5. Run `npm start` to start up both the server and the frontend. Press i to open the iOS simulator, and choose to run the app on iPhone 14 Pro Max for the best experience.
6. Ensure you are connected to eduroam wifi so you can connect to our database.

## How to shutdown
1. Terminate the frontend by Ctrl+C
2. Run ps to look for the PID of src/server.js, the line should look like `[PID] ttys003 0:04.11 node src/server.js`
3. Having the PID, run `kill [PID]` to shutdown the server

## Authors
_APPetite_ was made as a project for **CS 35L** taught by Professor Paul Eggert at UCLA in Fall 2023. **Made by**: Alicia Liu, Alexis Lee, Jason Chan, Jason Liu, Shenran Chen