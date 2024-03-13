const Menu = require("../models/Menu");

const getAllmenuitems=async(req,res) =>{
    try {
        const menus=await Menu.find({});
        res.status(200).json(menus)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

//post a new menu item from dashboard

const postMenuItem=async(req,res) =>{
    const newItem=req.body;
    try {
        const result=await Menu.create(newItem);
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }

};

//delete menu item
const deleteMenuItem=async(req,res) =>{
    const menuId=req.params.id;
    try {
        const deletedItem=await Menu.findByIdAndDelete(menuId);
        if(!deletedItem){
            return res.status(404).json({message:"menu not found"})
        }
        res.status(200).json({message:"Menu item deleted successfully"})
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
};

//det single menu item  using update one record

const singleMenuItem=async(req,res) => {
    const menuId = req.params.id;

    try {

        const menu =await Menu.findById(menuId);
        res.status(200).json(menu);
        
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }

};

//update single menu item
const updateMenuItem=async(req,res) =>{
    const menuId=req.params.id;
    const {name,recipe,image,category,price} =req.body;

    try {
        const updatemenu=await Menu.findByIdAndUpdate(menuId,{name,recipe,image,category,price},
            
     {new:true ,runValidator:true}
     );

     if(!updatemenu){
        return res.status(404).json({message:"menu not found"})

     };
     res.status(200).json(updatemenu)


        
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
}

module.exports={
    getAllmenuitems,
    postMenuItem,
    deleteMenuItem,
    singleMenuItem,
    updateMenuItem
}