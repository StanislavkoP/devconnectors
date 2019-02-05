const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
	passport.use(
		new JWTStrategy(opts, function (jwt_payload, done)  {
			User
				.findById(jwt_payload.id)
				.then(user => {
					return done(null, user)
				})
				.catch(err => console.log(err))
		})
	)
}