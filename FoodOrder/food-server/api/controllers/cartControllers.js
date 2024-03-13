const Carts = require("../models/Carts");

const getCartByEmail=async(req,res)=>{
    try {
        const email=req.query.email;
        const query={email:email};
        const result=await Carts.find(query).exec();
        res.status(200).json(result)

        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}


//post cart when add to cart click button
const addTocart=async(req,res) =>{
    const {menuItemId,name,recips,image,price,quantity,email}=req.body;
    try {
        //exiting menu item
        const exisitingCartItem=await Carts.findOne({menuItemId});
        if(exisitingCartItem){
            return res.status(400).json({message:"product alreday exists in the cart"})
        }
        const cartItem=await Carts.create({
            menuItemId,name,recips,image,price,quantity,email
        });
        res.status(201).json(cartItem)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

//delete cart item
const deletecart=async(req,res)=>{
    const cartId=req.params.id;
    try {
        const deletedCart=await Carts.findByIdAndDelete(cartId);
        if(!deletedCart) {
            return res.status(401).json({message:"Cart Item not found"})
        }
        res.status(200).json({message:"Cart item deleted successfully"})
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}
//update cart item
const updateCart = async (req, res) => {
    const cartId = req.params.id;
    const {menuItemId, name, recipe, image, price, quantity,email } = req.body;

    try {
        const updatedCart = await Carts.findByIdAndUpdate(
            cartId, {menuItemId, name, recipe, image, price, quantity,email }, {
                new: true, runValidators: true
            }
        )
        if(!updatedCart){
            return res.status(404).json({ message: "Cart Item not found"})
        }
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//get single resipe
const getSingleCart=async(req,res) => {
    const cartId=req.params.id;

    try {
const cartItem=await Carts.findById(cartId)
res.status(200).json(cartItem)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }

};

module.exports={
    getCartByEmail,
    addTocart,
    deletecart,
    updateCart,
    getSingleCart

}