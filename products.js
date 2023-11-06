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


// Define a JavaScript object with arrays of products, their company names, and prices: 
const products = [
    { company: 'AGYM', product: 'Spinning Cat Scratcher Ball', price: 52.99 },
    { company: 'Jasonwell', product: 'Foldable Dog Pool', price: 27.25 },
    { company: 'Expawlorer', product: 'Dog Fence Window', price: 30.50 },
    { company: 'Lollimeow', product: 'Capsule Pet Travel Backpack', price: 59.00 },
    { company: 'Drool\'d', product: 'Cat Hamster Wheel', price: 349.75 }
];

// Allow exporting of the object to other functions:
module.exports.products = products;


// Display the object in a table in the terminal console to confirm it works:
// https://developer.mozilla.org/en-US/docs/Web/API/Console/table
console.table(products); 

app.post("/submit-form-data", (req, res) => {
    
res.send(`
    ${htmlTop}
    <section>
        <h2>Response</h2>
        <article>
            <p>Currently under production!</p>
        </article>
    </section>
    ${htmlBottom}`)});
 
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}...`); });
