const express = require('express')
const ClientCtrl = require('../controllers/client-ctrl')
const GroupCtrl = require('../controllers/group-ctrl')
const InviteCtrl = require('../controllers/invite-ctrl')
const router = express.Router()
const withAuth = require('./middleware');

//login auth
router.post('/authenticate', ClientCtrl.loginAuth)
//send email
router.post('/sendEmail', ClientCtrl.sendEmailtoLogin)
//create user
router.post('/client', ClientCtrl.createclient)
//get client by searchKey
router.post('/clients', ClientCtrl.getclients )
//create group
router.post('/group/create', GroupCtrl.createGroup )
//create invite
router.post('/invite/create', InviteCtrl.createInviteNews )
//update user info
router.post('/updateinfo/:id', ClientCtrl.updateclient)
//update group info
router.post('/group/update/:id', GroupCtrl.updategroup )
//update invite info
router.post('/invite/update/:id', InviteCtrl.updateInviteNews )
//send phone message
router.post('/sendSMS', ClientCtrl.sendSMS )

//remove user
router.delete('/client/:id', ClientCtrl.deleteclient)
//remove user
router.delete('/invite/:id', InviteCtrl.deleteinvite)

//get users in one group
router.get('/groupclients', ClientCtrl.getclientsbyGroup )
//get user by phone number
router.get('/client', ClientCtrl.getclientByPhone )
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
