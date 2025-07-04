import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Products = sequelize.define("products", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "name",
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "color",
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Products.sync();
