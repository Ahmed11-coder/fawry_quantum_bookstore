import {ShippingServiceProps, MailServiceProps} from "../types/types";

export const ShippingService = ({product_title, address, email, quantity}: ShippingServiceProps) => {
    console.log("Your Book Will Comming Soon : ");
    console.log(`${quantity}x"${product_title}"`);
    console.log(`Address : ${address}`)
    console.log(`We Will Alert You When It Arrives By A Massage In Your Email : ${email}`)
}

export const MailService = ({product_title, email, quantity}: MailServiceProps) => {
    console.log("The Payment Process is Done : ");
    console.log(`You Will Receive ${quantity}x"${product_title}" Access Code`)
    console.log(`Your Email : ${email}`)
}