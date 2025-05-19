import { Router } from "express";
import { Products } from "../entity/products.entity.js";

const router = Router();

router.get("/", async (req, res) => {
    const products = await Products.findAll();
    return res.json({
        data: products,
    });
});
router.get("/:id", async (req, res) => {
    const product = await Products.findOne({
        where: {
            id: +req.params.id,
        },
    });
    return res.json({
        data: product,
    });
});

router.post("/", async (req, res) => {
    const createProduct = req.body;

    const productCreated = await Products.create(createProduct);

    return res.json({
        data: productCreated,
    });
});

export default router;
