import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    console.log("Auth middleware triggered");
    const token = req.cookies?.token;
    console.log(token, "token in authMiddleware");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, "decoded in authMiddleware");
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { authMiddleware };
