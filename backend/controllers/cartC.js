import { Cart } from "../models/cartToCartM.js";
import { Signup } from "../models/signup.js";
import { Product } from "../models/productM.js";

export const AddToCart = async (req, res) => {
    const user = req.user._id;
    const { id } = req.params;

    const findUser = await Signup.findById(user);

    if (!findUser) {
        res.status(404);
        throw new Error("User not found");
    }

    const findPro = await Product.findById(id);

    if (!findPro) {
        res.status(404);
        throw new Error("Product not found");
    }

    const userCart = await Cart.findOne({
        userId: user
    });

    if (!userCart) {
        await Cart.create({
            userId: user,
            items: [
                {
                    productId: id
                }
            ]
        });

        return res.status(201).json({
            success: true,
            message: "Product added to cart"
        });
    }

    const existPro = userCart.items.find(item => item.productId.toString() === id);

    if (existPro) {
        return res.status(400).json({
            success: false,
            message: "Product already exists in cart"
        });
    }

    userCart.items.push({
        productId: id
    });
    await userCart.save();

    return res.status(200).json({
        success: true,
        message: "Product added to cart"
    });
};

export const getCart = async(req ,res)=>{
    const user = req.user._id;
    const product = await Cart.findOne({userId : user})
    .populate('userId')
    .populate('items.productId')
    if(!product){
        res.status(400)
        throw new Error('Product not found')
    }
    res.send(product)
}