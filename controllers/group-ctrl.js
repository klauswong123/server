const Group = require('../models/group')

createGroup = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: '請填寫信息',
        })
    }

    const group = new Group(body)

    if (!group) {
        return res.status(400).json({ success: false, error: err })
    }

    group
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: group._id,
                message: '分會創建成功',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: '分會創建失敗',
            })
        })
}

updategroup = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: '請填寫信息',
        })
    }

    Group.findByIdAndUpdate(req.params.id, {$set:req.body}, function(err, response){
         if(err){
            console.log(err);
            }
            res.send('修改成功');
    });
}

getgroupByName = async (req, res) => {
    await Group.findOne({ group_name: req.query.group_name }, (err, group) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!group) {
            return res
                .status(404)
                .json({ success: false, error: `分會不存在` })
        }
        return res.status(200).json({ success: true, data: group })
    }).catch(err => console.log(err))
}

getGroups = async (req, res) => {
    await Group.find({}, (err, group) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!group) {
            return res
                .status(404)
                .json({ success: false, error: `分會不存在` })
        }
        return res.status(200).json({ success: true, data: group })
    }).catch(err => console.log(err))
}

module.exports = {
    createGroup,
    updategroup,
    getgroupByName,
    getGroups
}
