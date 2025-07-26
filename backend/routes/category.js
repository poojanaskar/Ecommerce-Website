const express= require("express")
const app = express()
 router =express.Router()
const category =  require("../db/categorie")
const {addCategory ,  updateCategorys,getCategory}= require("../handler/catogeryHandler")
//  app.get((req , res)=>{
// res.send("hello category")
//  })
router.get("" , async (req , res)=>{
let categoriesList = await getCategory()
console.log("categoriesList " , categoriesList )
// res.send("got list succesfully" )
   res.status(200).json({ success: true, data: categoriesList });
})


router.post("/add" , async (req , res)=>{
             
const   categoryValue = req.body
addCategory(categoryValue) 
  res.status(200).json({ success: true });
})


router.put("/:id", async (req, res) => {
  try {
const updateCategory = req.body;
const categoryId = req.params.id;
const updated = await updateCategorys(updateCategory ,categoryId)



res.send( updated);
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).send("Server Error");
  }
});

router.delete("/delete/:id" , async(req , res)=>{
console.log("inside deltee")
  const categoryId = req.params.id;
  const deleted =  await category.findByIdAndDelete(categoryId);
  if(deleted){
  res.status(200 ).json({success:true , data: " category deleted successfully "})
  }else{
    res.status(404 ).json({success:false , data: " category not found "})
  }

})

 


module.exports = router