import { Button, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Card = ({ amount,gst,total, img, checkoutHandler }) => {
    console.log(gst,total);
    return (
        <VStack>
            <Image src={img} boxSize={"64"} objectFit="cover" />
            <Text>₹{amount}</Text>
            <Text>Discount: 0</Text>
            <Text>GST: {gst}</Text>
            <Text>Payable amount : {total}</Text>
            <Button onClick={() => checkoutHandler(total)}>Buy Now</Button>
        </VStack>
    )
}

export default Card