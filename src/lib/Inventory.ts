import { BookTypes, E_Book, Paper_Book } from "../types/types";
import { ShippingService, MailService } from "./helperFuncs";

export class Inventory {
    products: BookTypes[] = [];

    add(ISBN: string, title: string, publish_year: number): void;
    add(ISBN: string, title: string, publish_year: number, price: number, filetype: string): void;
    add(ISBN: string, title: string, publish_year: number, price: number, stock: number): void;
    add(ISBN: string, title: string, publish_year: number, price?: number, additionalProp?: string|number): void {
        if ((price && price <= 0) || (typeof additionalProp === 'number' && additionalProp <= 0)) {
            throw new Error("Invalid Argument");
        }

        let newProduct: BookTypes = {
            ISBN: ISBN,
            title: title,
            publish_year: publish_year,
            ...(price) && {price: price},
            ...(typeof additionalProp === 'number' )&& {stock: additionalProp},
            ...(typeof additionalProp === 'string' )&& {filetype: additionalProp},
            type: (additionalProp ? (typeof additionalProp === 'number' ? "Paper Book" : "E Book") : "Demo"),
        };

        this.products.push(newProduct);
    }
    
    buy(ISBN: string, quantity: number, email: string): void;
    buy(ISBN: string, quantity: number, email: string, address: string): void;
    buy(ISBN: string, quantity: number, email: string, address?: string): void {
        const book = this.products.find((product: BookTypes) => (product.ISBN == ISBN && product.type === (address ? 'Paper Book' : "E Book"))) as (Paper_Book | E_Book | undefined);

        if (book) {
            if (address) {
                // Check If Thier Is Enoungh Copies
                if ((book as Paper_Book).stock < quantity) {
                    throw new Error("There Are Not Enough Books");
                }
                
                ( book as Paper_Book ).stock -= quantity;
                ShippingService({product_title: book.title, address: address, email: email, quantity: quantity});

                // Remove The Books That Is Out Of Stock
                this.products = this.products.filter((product: BookTypes) =>  {
                    if (product.type === 'Paper Book' && (product as Paper_Book).stock <= 0) return false;
                    else return true;
                });
            } else MailService({product_title: book.title, email: email, quantity: quantity});

            console.log(`Paid : ${quantity * book.price}$`);
            console.log("------------------------------\n");
        } else throw new Error("Not Found: This Book Is Out Stock :(");
    }

    remove(nums_of_years: number = 3): BookTypes[] {
        console.log("Products Removed : ");
        const removed = this.products.filter((product: BookTypes) => (new Date().getFullYear() - product.publish_year) >= nums_of_years);
        console.log(removed);
        console.log('\n');

        this.products = this.products.filter((product: BookTypes) => (new Date().getFullYear() - product.publish_year) < nums_of_years);

        return removed;
    }

    showBooks() {
        console.log("Avaliable Books : ");
        this.products.forEach((product: BookTypes) => {
            console.log(product);
            console.log('------------------------');
        });
    }
}