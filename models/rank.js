const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Rank = new Schema(
    {

        email:[
      {type: Schema.Types.ObjectId, ref: 'email'}
    ],
        invite_people: { type: Array},
        invite_success: { type: Array},
        invite_number_this_month: { type: Number},
        invite_number_all: { type: Number},
    },
    { timestamps: true },
)

module.exports = mongoose.model('rank', Rank)
