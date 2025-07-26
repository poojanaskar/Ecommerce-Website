// const { model } = require("mongoose")
const  product = require("../db/product")



async function NewProductFind(){
 const productNewList = await product.find({
       isNewProduct: true
  })

   const finalList = productNewList.map((item) => item.toObject());

  return finalList;
}
async function addProduct(model){
  // console.log("modelm" ,model)
          let newProduct =await  new product ({
          ...model
              
          }) 
          await newProduct.save()   ;
          return newProduct;
          
}

async function  deleteProduct(id){
 const deletedProduct = await product.findByIdAndDelete(id)
 return deleteProduct;

}
async function updateProduct (id , data){
              const updateProduct =  await product.findByIdAndUpdate(
                 id ,
                data ,
                {new : true}
              )
              return updateProduct
}

async function getOneProduct(id){
  // console.log(id)
  const getOne = await product.findById(id).populate("categoryID", "name").populate("BrandID" , "name")
  // console.log("getone" , getOne)
  return getOne;
}
async function getOneProductName(){
  // console.log(id)
  const getOneName = await product
    .find()
    .populate("categoryID" , "name").populate("BrandID" ,"name");
  // console.log("getone" , getOne)
   return  getOneName.map(doc => doc.toObject());

}

async function getProduct(){
              const getList = await product.find()
              const Final = getList.map((doc)=>{
                     return      doc.toObject() 
              })
              return Final
}


module.exports = {getOneProductName ,NewProductFind,addProduct ,getProduct,updateProduct,deleteProduct,getOneProduct}