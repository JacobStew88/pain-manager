// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 8000

// Handlebars
const { engine } = require('express-handlebars');

const exphbs = require('express-handlebars');

const hbs = exphbs.create({
  extname: '.hbs',
  helpers: {
    eq: (a, b) => a == b,
    formatDate: (date) => date.toISOString().split('T')[0].replace(/-/g, '/')
  }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// READ ROUTES
app.get('/', async function (req, res) {
    try {
        res.render('home'); // Render the home.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

// GET TUTORIAL
app.get('/tutorial', async function (req, res) {
    try {
        res.render('tutorial'); // Render the tutorial.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

// GET MUSCLE GROUP
app.get('/muscle-group', async function (req, res) {
    try {
        res.render('muscle'); // Render the tutorial.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

// GET PAIN LEVEL
app.get('/pain-level', async function (req, res) {
    try {
        res.render('pain'); // Render the tutorial.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});



// LISTENER

app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' +
            PORT +
            '; press Ctrl-C to terminate.'
    );
});