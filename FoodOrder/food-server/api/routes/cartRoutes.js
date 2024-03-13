const express=require('express');
const Carts=require('../models/Carts')
const router=express.Router();

const cartController=require('../controllers/cartControllers')

router.get('/' ,cartController.getCartByEmail);
router.post('/',cartController.addTocart);
router.delete('/:id',cartController.deletecart);
router.put('/:id',cartController.updateCart);
router.get('/:id',cartController.getSingleCart);


module.exports=router;
