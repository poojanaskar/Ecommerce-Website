const brand = require("../db/brand");

async function getBrand() {
  const brandList = await brand.find();

  const result = brandList.map((doc) => doc.toObject());

  return result;
}

async function addBrand(data) {
  console.log("data",data)
  const newBrand = await new brand({
    "name" : data
  })
  await newBrand.save();
}

 async function updateBrand(data , id){
  console.log("data",data)
  console.log("dataid",id)
  const result = await brand.findOneAndUpdate(
  {_id : id},
  data,
  {new : true}
)

  return result

 }
async function deleteBrand(id){
  return   resultDelte = await brand.findByIdAndDelete(id)
}
module.exports ={getBrand ,addBrand ,updateBrand,deleteBrand} ;
