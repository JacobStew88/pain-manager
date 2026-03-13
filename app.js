// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 3000
const NOTES_SERVICE = "http://localhost:8081";

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

// GET Calendar
app.get('/calendar', async function (req, res) {
    try {
        res.render('calendar'); // Render the tutorial.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

app.post('/download-ics', async (req, res) => {
  try {
    const response = await fetch('http://localhost:8080/ics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error('ICS service failed');
    }

    const icsData = await response.text();

    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', 'attachment; filename="event.ics"');
    res.send(icsData);

  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to generate calendar file');
  }
});

app.get('/notes', async (req, res) => {
  try {

    const response = await fetch(`${NOTES_SERVICE}/notes`);

    if (!response.ok) {
      throw new Error('Notes service failed');
    }

    const notes = await response.json();

    res.render('notes', { notes });

  } catch (error) {

    console.error(error);
    res.status(500).send('Failed to load notes');

  }
});

app.post('/notes', async (req, res) => {
  try {

    const response = await fetch(`${NOTES_SERVICE}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error('Notes service failed');
    }

    res.redirect('/notes');

  } catch (error) {

    console.error(error);
    res.status(500).send('Failed to create note');

  }
});

app.post('/notes/delete/:id', async (req, res) => {
  try {
    const noteId = req.params.id;

    const response = await fetch(`http://localhost:8081/notes/${noteId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete note');
    }

    res.redirect('/notes'); // reload the notes page after deletion

  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to delete note');
  }
});


// LISTENER
app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});