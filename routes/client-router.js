const express = require('express')
const ClientCtrl = require('../controllers/client-ctrl')
const GroupCtrl = require('../controllers/group-ctrl')
const InviteCtrl = require('../controllers/invite-ctrl')
const ChatCtrl = require('../controllers/chat-ctrl')
const router = express.Router()
const withAuth = require('./middleware');
const Client = require('../models/client-model')
//login auth
router.post('/authenticate', ClientCtrl.loginAuth)
//send email
router.post('/sendEmail', ClientCtrl.sendEmailtoLogin)
//create user
router.post('/client', ClientCtrl.createclient)

const multer = require('multer')
const uuidv4 = require('uuid').v4;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../clients/public/UserIcon');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// User model

router.post('/uploadIcon:id', upload.single('profileImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user = {
        icon: './UserIcon/' + req.file.filename
    }
    Client.findByIdAndUpdate(req.params.id, {$set:user}, function(err, response){
                                 if(err){
                                                        console.log(err);
                                    }
                                    res.send('修改成功');
                            });
})
//update user info
router.post('/updateinfo/:id', ClientCtrl.updateclient)
//get client by searchKey
router.post('/clients', ClientCtrl.getclients )
//create chat
router.post('/chat/create', ChatCtrl.createchat)
//create chat
router.post('/chat/update', ChatCtrl.updatechat)
//get chat by phone number
router.post('/chat', ChatCtrl.getchatByPhone )
//get chat by phone number
router.post('/chatroom', ChatCtrl.getchatByPerson )
//create group
router.post('/group/create', GroupCtrl.createGroup )
//create invite
router.post('/invite/create', InviteCtrl.createInviteNews )
//update invite
router.post('/inviteupdate/create', InviteCtrl.getInviteNewsByInvite)
//update invite
router.post('/findinviteupdate', InviteCtrl.findAndUpdateInviteNews)

//update group info
router.post('/group/update/:id', GroupCtrl.updategroup )
//update invite info
router.post('/invite/update/:id', InviteCtrl.updateInviteNews )
//send phone message
router.post('/sendSMS', ClientCtrl.sendSMS )

//remove user
router.delete('/client/:id', ClientCtrl.deleteclient)
//remove invite
router.delete('/invite/:id', InviteCtrl.deleteinvite)
//remove chat
router.delete('/chat/:id', ChatCtrl.deletechat)

//get users in one group
router.get('/groupclients', ClientCtrl.getclientsbyGroup )
//get user by phone number
router.get('/client', ClientCtrl.getclientByPhone )
//get chats
router.get('/chats', ChatCtrl.getallchats )
//get all users
router.get('/getclients', ClientCtrl.getallclients )
//get invite info by month
router.get('/getinvite', InviteCtrl.getInviteNewsByMonth )
//get invite info by invite person
router.get('/getinvite/invite', InviteCtrl.getInviteNewsByInvite )
//get invite info by invited person
router.get('/getinvite/invited', InviteCtrl.getInviteNewsByInvited )
//get group info by group name
router.get('/getgroup', GroupCtrl.getgroupByName )
//get all INVITE
router.get('/getinvites', InviteCtrl.getInviteNews )
//get all invite this month
router.get('/getmonthinvites', InviteCtrl.getInviteNewsThisMonth )
//get all groups
router.get('/getgroups', GroupCtrl.getGroups )

module.exports = router
