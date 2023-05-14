const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const landingRoutes = require('./routes/landing')
const posterRoutes = require('./routes/posters')
const usersRoutes = require('./routes/users')

const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);
require("dotenv").config();

// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
  express.urlencoded({
    extended: false
  })
);

// set up sessions
app.use(session({
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))




async function main() {

  app.use(flash())

  // Register Flash middleware
  app.use(function (req, res, next) {
      res.locals.success_messages = req.flash("success_messages");
      res.locals.error_messages = req.flash("error_messages");
      next();
  });

    app.use('/posters', posterRoutes);
    app.use('/users', usersRoutes);
  
}

main();

app.listen(3000, () => {
  console.log("Server has started");
});
