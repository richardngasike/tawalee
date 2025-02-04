const express = require('express');
const app = express();
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set views directory
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
// By Richard Ngasike
app.use(ejsLayouts);

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes of pages
app.get('/', (req, res) => {
  res.render('pages/index', { title: 'Tawalee | Homepage', page: 'home' });
});

app.get('/about', (req, res) => {
  res.render('pages/about', { title: 'Tawalee | About Us', page: 'about' });
});

app.get('/services', (req, res) => {
  res.render('pages/services', { title: 'Tawalee | Services', page: 'services' });
});

app.get('/contact', (req, res) => {
  res.render('pages/contact', { title: 'Tawalee | Contact ', page: 'contact' });
});

app.get('/shop', (req, res) => {
  res.render('pages/shop', { title: 'Tawalee | Shop page', page: 'shop' });
});

app.get('/testimonials', (req, res) => {
  res.render('pages/testimonials', { title: 'Testimonials and Partners', page: 'testimonials' });
});



// Shop pages routes
app.get('/trousers', (req, res) => {
  res.render('pages/items/trousers', { title: 'Shop Trousers', page: 'Trousers' });
});

app.get('/shirts', (req, res) => {
  res.render('pages/items/shirts', { title: 'Shop Shirts', page: 'Shirts' });
});

app.get('/jackets', (req, res) => {
  res.render('pages/items/jackets', { title: 'Shop Jackets', page: 'Jackets' });
});

app.get('/school', (req, res) => {
  res.render('pages/items/school', { title: 'Shop School Outfits', page: 'school' });
});

app.get('/male', (req, res) => {
  res.render('pages/items/male', { title: 'Shop Male Outfits', page: 'male' });
});

app.get('/female', (req, res) => {
  res.render('pages/items/female', { title: 'Shop Female Outfits', page: 'female' });
});

app.use((req, res) => {
  res.redirect('/'); // Redirect to home page
});

// Contact Form Submission Route
app.post('/submit-contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Using Gmail service
    auth: {
      user: 'richardmax254@gmail.com', // Replace with your email
      pass: 'Ride@1635.', // Replace with your app-specific password or Gmail password
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: 'richardmax254@gmail.com',
    subject: `Contact Form Submission from ${name}`,
    text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.send('Message sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('There was an error sending your message.');
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
