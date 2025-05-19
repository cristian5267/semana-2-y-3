import { User } from "../entity/users.entity.js";

export const checkUserInDB = async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({ where: { id: +id } });

    if (!user) {
        return res.status(404).json({
            error: "User doesn't exists",
        });
    }

    next();
};
