const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

const validationProfileInput = require('../../validation/profile');
const validationEducationInput = require('../../validation/education');
const validationExperienceInput = require('../../validation/experience');

router.get('/profile', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	const errors = {};

	Profile
		.findOne({
			user: req.user.id
		})
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user'
				return res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json(err))
});

router.post('/profile', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	const {
		errors,
		isValid
	} = validationProfileInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors)
	}

	const profileFields = {};

	profileFields.user = req.user.id;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.company) profileFields.company = req.body.company;
	if (req.body.website) profileFields.website = req.body.website;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.bio) profileFields.bio = req.body.bio;
	if (req.body.status) profileFields.status = req.body.status;
	if (req.body.githubusername)
		profileFields.githubusername = req.body.githubusername;

	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
	}


	profileFields.social = {};
	if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
	if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
	if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

	Profile
		.findOne({
			user: req.user.id
		})
		.then(profile => {
			if (profile) {
				Profile
					.findOneAndUpdate({
						user: req.user.id
					}, {
						$set: profileFields
					}, {
						new: true
					})
					.then(profile => res.json(profile))

			} else {
				Profile
					.findOne({
						handle: profileFields.handle
					})
					.then(profile => {
						if (profile) {
							errors.handle = 'That handle already exists';
							res.status(400).json(errors);
						}

						new Profile(profileFields).save().then(profile => res.json(profile));
					});
			}
		})
});

router.get('/profile/user/:user_id', (req, res) => {
	const errors = {};

	Profile
		.findOne({
			handle: req.params.user_id
		})
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(() => {
			errors.noprofile = 'There is no profile for this user';
			res.status(404).json(errors)
		})
});

router.get('/profile/handle/:handle', (req, res) => {
	const errors = {};

	Profile
		.findOne({
			handle: req.params.handle
		})
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(() => {
			errors.noprofile = 'There is no profile for this user';
			res.status(404).json(errors)
		})
});

router.get('/profile/all', (req, res) => {
	const errors = {};

	Profile
		.find()
		.populate('user', ['name', 'avatar'])
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}

			res.json(profiles);
		})
		.catch(() => {
			errors.noprofile = 'There is no profile for this user';
			res.status(404).json(errors)
		})
});


router.post('/profile/experience', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	const {
		errors,
		isValid
	} = validationExperienceInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors)
	}

	Profile
		.findOne({
			user: req.user.id
		})
		.then(profile => {
			const newExp = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			};

			profile.experience.unshift(newExp);

			profile.save().then(profile => res.json(profile))
		})
});

router.post('/profile/education', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	const {
		errors,
		isValid
	} = validationEducationInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors)
	}

	Profile
		.findOne({
			user: req.user.id
		})
		.then(profile => {
			const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			};

			profile.education.unshift(newEdu);

			profile.save().then(profile => res.json(profile))
		})
});

router.delete('/profile/education/:edu_id', passport.authenticate('jwt', {
	session: false
}), (req, res) => {

	Profile
		.findOne({
			user: req.user.id
		})
		.then(profile => {
			const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

			profile.education.splice(removeIndex, 1);

			profile.save().then(() => res.json(profile))
		})
		.catch(error => res.status(404).json(error));
});

router.delete('/profile/experience/:exp_id', passport.authenticate('jwt', {
	session: false
}), (req, res) => {

	Profile
		.findOne({
			user: req.user.id
		})
		.then(profile => {
			const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

			profile.experience.splice(removeIndex, 1);

			profile.save().then(() => res.json(profile))
		})
		.catch(error => res.status(404).json(error));
});

router.delete('/profile', passport.authenticate('jwt', {
	session: false
}), (req, res) => {

	Profile
		.findOneAndRemove({
			user: req.user.id
		})
		.then(() => {
			User
				.findByIdAndRemove({
					_id: req.user.id
				})
				.then(() => res.json({
					message: 'Success'
				}))
		})
});

module.exports = router;