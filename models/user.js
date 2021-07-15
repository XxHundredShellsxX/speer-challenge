const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        identity: {
            type: Object,
            default: {
                is_admin: false
            }
        },
        username: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true,
        collection: "users"
    }
);


module.exports = mongoose.model('User', UserSchema, 'users');
