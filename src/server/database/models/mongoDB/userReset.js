const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserResetSchema = new Schema({
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true },
    expiry: { type: Date, required: true }
});

mongoose.model('userReset', UserResetSchema);