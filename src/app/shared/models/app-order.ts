import { ShopingCart } from './app-shoping-cart';
import { ShopingCartItem } from './app-shoping-cart-item';

export interface Shipping {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    name?: string;
}

export interface OrderProduct {
    title: string;
    imageUrl: string;
    price: number;
}

export interface OrderItem {
    product: OrderProduct;
    quantity: number;
    totalPrice: number;
}

export class Order {
    datePlaced: number;
    items: OrderItem[];
    total: number;

    constructor(
        public userId: string,
        public shipping: Shipping,
        shopingCart: ShopingCart) {
        this.datePlaced = new Date().getTime();
        this.items = shopingCart.items.map(this.mapOrderItems);
        this.total = shopingCart.totalPrice;
    }

    private mapOrderItems(item: ShopingCartItem): OrderItem {
        return {
          product: {
            title: item.title,
            imageUrl: item.imageUrl,
            price: item.price
          },
          quantity: item.quantity,
          totalPrice: item.totalPrice
        };
    }
}
