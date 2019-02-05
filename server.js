const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const routes = require('./routes/index');; 

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('Success connection'))
	.catch(err => console.log(err))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());

require('./config/passport')(passport);


app.use ('/api', 
	routes.users,
	routes.profile,
	routes.posts
);


if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req,res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}


const port = process.env.PORT || 7777

app.listen(port, () => console.log(`Server is working with ${port} port`))