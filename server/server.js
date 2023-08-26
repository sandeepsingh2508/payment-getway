import { app } from "./app.js";
import Razorpay from "razorpay";
import { connectDB } from "./config/database.js";

connectDB();
console.log("=================",process.env.RAZORPAY_API_KEY);

export const instance = new Razorpay({
  key_id: 'rzp_test_7fDUbeBwTi7gWK',
  key_secret: 'XbtSx3KY4MX6jnljW6hFaKoA',
  // key_secret: process.env.RAZORPAY_APT_SECRET,

});

app.listen(4000, () =>
  console.log(`Server is working on ${4000}`)
);
