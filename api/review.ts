import { Response } from "../model/Response";
import Review from "../model/Review";
import { authorized_headers, default_headers, proxied_host } from "./spec";

export interface ReviewsWithAverage {reviews: Review[], average: number}

export function get_review(product: string, user: string, callback: (resp: Review) => void) {
    fetch(proxied_host + "review?user" + user + "&product=" + product, 
    { method: 'POST', headers: default_headers }
    ).then(resp => resp.json()).then(json => callback(json as Review))
}

export function get_product_reviews(product: string, callback: (resp: ReviewsWithAverage) => void) {
    fetch(proxied_host + "item/" + product + "/reviews", 
    { method: 'GET', headers: default_headers }
    ).then(resp => resp.json()).then(json => callback(json as ReviewsWithAverage))
}

export function get_user_reviews(token: string, callback: (resp: ReviewsWithAverage) => void) {
    fetch(proxied_host + "user/reviews", 
    { method: 'GET', headers: authorized_headers(token) }
    ).then(resp => resp.json()).then(json => callback(json as ReviewsWithAverage))
}

export function get_user_received_reviews(user: string, callback: (resp: ReviewsWithAverage) => void) {
    fetch(proxied_host + "user/reviews/received/" + user, 
    { method: 'GET', headers: default_headers }
    ).then(resp => resp.json()).then(json => callback(json as ReviewsWithAverage))
}

interface IncomingReview { rate: number, item: string, message: string }
export function post_review(review: IncomingReview, token: string, callback: (resp: Response) => void) {
    fetch(proxied_host + "review", 
    { method: 'POST', headers: authorized_headers(token), body: JSON.stringify(review) }
    ).then(resp => resp.json()).then(json => callback(json as Response))
}

export function delete_review(item: string, token: string, callback: (resp: Response) => void) {
    fetch(proxied_host + "review/" + item, {
        method: 'DELETE', headers: authorized_headers(token)
    }).then(resp => resp.json()).then(json => callback(json as Response))
}