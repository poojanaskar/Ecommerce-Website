// आवश्यक मॉड्यूल्स इम्पोर्ट करा
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Environment variables लोड करण्यासाठी, जर तुमच्या .env फाइलमध्ये काही असतील

// तुमच्या ॲप्लिकेशनचे routes इम्पोर्ट करा
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

// मिडलवेअर्स कॉन्फिगर करा
app.use(cors()); // CORS (Cross-Origin Resource Sharing) सक्षम करण्यासाठी
app.use(express.json()); // JSON फॉरमॅटमधील रिक्वेस्ट बॉडी पार्स करण्यासाठी

// **PORT व्हेरिएबल इथे घोषित करा, जेणेकरून ते आधीच उपलब्ध असेल.**
// Render वातावरणात 'process.env.PORT' वापरला जातो, लोकलमध्ये 3000
const PORT = process.env.PORT || 3000;

// **MongoDB Atlas कनेक्शन स्ट्रिंग (तुमच्या नवीन पासवर्डसह)**
// poojanaskar103 हा तुमचा यूजरनेम, 4SrjFbwFcc0j4gkR हा पासवर्ड आहे.
// ecom.lpvgnrr.mongodb.net हे तुमच्या क्लस्टरचे URL आहे.
// ecom_store हा तुमच्या डेटाबेसचे नाव आहे.
const MONGODB_URI = 'mongodb+srv://poojanaskar103:4SrjFbwFcc0j4gkR@ecom.lpvgnrr.mongodb.net/ecom_store?retryWrites=true&w=majority';

// Mongoose डेटाबेसशी कनेक्ट करा
mongoose.connect(MONGODB_URI, {
    // Mongoose च्या नवीनतम व्हर्जनमध्ये (6.0+), हे पर्याय आपोआप हँडल केले जातात
    // त्यामुळे त्यांची स्पष्टपणे गरज नाही, पण जुन्या व्हर्जनसाठी ठेवू शकता:
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
})
.then(() => {
    // MongoDB कनेक्शन यशस्वी झाल्यावर कन्सोलमध्ये मेसेज प्रिंट करा
    console.log("✅ MongoDB Connected Successfully to Atlas!");

    // **बॅकएंड सर्वर फक्त इथेच सुरू करा, MongoDB कनेक्शन यशस्वी झाल्यावर.**
    // हे सुनिश्चित करते की डेटाबेस तयार नसताना रिक्वेस्ट येणार नाहीत.
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    // कनेक्शन फेल झाल्यास एरर कन्सोलमध्ये प्रिंट करा आणि ॲप्लिकेशन बंद करा
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1); // ॲप्लिकेशन तात्काळ बंद करा
});


// --- API Routes ---
// तुमच्या प्रत्येक रूटसाठी योग्य URL पाथ सेट करा
app.use("/category", categoryRoute);
app.use("/newProduct", newProductRoute);
app.use("/feature", featureRoute);
app.use("/difrrent", difrrentRoute);
app.use("/users", RegisterRoute);
app.use("/wishlist", wishListRoute);
app.use("/cart", cartRoute);
app.use("/profile", login); // 'login' route ला '/profile' वर मॅप केले आहे
app.use("/brand", brandRoute);
app.use("/product", productRoute);
app.use("/categoryName", categoryName);


const angularDistPath = path.join(__dirname, "dist", "browser");
app.use(express.static(angularDistPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(angularDistPath, "index.html"));
});

