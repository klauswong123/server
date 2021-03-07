const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InviteNews = new Schema(
    {
        invite_news: { type: Array, required: true},
        invite_date: { type: Date, required: true },
        invite_person: { type: String, required: true},
        invited_person: { type: String, required: true},
        invite_year:  { type: String, required: true},
        invite_month: { type: String, required: true},
        accepted:{type: Boolean, default: false},
    },
    { timestamps: true },
)
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
module.exports = mongoose.model('invite_news', InviteNews)
