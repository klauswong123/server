const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Client = new Schema(
    {

        name: { type: String, required: true },
        gender: { type: String, required: true },
        birthday: { type: Date, required: true },
        email: { type: String, required: true, unique: true },
        occupation: { type: String, required: true },
        salary: { type: String, required: true },
        hkid: { type: String, required: true },
        company: { type: String, required: true },
        activated: { type: Boolean, default: false },
        phone_number: { type: String, required: true, unique: true },
        office_address: { type: String, required: true },
        invitation_code:{ type: String, required: true },
        invitated_code:{ type: String, required: false },
        invitated_people:{ type: Array, required: false, default:[] },
        accepted_people:{ type: Array, required: false, default:[] },
        product_name:{ type: String, required: true },
        product_type:{ type: String, required: true },
        product_branch:{ type: String },
        personal_description:{ type: String, required: false },
        business_description:{ type: String, required: false },
        product_description:{ type: String, required: false },
        recommand_this_month: { type: Number, required: false },
        recommand_all: { type: Number, required: false },
        recommand_accepted: { type: Number, required: false },
        subscription_due:{type: Date, required: false},
        subscription_type:{type: String, required: false},
        connected_people:{type: Array, required: false},
        booking: { type: String, required: false },
        bouns: { type: String, required: false },
        ranking:{ type: String, required: false },
        business_size:{ type: String, required: false },
        business_link: { type: String, required: false },
        icon:{ data:Buffer, contentType:String }
    },
    { timestamps: true },
)
Client.index({'$**': 'text'});

module.exports = mongoose.model('clients', Client)
