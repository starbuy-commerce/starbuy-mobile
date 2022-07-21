import User from "../model/User";
import { default_headers, proxied_host } from "./spec";

export interface Login { username: string, password: string}
export interface AuthResponse { status: boolean, message: string, user: User, jwt: string } 
export function login(info: Login, callback: (resp: AuthResponse) => void) {
    fetch(proxied_host + "login", {
        method: 'POST', headers: default_headers, body: JSON.stringify(info)
    }).then(resp => resp.json()).then(json => callback(json as AuthResponse))
}

export interface IncomingUser { name: string, email: string, city: string, birthdate: string, seller: boolean, profile_picture: string, password: string, username:string}
export function register_user(incoming: IncomingUser, callback: (resp: AuthResponse) => void) {
    fetch(proxied_host + "register", {
        method: 'POST', headers: default_headers, body: JSON.stringify(incoming)
    }).then(resp => resp.json()).then(json => callback(json as AuthResponse))
}