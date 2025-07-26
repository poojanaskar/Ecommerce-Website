const express = require ('express')
const {getOneProductName}  = require('../handler/productHandler')
 router =express.Router()


router.get("/name" , async(req , res)=>{
     
const getresultNAme = await getOneProductName( )
// console.log("getresult" , getresult);
if(getresultNAme ){
       res.status(200).json({
              success: true
,
data:  getresultNAme      })
}else{
    res.status(500).json({
       success:false,
       data: "no data found with this category"
    })   
}
})

module.exports = router