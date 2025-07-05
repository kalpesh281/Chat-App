import jwt from "jsonwebtoken";

export const adminMiddleware = (req, res, next) => {
  try {
    // console.log("Admin middleware triggered");
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded, "decoded in adminMiddleware");

    if (!decoded) {
      return res.status(401).json({
        success: false, 
        message: "Unauthorized - Invalid token",
      });
    }


    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
      });
    }

    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    };
    req.id = decoded.userId;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error in admin verification",
    });
  }
};
