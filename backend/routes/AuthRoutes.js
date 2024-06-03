const express=require('express');
const router=express();
const {Login, SignUp, getUser}= require('../controller/Auth');
router.post('/signup',SignUp)
router.post('/login',Login)
router.get('/:email', getUser)
module.exports = router;