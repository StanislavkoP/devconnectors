const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

const validationPostInput = require('../../validation/post');

router.get('/posts', (req, res) => {
	Post
		.find()
		.sort({date: -1})
		.then(posts => res.json(posts))
		.catch(() => res.status(404).json({nopostfound: 'No posts found'}))
});

router.get('/posts/post/:post_id', (req, res) => {
	Post
		.findById(req.params.post_id)
		.then(post => res.json(post))
		.catch(() => res.status(404).json({nopostfound: 'No post found with that ID'}))
});

router.post('/post',  passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validationPostInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors)
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id,
	});

	newPost
		.save()
		.then((post) => res.json(post))
		.catch(err => res.status(400).json(err))


});

router.delete('/posts/post/:post_id',  passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile
		.findOne({user: req.user.id})
		.then(() => {
			Post
				.findById(req.params.post_id)
				.then(post => {
					if (post.user.toString() !== req.user.id ) {
						return res.status(401).json({ notauthorized: 'User not authorized' })
					}
					
					post.remove().then(() => res.json({ success: true }));
				})
				.catch(() => res.status(404).json({nopostfound: 'No post found with that ID'}))
		})
});

router.post('/post/like/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile
		.findOne({user: req.user.id})
		.then(() => {
			Post
				.findById(req.params.post_id)
				.then(post => {
					if (post.likes.filter(like.user.toString() === req.user.id).length === 0  ) {
						return res.status(401).json({ alreadyliked: 'User already liked this post' })
					}

					post.likes.unshift({user: req.user.id});
					
					post.save().then(post => res.json(post));
				})
				.catch(() => res.status(404).json({nopostfound: 'No post found' + req.params.post_id}))
		})
});

router.delete('/post/unlike/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile
		.findOne({user: req.user.id})
		.then(() => {
			Post
				.findById(req.params.post_id)
				.then(post => {
					if (post.likes.filter(like.user.toString() === req.user.id).length === 0  ) {
						return res.status(401).json({ notliked: 'You have not yet liked this post' })
					}

					const removeIndexLike = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
					
					post.likes.slice(removeIndexLike, 1);
					
					post.save().then(post => res.json(post));
				})
				.catch(() => res.status(404).json({nopostfound: 'No post found'}))
		}).catch(err => console.log(err))
});

router.post('/post/comment/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	
	const {errors, isValid} = validationPostInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors)
	}

	Post
		.findById(req.params.post_id)
		.then(post => {

			const newComment = {
				user: req.user.id,
				name: req.body.name,
				text: req.body.text,
				avatar: req.body.avatar
			}

			post.comments.unshift(newComment);

			post.save().then(post => res.json(post));
		})
		.catch(() => res.status(404).json({nopostfound: 'No post found'}))	
});

router.delete('/post/comment/:post_id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	
	Post
		.findById(req.params.post_id)
		.then(post => {
			if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0  ) {
				return res.status(401).json({ nocomment: 'This comment is not exist' })
			}


			const removeIndexComment = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);
					
			post.comments.slice(removeIndexComment, 1);
			
			post.save().then(post => res.json(post));
})
		.catch(() => res.status(404).json({nopostfound: 'No post found'}))	
});


module.exports = router

