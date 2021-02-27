const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Group = new Schema(
    {
        group_id: { type: String, required: true, unique:true },
        group_name: { type: String, required: true, unique:true },
        members: { type: Array },
        build_time: { type: Date },
        target: { type: String },
        group_description: { type: String },
        last_modify_date: { type: Date },
        last_modify_person: { type: String },
    },
    { timestamps: true },
)

module.exports = mongoose.model('group', Group)
