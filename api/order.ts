import { authorized_headers, default_headers, proxied_host } from "./spec";
import { Response } from "../model/Response";
import Order from "../model/Order";

export function post_order(item: string, quantity: number, token: string, callback: (resp: Response) => void) {
    fetch(proxied_host + "order", { headers: authorized_headers(token), method: "POST", 
        body: JSON.stringify({
            item: item,
            quantity: quantity
        })}).then(resp => resp.json()).then(json => callback(json as Response))
}

export function get_orders(token: string, callback: (resp: Order[]) => void) {
    fetch(proxied_host + "orders", { headers: authorized_headers(token), method: "GET", 
    }).then(resp => resp.json()).then(json => callback(json as Order[]))
}