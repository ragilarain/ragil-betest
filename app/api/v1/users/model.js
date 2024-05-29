const mongoose = require('mongoose')
const { model, Schema} = mongoose
const bcrypt = require('bcryptjs')

let UsersSchema = Schema(
    {
        userName: {
            type: String,
            minlength: [3, 'Min length of Username is 3 char'],
            maxlength: [20, 'Max length of Username is 20 char'],
            required: [true, 'Please fill Username']
        },
        accountNumber: {
            type: Number,
            required: [true, 'Account Number cannot be null']
        },
        emailAddress: {
            type: String,
            required: [true, 'Email Address cannot be null']
        },
        password: {
            type: String,
        },
        identityNumber: {
            type: Number,
            required: [true, 'Identity Number cannot be null']
        },
        isDeleted: {
            type: Number
        },
        isActive: {
            type: Number
        }
    },
    { timestamps: true }
)

UsersSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = model('Users', UsersSchema);