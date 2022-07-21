import CartItem from "../model/CartItem";
import { Response } from "../model/Response";
import { authorized_headers, proxied_host } from "./spec";

export function post_cart(item: string, quantity: number, token: string, callback: (resp: Response) => void) {
    fetch(proxied_host + "cart", {
        method: 'POST', headers: authorized_headers(token), body: JSON.stringify({
            item: item,
            quantity: quantity
        })
    }).then(resp => resp.json()).then(json => callback(json as Response))
}

export function get_cart(token: string, callback: (resp: CartItem[]) => void) {
    fetch(proxied_host + "cart", {
        method: 'GET', headers: authorized_headers(token)
    }).then(resp => resp.json()).then(json => callback(json as CartItem[]))
}

export function delete_cart(item: string, token: string, callback: (resp: Response) => void) {
    fetch(proxied_host + "cart/" + item, {
        method: 'DELETE', headers: authorized_headers(token)
    }).then(resp => resp.json()).then(json => callback(json as Response))
}