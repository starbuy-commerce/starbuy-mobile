import ItemWithAssets from "./ItemWithAssets";
import User from "./User"

export default class Review {
    user!: User;
    item: ItemWithAssets;
    message!: string;
    rate!: number; 

    constructor(user: User, item: ItemWithAssets, message: string, rate: number) {
        this.user = user
        this.item = item
        this.message = message
        this.rate = rate
    }
}