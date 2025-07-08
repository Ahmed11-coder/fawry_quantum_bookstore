export interface Book {
    ISBN: string;
    title: string;
    publish_year: number;
    type: "Demo" | "E Book" | "Paper Book"
}

export interface E_Book extends Book {
    price: number;
    filetype: string;
}

export interface Paper_Book extends Book {
    price: number;
    stock: number;
}

export type BookTypes = E_Book | Paper_Book | Book ;

export interface ShippingServiceProps {
    product_title: string,
    address: string;
    email: string;
    quantity: number;
}
export interface MailServiceProps {
    product_title: string,
    email: string;
    quantity: number;
}