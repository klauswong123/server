const InviteNews = require('../models/inviteNews')

createInviteNews = (req, res) => {
    const body = req.body
    const date = new Date()
    body.invite_year = date.getFullYear()
    body.invite_month = date.getMonth()+1
    body.invite_date = date
    if (!body) {
        return res.status(400).json({
            success: false,
            error: '請填寫信息',
        })
    }
    console.log(body);
    const invite = new InviteNews(body)

    if (!invite) {
        return res.status(400).json({ success: false, error: err })
    }

    invite
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: invite._id,
                message: '邀請創建成功',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: '邀請創建成功',
            })
        })
}

updateInviteNews = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: '請填寫信息',
        })
    }
    InviteNews.findByIdAndUpdate(req.params.id, {$set:req.body}, function(err, response){
         if(err){
            console.log(err);
            }
            console.log(response);
            res.send('修改成功');
    });
}

getInviteNewsByMonth = async (req, res) => {
    const today = new Date()
    const thisMonth = today.getMonth()+1
    const thisYear = today.getFullYear()
    await InviteNews.find({ invite_year: thisYear, invite_month:thisMonth, invite_person: req.query.invite_person }, (err, invite) => {
        if (err) {

            return res.status(400).json({ success: false, error: err })
        }

        if (!invite) {
            console.log(err);
            return res
                .status(200)
                .json({ success: true, data: invite })
        }
        return res.status(200).json({ success: true, data: invite })
    }).catch(err => console.log(err))
}

getInviteNewsThisMonth = async (req, res) => {
    const today = new Date()
    const thisMonth = today.getMonth()+1
    const thisYear = today.getFullYear()
    await InviteNews.find({ invite_year: thisYear, invite_month:thisMonth}, (err, invite) => {
        if (err) {

            return res.status(400).json({ success: false, error: err })
        }

        if (!invite) {
            console.log(err);
            return res
                .status(200)
                .json({ success: true, data: invite })
        }
        return res.status(200).json({ success: true, data: invite })
    }).catch(err => console.log(err))
}

getInviteNewsByInvite = async (req, res) => {
    await InviteNews.find({ invite_person: req.query.invite_person }, (err, invite) => {
        if (err) {

            return res.status(400).json({ success: false, error: err })
        }

        if (!invite) {
            console.log(err);
            return res
                .status(200)
                .json({ success: true, data: invite })
        }
        return res.status(200).json({ success: true, data: invite })
    }).catch(err => console.log(err))
}

getInviteNewsByInvited = async (req, res) => {
    await InviteNews.find({ invited_person: req.query.invited_person }, (err, invite) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!invite) {
            console.log(err);
            return res
                .status(200)
                .json({ success: true, data: invite })
        }
        return res.status(200).json({ success: true, data: invite })
    }).catch(err => console.log(err))
}

getInviteNews = async (req, res) => {
    await InviteNews.find({}, (err, invite) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!invite) {
            return res
                .status(404)
                .json({ success: false, error: `分會不存在` })
        }
        return res.status(200).json({ success: true, data: invite })
    }).catch(err => console.log(err))
}

deleteinvite = async (req, res) => {
    await InviteNews.findOneAndDelete({ _id: req.params.id }, (err, invite) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!invite) {
            return res
                .status(404)
                .json({ success: false, error: `找不到資料` })
        }
        return res.status(200).json({ success: true, data: invite })
    }).catch(err => console.log(err))
}

module.exports = {
    createInviteNews,
    updateInviteNews,
    getInviteNewsByMonth,
    getInviteNews,
    getInviteNewsByInvite,
    getInviteNewsByInvited,
    getInviteNewsThisMonth,
    deleteinvite,
}
