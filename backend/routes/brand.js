const express = require("express");
const { getBrand } = require("../handler/brand");
const router = express.Router();
const { addBrand } = require("../handler/brand");
const { updateBrand } = require("../handler/brand");
const { deleteBrand } = require("../handler/brand");
router.get("", async (req, res) => {
  //     console.log("req brand" , req)
  const getBrandList = await getBrand();
  if (getBrandList) {
    res.status(200).json({
      sucssess: true,
      data: getBrandList,
    });
  } else {
    res.status(500).json({
      sucssess: true,
      data: "data is not available",
    });
  }
});
router.post("/add", async (req, res) => {
  const brandData = req.body.name;
  console.log(" brandData ", brandData);
  const addedBrandResult = addBrand(brandData);
  if(addedBrandResult){
     res.status(200).json({
          sucssess: true,
          data: "data added succesfully"
     })
  }else{
     res.status(500).json({
          sucssess:false ,
          data: "data not added"
     })
  }
});
router.put("/update/:id", async (req, res) => {
  const updateData = req.body;
  const updateId = req.params.id
  console.log(" updateData ", updateData);
  console.log("updateId ", updateId);
   const resulUpdated = await updateBrand(updateData , updateId  );
   if(resulUpdated){
     res.status(200).json({
          sucssess: true ,
          data: " brand Updated Suceesfully"
     })

   }else{
       res.status(500).json({
          sucssess: false ,
          data: " brand  not Updated"
     })
   }

});

router.delete("/:id" , async(req , res)=>{
const idDelete = req.params.id
     const deletedList = deleteBrand(idDelete);
     if(deletedList){
          res.status(200).json({
               sucssess:true,
               data:"brand deleted successfully"
          })
     }else{
          res.status(500).json({
               sucssess:false,
               data:"brand not deleted "
          })
     }
})

module.exports = router;
