const jwt = require("jsonwebtoken");
const JWT_SECRET = "mySecretKey"; // use env variable in production

// roles can be a single string ("admin") or an array (["admin", "user"])
module.exports = function (roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    try {
      console.log("req.header", req.header("Authorization"))
      const token = req.header("Authorization")?.split(" ")[1];
      console.log("token" , token)
      if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      console.log("decpded" , req.user )

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient rights" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token", error: err.message });
    }
  };
};
