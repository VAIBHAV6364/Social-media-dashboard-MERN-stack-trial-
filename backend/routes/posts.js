const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllPosts,
    likePost,
    commentPost
} = require('../controllers/postController');

router.post('/', createPost);           // Create a post
router.get('/', getAllPosts);           // View all posts
router.put('/like/:id', likePost);      // Like a post
router.post('/comment/:id', commentPost); // Comment on post

module.exports = router;
