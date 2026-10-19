import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Signup",
            required: true
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Cart = mongoose.model("Cart", cartSchema);