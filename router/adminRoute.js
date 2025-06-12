const express = require('express');
const router = express.Router();
const {Adminlogin,block,showuser}=require('../Controller.js/admin')


router.post('/Adminlogin',Adminlogin)
router.get('/showallusers',showuser)
router.post('/block',block)

module.exports=router