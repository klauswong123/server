const Chat = require('../models/chatdata')

createchat = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: '請填寫信息',
        })
    }

    const chat = new Chat(body)

    if (!chat) {
        return res.status(400).json({ success: false, error: err })
    }
    chat
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: chat._id,
                message: '對話創建成功',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: '對話出現錯誤',
            })
        })
}



updatechat = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: '請填寫信息',
        })
    }

    Chat.findByIdAndUpdate(req.params.id, {$set:req.body}, function(err, response){
                                 if(err){
                                                        console.log(err);
                                    }
                                    res.send('修改成功');

                            });
}

deletechat = async (req, res) => {
    await Chat.findOneAndDelete({ _id: req.params.id }, (err, chat) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!chat) {
            return res
                .status(404)
                .json({ success: false, error: `找不到資料` })
        }

        return res.status(200).json({ success: true, data: chat })
    }).catch(err => console.log(err))
}

getchatByPhone = async (req, res) => {
  const datas = []
  const sender = req.body.sender
  const receiver = req.body.receiver
    await Chat.find({ sender_phone: sender, receiver_phone:receiver }, (err, chat) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!chat) {
            return res
                .status(404)
                .json({ success: false, error: `沒有聊天記錄` })
        }
        return res.status(200).json({ success: true, data: chat })
    }).catch(err => console.log(err))
}

getchatByPerson = async (req, res) => {
  const sender = req.body.sender
    await Chat.find({ sender_phone: sender }, (err, chat) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!chat) {
            return res
                .status(404)
                .json({ success: false, error: `沒有聊天記錄` })
        }
        return res.status(200).json({ success: true, data: chat })
    }).catch(err => console.log(err))
}

//
// getchats = async (req, res) => {
//   const searchKey = req.body.searchKey
//   console.log(searchKey);
//     await Chat.find({$text: {$search: searchKey}}, (err, chats) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }
//         if (!chats.length) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `查無此人` })
//         }
//         return res.status(200).json({ success: true, data: chats })
//     }).catch(err => console.log(err))
// }

getallchats = async (req, res) => {
    await Chat.find({}, (err, chats) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!chats.length) {
            return res
                .status(404)
                .json({ success: false, error: `查無此人` })
        }
        return res.status(200).json({ success: true, data: chats })
    }).catch(err => console.log(err))
}


module.exports = {
    createchat,
    updatechat,
    deletechat,
    getchatByPhone,
    getallchats,
    getchatByPerson,
}
