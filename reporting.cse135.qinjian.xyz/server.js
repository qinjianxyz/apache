const express = require('express'); // server software
const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session'); // session middleware
const passport = require('passport'); // authentication
const connectEnsureLogin = require('connect-ensure-login'); // authorization
const auth = require('passport-local-authenticate');
const User = require('./user.js'); // User Model
const app = express();

// check for valid email address
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Configure Sessions Middleware
app.use(session({
  secret: 'r8q,+`2&1LM3)qwdCD*zAGpxqwer{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000
  } // 1 hour
}));

// Configure Middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.static(__dirname + '/public_html'));



// Passport Local Strategy
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


let prefix = "/api";
let path = "/api"

// Route to Homepage
app.get(path + '/', (req, res) => {
  res.sendFile(__dirname + '/public_html/index.html');
});


// Route to Login Page
app.get(path + '/login', (req, res) => {
  res.sendFile(__dirname + '/public_html/login.html');
});

// Route to Dashboard
app.get(path + '/dashboard', connectEnsureLogin.ensureLoggedIn(prefix + '/login'), (req, res) => {
  let isAdmin = req.user['_doc']['admin'] == true;

  if (isAdmin) {
    res.send(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
		              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
              <div class="container">
                <h1>Main Menu<h1>
                <h1>Hello ${req.user.username}!</h1><br>
                <a href="${prefix}/logout">Log Out</a><br>
                <a href="${prefix}/secret">Dashboard</a><br>
                <a href="${prefix}/user">User Management</a><br>
              </div>`);
  } else {
    res.send(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
		              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
              <div class="container">
                <h1>Main Menu<h1>
                <h1>Hello ${req.user.username}!</h1><br>
                <a href="${prefix}/logout">Log Out</a><br>
                <a href="${prefix}/secret">Dashboard</a><br>
              </div>`);
  }


});

app.get(path + '/report/:id', connectEnsureLogin.ensureLoggedIn(prefix + '/login'), (req, res) => {
  let id = req.params.id;
  if (id > 1 || id < 1) {
    res.send("Invalid ID");
  } else {
    res.sendFile(__dirname + `/public_html/report/report${id}.html`);
  }
});

// Route to Secret Page
app.get(path + '/secret', connectEnsureLogin.ensureLoggedIn(prefix + '/login'), (req, res) => {
  res.sendFile(__dirname + '/public_html/dashboard.html');
});

// Route to User Management
app.get(path + '/user', connectEnsureLogin.ensureLoggedIn(prefix + '/login'), (req, res) => {
  if (req.user.admin) {
    res.sendFile(__dirname + '/public_html/user.html');
  } else {
    res.redirect(prefix + '/dashboard');
  }
  
});

app.get(path + '/users', connectEnsureLogin.ensureLoggedIn(prefix + '/login'), async(req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (err) {
      res.send(err);
    }
});


// Add New User (local)
app.post(path + '/users', connectEnsureLogin.ensureLoggedIn(prefix + '/login'), async (req, res) => {
  let loggedInUser = req.user;
  let body = req.body;

  if (!validateEmail(body.email)) {
    res.json({
      success: false,
      message: 'Invalid Email'
    })
    return;
  }

  if (loggedInUser.admin) {
    let user = new User({
      username: body.username,
      email: body.email,
      admin: body.admin
    });

    User.register(user, body.password, (err, user) => {
      if (err) {
        res.json({
          success: false,
          message: err.message
        })
      } else {
        res.json({
          success: true,
          message: "Your account has been saved."
        })
      }
    });
  }
});

// delete user
app.delete(path + '/users/:name', connectEnsureLogin.ensureLoggedIn(prefix + '/login'), async (req, res) => {
  let loggedInUser = req.user;
  let name = req.params.name;

  if (loggedInUser.admin) {
    try {
      await User.deleteOne({
        username: name
      });
      res.json({
        success: true,
        message: "User has been deleted."
      })
    } catch (err) {
      res.json({
        success: false,
        message: err.message
      })
    }
  }
});

app.put(path + '/users/:name', connectEnsureLogin.ensureLoggedIn(prefix + '/login'), async (req, res) => {
  let loggedInUser = req.user;
  let name = req.params.name;
  let body = req.body;

  if (loggedInUser.admin) {

    if (!validateEmail(body.email)) {
      res.json({
        success: false,
        message: 'Invalid Email'
      })
      return;
    }

    if (loggedInUser.username == body.username && !body.admin) {
      res.json({
        success: false,
        message: "You cannot remove your admin status."
      })
      return;
    }

    try {
      await User.deleteOne({
        username: name
      });
      await User.register(new User({
        username: body.username,
        email: body.email,
        admin: body.admin
      }), body.password, (err, user) => {
        if (err) {
          res.json({
            success: false,
            message: err.message
          })
        } else {
          res.json({
            success: true,
            message: "User has been updated."
          })
        }
      });
  } catch (err) {
      res.json({
        success: false,
        message: err.message
      })
    }
  } else {
    res.json({
      success: false,
      message: "You are not authorized to perform this action."
    })
  }
});

// Route to Log out
app.get(path + '/logout', function (req, res) {
  req.logout(() => {
    res.redirect(prefix + '/login');
  });
});

// Post Route: /login
app.post(path + '/login', passport.authenticate('local', {
  failureRedirect: prefix + '/login'
}), function (req, res) {
  console.log(req.user)
  res.redirect(prefix + '/dashboard');
});

// assign port
const port = 3005;
app.listen(port, () => console.log(`This app is listening on port ${port}`));