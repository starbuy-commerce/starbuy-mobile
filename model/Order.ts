import ItemWithAssets from "./ItemWithAssets"
import User from "./User"

export default class Order {
    identifier!: string
    customer!: User
    seller!: User
    item!: ItemWithAssets
    price!: number
    quantity!: number
}