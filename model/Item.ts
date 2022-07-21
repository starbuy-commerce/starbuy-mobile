import User from "./User";

export default class Item {
    identifier!: string;
    title!: string;
    seller!: User;
    price!: number;
    stock!: number;
    category!: number;
    description!: string;
}