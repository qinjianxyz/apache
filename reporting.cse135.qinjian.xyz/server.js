const express = require('express'); // server software
const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login');// authorization
const User = require('./user.js'); // User Model
const app = express();

// Configure Sessions Middleware
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// Configure Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.static(__dirname + '/public_html'));

// Passport Local Strategy
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Route to Homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public_html/index.html');
});

// Route to Login Page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public_html/login.html');
});

// Route to Dashboard
app.get('/dashboard', connectEnsureLogin.ensureLoggedIn('/api/login'), (req, res) => {
  let isAdmin = req.user['_doc']['admin'] == true;

  if (isAdmin) {
    res.send(`<h1>Hello ${req.user.username}</h1><br>
              <a href="/api/logout">Log Out</a><br>
              <a href="/api/secret">Dashboard</a><br>
              <a href="/api/user">User Management</a><br>`);
  } else {
    res.send(`<h1>Hello ${req.user.username}</h1><br>
              <a href="/api/logout">Log Out</a><br>
              <a href="/api/secret">Dashboard</a>`);
  }

  
});

// Route to Secret Page
app.get('/secret', connectEnsureLogin.ensureLoggedIn('/api/login'), (req, res) => {
    res.sendFile(__dirname + '/public_html/dashboard.html');
});

// Route to User Management
app.get('/user', connectEnsureLogin.ensureLoggedIn('/api/login'), (req, res) => {
    res.sendFile(__dirname + '/public_html/user.html');
});

// Route to Log out
app.get('/logout', function(req, res) {
  req.logout(() => {
    res.redirect('/api/login');
  });
});

// Post Route: /login
app.post('/login', passport.authenticate('local', { failureRedirect: '/api/login' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/api/dashboard');
});

// assign port
const port = 3005;
app.listen(port, () => console.log(`This app is listening on port ${port}`));