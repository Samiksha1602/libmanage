const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path=require('path');
var passport = require('passport');
var authenticate = require('./authenticate');


// Loading routers
const bookRouter = require('./routes/api/bookRouter');
const userRouter = require('./routes/api/userRouter');
const issueRouter = require('./routes/api/issueRouter');
const app= express();

app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config 
/*
const mongoURI = 'mongodb+srv://sakshi:sakshi16@cluster0.eh3ws.mongodb.net/lib_management?retryWrites=true&w=majority';

// Connect to mongo
mongoose.connect(mongoURI)
.then(()=> {console.log("MongoDB Connected");})
.catch(err => console.log(err));
*/
mongoose.connect("mongodb+srv://Dhanisha:dhanisha@cluster0.9mdtq.mongodb.net/lib_management?retryWrites=true&w=majority",{
useNewUrlParser:true
}).catch(error=> console.error(error));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(passport.initialize());

// Use routes
app.use('/api/books',bookRouter);
app.use('/api/users',userRouter);
app.use('/api/issues',issueRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const port = 5000;

app.listen(port, ()=> console.log(`Server started running on port ${port}`));