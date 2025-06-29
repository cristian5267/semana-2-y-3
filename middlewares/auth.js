import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.configDotenv();

export const authorize = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(403).json({
                error: "Forbidden",
            });
        }

        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };

        if (!decoded) {
            return res.status(403).json({
                error: "Forbidden",
            });
        }

        next();
    } catch (error) {
        return res.status(403).json({
            error: "Invalid Token",
        });
    }
};
