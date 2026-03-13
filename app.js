// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 3000
const CALENDAR_SERVICE = "http://localhost:8080";
const NOTES_SERVICE = "http://localhost:8081";
const BOOKMARK_SERVICE = "http://localhost:9001";

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
        const muscle = req.query.muscle || ""; // this comes from muscle page
        res.render("pain", { muscle });
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

// GET Calendar
app.get('/calendar', async function (req, res) {
    try {
        res.render('calendar'); // Render the calendar.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

app.post('/download-ics', async (req, res) => {
  try {
    const response = await fetch(`${CALENDAR_SERVICE}/ics`, {
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
    const notes = await response.json();

    // Convert tags array into comma-separated string for each note
    const notesWithTagString = notes.map(note => ({
      ...note,
      tagString: note.tags ? note.tags.join(', ') : ''
    }));

    res.render('notes', { notes: notesWithTagString });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load notes');
  }
});

app.post('/notes', async (req, res) => {
  try {
    // Prepare the request body
    const body = {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags
        ? req.body.tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
        : []
    };

    console.log("Sending note to microservice:", body);

    const response = await fetch(`${NOTES_SERVICE}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error("Notes service failed");

    res.redirect('/notes');

  } catch (err) {
    console.error("Failed to create note:", err);
    res.status(500).send('Failed to create note');
  }
});

app.post('/notes/delete/:id', async (req, res) => {
  try {
    const noteId = req.params.id;

    const response = await fetch(`${NOTES_SERVICE}/notes/${noteId}`, {
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

app.get("/bookmarks", async (req, res) => {
  try {
    const response = await fetch(`${BOOKMARK_SERVICE}/bookmarks`);
    if (!response.ok) throw new Error("Bookmark service failed");
    const bookmarks = await response.json();

    const selectedMuscle = req.query.muscle || "";
    const painLevel = req.query.painLevel || "";

    res.render("bookmarks", { bookmarks, selectedMuscle, painLevel });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to load bookmarks");
  }
});

app.post("/bookmarks", async (req, res) => {
  try {
    const response = await fetch(`${BOOKMARK_SERVICE}/bookmarks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    if (!response.ok) throw new Error("Bookmark service failed");
    const newBookmark = await response.json();
    res.json(newBookmark); // return added bookmark as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add bookmark");
  }
});

app.delete("/bookmarks/:id", async (req, res) => {
  try {
    const response = await fetch(`${BOOKMARK_SERVICE}/bookmarks/${req.params.id}`, {
      method: "DELETE"
    });
    if (!response.ok) throw new Error("Bookmark service failed");
    res.json({ detail: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete bookmark");
  }
});


// LISTENER
app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});