import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import CookieManager from '@react-native-cookies/cookies';
import useCookies from '@react-native-cookies/cookies';
import CartCard from "../card/CartCard";
import { get_cart } from "../../api/cart";
import CartItem from "../../model/CartItem";
import { View } from "react-native";
import { Text } from "@react-native-material/core";
import tw from 'twrnc';

const Cart = () => {
    const [cookies] = useCookies();
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    useEffect(() => get_cart(cookies.access_token, (resp: CartItem[]) => setCartItems(resp)), [])

    return (
        <View>
            <Navbar bottomBar={true} fixed={false} />
            <View style={tw``}>
                <View style={tw`"font-inter text-[#4A4A4A]"`}>
                    <h1 className="font-inter font-bold text-2xl ml-20 mt-12 mb-12">MEU CARRINHO</h1>
                    {cartItems === null || cartItems === undefined || cartItems.length == 0 
                        ? 
                        <Text style={tw`text-lg font-inter font-medium ml-20`}>Você não tem nenhum item no seu carrinho</Text> 
                        : 
                        <View style={tw`overflow-y-auto`}>
                            {cartItems.map(cartItem => {
                                return (
                                    <CartCard item={cartItem.item} initial={cartItem.quantity}/>
                                );
                        })}
                    </View>}
                </View>
            </View>
        </View>
    )
}

export default Cart