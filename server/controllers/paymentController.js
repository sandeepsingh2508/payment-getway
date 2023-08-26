import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import { Cart } from "../models/cartModel.js";

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};


//add item
exports.createCart = catchAsyncError(async (req, res, next) => {
  const {
   itemName,
   price,
   gst
  } = req.body;
  const event = await Cart.create({
      itemName,
      price,
      gst
  });
  res.status(201).json({
      event
  });
});

//get item
export const getCart = async (req, res) => {
  const cart = await Cart.find();
  let total = 0;
  for (const item of cart) {
    total = total + item.price;
  }
  const gst = (total * 18) / 100;
  total = total + gst;
  res.status(200).json({ cart, total, gst });
};


export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
