var express               = require('express');
var path                  = require('path');
var favicon               = require('serve-favicon');
var logger                = require('morgan');
var cookieParser          = require('cookie-parser');
var bodyParser            = require('body-parser');

var mongoose              = require('mongoose');
var cookieSession         = require('cookie-session');
var methodOverride        = require('method-override');
var morgan                = require('morgan');
var config                = require('./config');

// Front
var index         = require('./routes/index');

// Back
var admin         = require('./routes/admin/admin');
var login         = require('./routes/admin/login');
var dashboard     = require('./routes/admin/dashboard');
var allPosts      = require('./routes/admin/all-posts');
var addPost       = require('./routes/admin/add-post');
var editPost      = require('./routes/admin/edit-post');
var allCategories = require('./routes/admin/all-categories');
var addCategory   = require('./routes/admin/add-category');
var editCategory  = require('./routes/admin/edit-category');
var allAdmins     = require('./routes/admin/all-admins');
var addAdmin      = require('./routes/admin/add-admin');
var editAdmin     = require('./routes/admin/edit-admin');
var general       = require('./routes/admin/general');
var contact       = require('./routes/admin/contact');
var profile       = require('./routes/admin/profile');
var logout        = require('./routes/admin/logout');
var notAllowed    = require('./routes/admin/not-allowed');




var app = express();

// =======================
// configuration =========
// =======================
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
// database stuff
var options = { server: { socketOptions: { connectTimeoutMS: 10000 }}};
mongoose.connect(config.database, options); // connect to database
app.set('superSecret', config.secret); // secret variable

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true,
  outputStyle: 'compressed'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['icEgv95GyU', 'r5oQr21nj5'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// =======================
//  ROUTES              ||
// =======================
// front
app.use('/', index);

// back
app.use('/admin', admin);

app.use('/admin/login', login);
app.use('/admin/dashboard',isAuthenticated, dashboard);

app.use('/admin/all-posts',isAuthenticated,  allPosts);
app.use('/admin/add-post',isAuthenticated, addPost);
app.use('/admin/edit-post',isAuthenticated, editPost);

app.use('/admin/all-categories',isAuthenticated, allCategories);
app.use('/admin/add-category',isAuthenticated, addCategory);
app.use('/admin/edit-category',isAuthenticated, editCategory);

app.use('/admin/all-admins',isAuthenticated, isAdmin, allAdmins);
app.use('/admin/add-admin',isAuthenticated, isAdmin, addAdmin);
app.use('/admin/edit-admin',isAuthenticated, isAdmin, editAdmin);

app.use('/admin/general',isAuthenticated, isAdmin, general);
app.use('/admin/contact',isAuthenticated, isAdmin, contact);

app.use('/admin/profile',isAuthenticated, profile);
app.use('/admin/logout',isAuthenticated, logout);
app.use('/admin/not-allowed',isAuthenticated, notAllowed);

// Check if the user have a session
function isAuthenticated(req, res, next) {
    if (req.session.name)
        return next();
    res.redirect('/admin/login');
}

// Check if the user has access to some pages
function isAdmin(req, res, next) {
    if (req.session.role == 'Admin')
        return next();
    res.redirect('/admin/not-allowed');
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
