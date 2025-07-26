const express = require("express")
const router = express.Router()
const featuredProductFind= require("../handler/featured")
router.get("" , async(req , res)=>{
       console.log("hey")
       const newProduct = await featuredProductFind();
       if(newProduct){
              res.status(200).json({
                     success:true ,
                     data: newProduct
              })
       }else{
             res.status(500).json({
                     success:false ,
                     data: "no new product"
              })   
       }
})
module.exports = router;