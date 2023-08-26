import React, { useEffect, useState } from "react";
import { Box, Stack } from "@chakra-ui/react";
import Card from "./Card";
import axios from "axios";

const Home = () => {
  const [item, setItem] = useState();
  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://www.localhost:4000/api/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:4000/api/checkout", {
      amount,
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Payment",
      description: "Payment Through RazorPay",
      order_id: order.id,
      callback_url: "http://localhost:4000/api/paymentverification",
      prefill: {
        name: "Sandeep Singh",
        email: "prasan.250899@gmail.com",
        contact: "9875705555",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };
  const getData = async () => {
    const data = await axios.get("http://www.localhost:4000/api/getItem");
    setItem(data.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Box>
      <Stack
        h={"100vh"}
        alignItems="center"
        justifyContent="center"
        direction={["column", "row"]}
      >
        <Card
          amount={item?.cart[0]?.price}
          gst={item?.gst}
          total={item?.total}
          img={
            "https://th.bing.com/th?id=OIP.DiNIG4Bfpm65_wwXf_JwMAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
          }
          checkoutHandler={checkoutHandler}
        />
      </Stack>
    </Box>
  );
};

export default Home;
