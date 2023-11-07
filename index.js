'use strict';

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

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
            <p> Thank you for all the helpful feedback! We will be sending you a surprise giftcard
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

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}...`); });

