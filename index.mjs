'use strict';

//--------- Imports -----------//
// import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { products as productsObj } from './products.js';
import asyncHandler from './asyncHandler.mjs';
dotenv.config();

//--------- Constants -------------//
const PORT = process.env.PORT
const app = express();
// const db = mongoose.connection;

//--------- Mongoose Setup -------------//
// mongoose.connect(
//     process.env.MONGODB_CONNECT_STRING,
//     { useNewUrlParser: true }
// );

// db.once("open", () => {
//     console.log("Successfully connected to MongoDB using Mongoose!");
// });

//---------- Middleware Setup -------------//
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public')); 

//----------- Variables --------------//
let htmlTop = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <script src='main.js'></script>
    <title>Jovanny Gochez</title>
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png"> 
    <link rel="icon" type="image/png" sizes="512x512" href="android-chrome-512x512.png"> 
    <link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png"> 
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png"> 
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png"> 
    <link rel="manifest" href="site.webmanifest">
    
</head>
<body>
    <header>
        <img src="android-chrome-192x192.png" id="hero-image">
        <h1 id="hero-name">
            Jovanny Gochez
        </h1>
    </header>
    <nav class="global-nav">
        <a href="index.html">Index</a>
        <a href="contact.html">Contact</a>
        <a href="gallery.html">Gallery</a>
        <a href="order.html">Order</a>
        <a href="staff.html">Staff</a>
    </nav>
    <main>
`;

let htmlBottom= `
</main>
    <footer>
        <p>
            &copy; 2023 Jovanny Gochez
        </p>
    </footer>
</body>
</html>
`;

//----------------- Middleware Statistic -------------------
const clickInterval = 10;
let clickCount = 0; 

// Middleware function that increments click count and checks for every 10 clicks
app.use('/submit-fetch-data', (req, res, next) => {
    clickCount++;
    if (clickCount % clickInterval === 0) {
        console.log(`Number of times button was clicked: ${clickCount}`);
    }
    next(); // go to staff page route handler
});

//----------------- Error (500) Handling -------------------
app.use((err, req, res, next) => {
    // check status code for error
    console.error('Server error: ', err);
    res.status(500).send("Sorry! We ran into an error!")
});

//----------------- Staff Page -------------------
// Route to listen for call to post data 
app.post('/submit-fetch-data',asyncHandler(async (req, res) => {
    const promisedResponse = await fetch('https://randomuser.me/api/');
    const promisedData = await promisedResponse.json();
    res.send(promisedData);
    } 
));

// -----------------------Contact Page ---------------------------
// listens for client POST request and provide response
app.post("/submit-form-data", (req, res) => {
    const person = req.body.firstlast;
    const address = req.body.eAddress;
    const favorite = req.body.favorite;
    const number = req.body.number;
    const suggestions = req.body.suggestions;
    const thoughts = req.body.thoughts;

res.send(`
    ${htmlTop}
    <section>
        <h2>Response</h2>
        <article>
            <h3> ${person}, thank you so much for your input!</h3>

            <p>We are responding to your feedback! You told us that your favorite page
            was <strong>${favorite}</strong> and left this message: <p>

            <p><strong><em>${thoughts}</em></strong></p>

            <p>You also said that we could work on our <strong> ${suggestions}!</strong></p>
            <p> Thank you for all the helpful feedback! We will be sending you a surprise gift card
            to In-n-Out to the following email: <p>
           
            <p><strong>${address}</strong></p>

            <p>Please enjoy a Double-Double on us! 
            Taking suggestions seriously, we will be continually modifying our application,
            and continually requesting users to give us their input. When the next surveys
            open we will be messaging you at this phone number:</p>

            <p><strong>${number}</strong><p>

            <p>Feel free to leave your thoughts any time. Any and all suggestions are welcomed so that
            we may perfect our website!</p>
            
            <p> <strong>Thank you, and take care!</strong></p>
        </article>
    </section>
    ${htmlBottom}`)});


    // -----------------------Order Page ---------------------------
    // listens for client POST request and provide response
    app.post("/submit-order-data", (req, res) => { 
        const person = req.body.firstlast;
        const email = req.body.eAddress;
        const homeAddress = req.body.sAddress;
        const company = req.body.company;
        const instructions = req.body.instructions;
        const quantity = req.body.quantity;

    function compareCompanies(myCompany) {
        for(const companyData of productsObj){
            if (companyData.company === myCompany) {
                return [companyData.product, companyData.price]
            }}}

    const [product, price] = compareCompanies(company)
    const unadustedPrice = price * quantity;
    const adjustedPrice = unadustedPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    res.send(` 
        ${htmlTop}
        <section>
            <h2>Order Confirmation</h2>
            <article>
                <p>Hi <strong>${person}</strong>, ⁣</p>
                
                <p><strong>${company}</strong> really appreciates you buying their
                <strong>${product}</strong> product!</p>
                <p>Your order quantity was: <strong>${quantity}</strong></p>
                <p>Your final balance is: <strong>${adjustedPrice}</strong></p>
                
                <p>We will be shipping your order to the following address:</p>
                <p><strong>${homeAddress}</strong></p>

                <p>As you requested, we will execute the following delivery instructions:</p>
                <p><strong>${instructions}</strong></p>
                
                <p>As a final thank you, we will be sending you some coupons
                at the following email: <strong>${email}</strong></p>

                <p>Thank you and take care!</p>
            </article>
        </section>
        ${htmlBottom}`)}); 

// create server to listen for HTTP requests
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}...`); });

