const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    caption: String,
    image: String,
    likes: [mongoose.Schema.Types.ObjectId],
    comments: [{ userId: mongoose.Schema.Types.ObjectId, text: String }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
