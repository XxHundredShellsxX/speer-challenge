const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatMessageSchema = new Schema(
    {
        message: String,
        postedByUser: String,
    },
    {
        timestamps: true,
        collection: "chatmessages",
    }
);

module.exports = mongoose.model('Message', ChatMessageSchema, 'messages');
