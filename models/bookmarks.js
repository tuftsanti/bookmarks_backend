const { Schema, model } = require('mongoose');

const bookmarkSchema = Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type:String, default: 'my bookmark' },
    tags: [{type: String}]
});

const Bookmark = model('bookmark', bookmarkSchema);

module.exports = Bookmark;