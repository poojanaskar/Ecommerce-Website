const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Load environment variables

// Import routes
const categoryRoute = require("./routes/category");
const brandRoute = require("./routes/brand");
const productRoute = require("./routes/productRoutes");
const RegisterRoute = require("./routes/register");
const newProductRoute = require("./routes/newProduct");
const categoryName = require("./routes/categoryName");
const login = require("./routes/login");
const wishListRoute = require("./routes/wishlist");
const featureRoute = require("./routes/featured");
const difrrentRoute = require("./routes/diffrent");
const cartRoute = require("./routes/cart");

const app = express();
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/ecom_store";

async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectDB();

// --- API Routes ---
app.use("/category", categoryRoute);
app.use("/newProduct", newProductRoute);
app.use("/feature", featureRoute);
app.use("/difrrent", difrrentRoute);
app.use("/users", RegisterRoute);
app.use("/wishlist", wishListRoute);
app.use("/cart", cartRoute);
app.use("/profile", login);
app.use("/brand", brandRoute);
app.use("/product", productRoute);
app.use("/categoryName", categoryName);

// Serve Angular build directly from dist/browser
const angularDistPath = path.join(__dirname, "dist", "browser");
app.use(express.static(angularDistPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(angularDistPath, "index.html"));
});


// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
