const mongoose = require('mongoose');

const Translation = mongoose.model('Translation', {
    word: String,
    trans: String,
    synonym: String
})

module.exports = Translation;