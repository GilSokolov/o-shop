import { Product } from 'src/app/models/app-product';
import { ShopingCartItem } from './app-shoping-cart-item';

export class ShopingCart {
    items: ShopingCartItem[] = [];

// tslint:disable-next-line: variable-name
    constructor(private itemsMap: { [productId: string]: ShopingCartItem }) {
        Object.keys(itemsMap).forEach(id => {
            this.items.push(Object.assign(new ShopingCartItem(), {id}, this.itemsMap[id]));
        });
    }

    get totalItemsCount() {
        return this.items.reduce((count, item) => count += item.quantity, 0);
    }

    get totalPrice() {
        return this.items.reduce((sum, item) => sum += item.totalPrice, 0);
    }

    getQuantity(product: Product) {
        const item = this.itemsMap[product.id];
        return item ? item.quantity : 0;
    }

}
