const express = require("express");
const router=express.Router();
const useController=require('../controllers/userControllers');
const verifyToken=require('../middleware/verifyToken')


router.get('/',useController.getAllUser);
router.post('/',useController.createUser);
router.delete('/:id',useController.deleteUser);
router.get('/admin/:email',  useController.getAdmin);
router.patch('/admin/:id', useController.makeAdmin);



module.exports=router;