const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Project',ProjectSchema);