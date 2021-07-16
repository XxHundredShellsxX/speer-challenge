const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        identity: {
            type: Object,
            default: {
                isAdmin: false
            }
        },
        username: {
            type: String
        },
        password: {
            type: String
        },
        chatLogs: {
            type: Map,
            of: { type: Schema.Types.ObjectId, ref: 'ChatLog' }
        }
    },
    {
        timestamps: true,
        collection: "users"
    },
    
);


module.exports = mongoose.model('User', UserSchema, 'users');
