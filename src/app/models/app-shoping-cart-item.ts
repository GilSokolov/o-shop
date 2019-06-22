export class ShopingCartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;

    get totalPrice() {
        return this.price * this.quantity;
    }
}
