import express from "express";
import {
  checkout,
  paymentVerification,
  getCart
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);
router.route("/getItem").get(getCart);
router.route("/addItem").post(getCart);



export default router;
