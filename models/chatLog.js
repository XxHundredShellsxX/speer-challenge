const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatLogSchema = new Schema(
    {
        userIds: {
            type: [{type: String}],
            default: []
        },
        messages: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
            default: []
        },
    },
    {
        timestamps: true,
        collection: "chatlogs",
    }
);

module.exports = mongoose.model('ChatLog', ChatLogSchema, 'chatlogs');
