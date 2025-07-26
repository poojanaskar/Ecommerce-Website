const express = require("express");
const bcrypt = require("bcryptjs");
const register = require("../db/register"); // your Mongo model (loginUser)
const router = express.Router();
const jwt = require("jsonwebtoken")
// Function to handle registration
async function registerHandler(data) {
  try {
    const { name, email, password, role } = data;

    // Check if the user already exists
    const existingUser = await register.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      return { success: false, message: "name or Email already exists" };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new register({
      name,
      email,
      password: hashedPassword,
      role: role || "user"
    });

    await newUser.save();

    return { success: true, message: "User registered successfully" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Server error" };
  }
}
async function loginHandler(data) {
  const JWT_SECRET = "mySecretKey";
  const { email, password } = data;

  try {
    // Check if user exists
    const user = await register.findOne({ email });
    if (!user) {
                 console.log("!user" ,!user)
      return { success: false, status: 400, message: "User not found" };
    
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
              console.log("!isMatch" ,!isMatch)
      return { success: false, status: 400, message: "Invalid credentials" };
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email , role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { success: true, status: 200, message: "Login successful", token };
  } catch (error) {
                console.error("Login Error:", error);
    return { success: false, status: 500, message: "Server error", error };
  }
}

module.exports ={ registerHandler, loginHandler} ;
