const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryRoute = require("./routes/category")
const  brandRoute = require("./routes/brand")
const  productRoute = require("./routes/productRoutes");
const RegisterRoute = require("./routes/register")
const app = express();
const newProductRoute = require("./routes/newProduct")
const categoryName = require('./routes/categoryName')
const auth = require("./middleWear/auth")
const login = require("./routes/login");
const wishList = require("./db/whishList");
featureRoute = require("./routes/featured")
difrrentRoute = require("./routes/diffrent")
wishListRoute = require("./routes/wishlist")
cartRoute = require("./routes/cart")
app.use(cors());
async function connectionDb(){
              mongoose.connect("mongodb://localhost:27017/ecom_store");
              console.log("mongodb connected")
}

connectionDb().catch(err =>{
              console.log(err)
})
app.use(express.json())
app.use("/category",categoryRoute )
app.use("/newProduct" , newProductRoute)
app.use("/feature" , featureRoute )
app.use("/diffrent" , difrrentRoute )
app.use("/users" , RegisterRoute  )
app.use("/wishlist" , wishListRoute  )
app.use("/cart" , cartRoute  )

app.use("/profile" , login  )

app.use("/brand" ,  brandRoute)
app.use("/product" ,productRoute)
app.use("/categoryName" , categoryName)
app.get("/", (req , res)=>{
           res.send("Hello Node.js");      
})
app.listen(3000 ,()=>{
              console.log("helllo nodejs");
});