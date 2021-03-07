const Client = require('../models/client-model');
createclient = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: '請填寫信息',
        })
    }

    const client = new Client(body)

    if (!client) {
        return res.status(400).json({ success: false, error: err })
    }

    client
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: client._id,
                message: '賬戶創建成功',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: '賬戶已經存在',
            })
        })
}



updateclient = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: '請填寫信息',
        })
    }

    Client.findByIdAndUpdate(req.params.id, {$set:req.body}, function(err, response){
                                 if(err){
                                                        console.log(err);
                                    }
                                    res.send('修改成功');
                            });
}



deleteclient = async (req, res) => {
    await Client.findOneAndDelete({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!client) {
            return res
                .status(404)
                .json({ success: false, error: `找不到資料` })
        }

        return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
}

getclientByPhone = async (req, res) => {
    await Client.findOne({ phone_number: req.query.phone_number }, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!client) {
            return res
                .status(404)
                .json({ success: false, error: `查無此人` })
        }
        return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
}


getclients = async (req, res) => {
  const searchKey = req.body.searchKey
    await Client.find({$text: {$search: searchKey}}, (err, clients) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!clients.length) {
            return res
                .status(404)
                .json({ success: false, error: `查無此人` })
        }
        return res.status(200).json({ success: true, data: clients })
    }).catch(err => console.log(err))
}

getallclients = async (req, res) => {
    await Client.find({}, (err, clients) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!clients.length) {
            return res
                .status(404)
                .json({ success: false, error: `查無此人` })
        }
        return res.status(200).json({ success: true, data: clients })
    }).catch(err => console.log(err))
}

getclientsbyGroup = async (req, res) => {
  await Client.find({ product_branch: req.query.group_name }, (err, client) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!client) {
          return res
              .status(404)
              .json({ success: false, error: `查無此人` })
      }
      return res.status(200).json({ success: true, data: client })
  }).catch(err => console.log(err))
}


loginAuth = async (req, res) => {
  const { phone_number,email } = req.body;
  if (phone_number){
  Client.findOne({ phone_number }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: '請再輸入一次'
      });
    } else if (!user) {
      res.status(401)
        .json({
        error: '電話錯誤'
      });
    } else {

      res.status(200)
        .json({
        "status":200,
        "phone_number":user.phone_number,
      });
    }
  });
  }
  else if(email){
    Client.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: '請再輸入一次'
        });
      } else if (!user) {
        res.status(401)
          .json({
          error: '郵箱不存在'
        });
      } else {
        res.status(200)
          .json({
          "status":200,
          "phone_number":user.phone_number,
        });
      }
    });
  }
  else{
    res.status(500)
      .json({
      error: '請再輸入一次'
  });
  }
  };

sendSMS = async (req, res) => {
  const { phone_number } = req.body;
  const token = Math.random().toFixed(6).slice(-6)
  const client = require('twilio')('AC61920a338bcd88ac2fcc0a274abf32b2', 'a17e3213ec7e6e2a307f73d9ea76874d');
  // Send the text message.
  client.messages.create({
    to: '+852'+phone_number,
    from: '+16514095802',
    body: '你的驗證碼是： '+token,
  }).then(() => {
      return res.status(200).json({ success: true, token: token })
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
}

sendEmailtoLogin = async (req, res) => {
  const nodemailer = require('nodemailer');
  const { email } = req.body;
  const token = Math.random().toFixed(6).slice(-6)
  const transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: 'klauswongkampang@yahoo.com',
    pass: 'rmplglgrhgesrvpu'
    }
  });

  const mailOptions = {
    from: 'klauswongkampang@yahoo.com',
    to: email,
    subject: 'AIC 登錄驗證碼',
    text: '你的登錄驗證碼是： ' + token
  };
  console.log(token);
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log(token);
      return res.status(200).json({ success: true, token: token })
    }
  });
}


module.exports = {
    createclient,
    sendSMS,
    updateclient,
    deleteclient,
    getclients,
    getclientByPhone,
    getclientsbyGroup,
    loginAuth,
    getallclients,
    sendEmailtoLogin
}
