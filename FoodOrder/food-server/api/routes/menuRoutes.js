const express = require("express");
const Menu = require("../models/Menu");
const router=express.Router();

const menuControler=require('../controllers/menuControllers')

router.get('/' ,menuControler.getAllmenuitems)

//post a menu item
router.post('/',menuControler.postMenuItem)

//delete menu item
 router.delete('/:id',menuControler.deleteMenuItem)

 //get single menu item

 router.get('/:id',menuControler.singleMenuItem)

 //update single item
 router.patch('/:id' ,menuControler.updateMenuItem)

module.exports=router;
