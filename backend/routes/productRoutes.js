const express = require ('express')
const {addProduct ,getProduct,updateProduct,deleteProduct, getOneProduct}  = require('../handler/productHandler')
 router =express.Router()

router.post("/add" , async(req  , res)=>{
       // console.log("req.body" , req.body)
const getData = req.body

const addProductList = await addProduct(getData )
if(addProductList){

              res.status(200).json({
                            success : true ,
                            data : addProductList
              })
}else{
       res.status(500).json({
                            success : false ,
                            data : " product not added"
              })         
}

})

router.get("/:id" , async(req , res)=>{
       const idProduct = req.params.id
const getresult = await getOneProduct(idProduct )
// console.log("getresult" , getresult);
if(getresult){
       res.status(200).json({
              success: true
,
data:  getresult     })
}else{
    res.status(500).json({
       success:false,
       data: getresult
    })   
}
})

router.get("" , async (req , res)=>{
       const GetProductList =await getProduct();
 if(GetProductList){
       res.status(200).json({
              success : true ,
              data : GetProductList
       })
 }else{
         
       
         res.status(200).json({
              success : false ,
              data : "no data found"
       })
       }




})



router.patch("/update/:id" , async (req , res)=>{
  const     idUpadteProduct =  req.params.id;
  const updateData = req.body ;
//   console.log("idUpadteProduct " , idUpadteProduct )
//   console.log("updateData " , updateData )

const updateResult = await updateProduct(idUpadteProduct ,updateData )
if(updateResult){
       // console.log("updateResult" , updateResult)
       res.status(200).json({
              success: true ,
              data: "product updated succesfully"
       })
}else{
      res.status(200).json({
              success: false ,
              data: "product not updated "
       })   
}

})

router.delete("/:id" , async(req , res)=>{
const ifDelete = req.params.id

       // console.log(ifDelete)

 const DeletedList = await  deleteProduct(ifDelete)
 if(DeletedList){
  res.status(200).json({
              success: true ,
              data: "product deleted succesfully"})
 }else{

 res.status(200).json({
              success: false ,
              data: "product not deleted "
       }) 

 }
})

module.exports =router
