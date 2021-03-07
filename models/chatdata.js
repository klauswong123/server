const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Chat = new Schema(
    {
        raw_text: { type: String, required: true },
        sender: { type: String, required: true },
        receiver: { type: String, required: true },
        if_read: { type: String, default: false },
        sender_phone: { type: String, required: true },
        receiver_phone: { type: String, required: true }

    },
    { timestamps: true },
)
Chat.index({'$**': 'text'});

module.exports = mongoose.model('chatroom', Chat)
