const express = require('express');
const router = express.Router();
const {userADD,userLogin,edit,Oedit,search}=require('../Controller.js/user')

router.post('/UserLogin',userLogin)
router.post('/signin',userADD)
router.get('/edit/:id',edit)
router.put('/edit/:id',Oedit)
router.get("/search",search)
module.exports=router