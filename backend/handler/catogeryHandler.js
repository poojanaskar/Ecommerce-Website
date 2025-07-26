const category = require("../db/categorie")

async function  addCategory (categoryValue) {
             
 const  newcategory = new category({
                  name : categoryValue.name          
              })
                await newcategory.save();
}

async function getCategory(params) {
  let  categoriesList =await category.find();
  // console.log("categoriesList " , categoriesList )
  const result =categoriesList.map((doc)=>doc.toObject())
  return result;
}

async function updateCategorys(updateCategory ,categoryId){
const updated = await category.findOneAndUpdate(
      { _id: categoryId },
      updateCategory,
      { new: true }
    );

    if (!updated) {
//       return res.status(404).send("Category not found");
    }
    return updated; 
}
module.exports = {addCategory , updateCategorys ,getCategory}