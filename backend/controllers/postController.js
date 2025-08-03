const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const { userId, caption, image } = req.body;
    const post = new Post({ userId, caption, image });
    await post.save();
    res.status(201).json({ message: 'Post created', post });
};

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
};

exports.likePost = async (req, res) => {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(userId)) {
        post.likes.push(userId);
    } else {
        post.likes = post.likes.filter(id => id != userId);
    }

    await post.save();
    res.json({ message: 'Post liked/unliked' });
};

exports.commentPost = async (req, res) => {
    const { userId, text } = req.body;
    const post = await Post.findById(req.params.id);
    post.comments.push({ userId, text });
    await post.save();
    res.json({ message: 'Comment added' });
};
