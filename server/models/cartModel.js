import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({
 itemName:{
    type :String
 },
 price:{
    type :Number
 },
 gst:{
    type:Number
 }
});
export const Cart = mongoose.model("cart", CartSchema);
