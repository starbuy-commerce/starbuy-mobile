import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import CartCard from "../card/CartCard";
import { get_cart } from "../../api/cart";
import CartItem from "../../model/CartItem";
import { View,Text } from "react-native";
import tw from 'twrnc';
import { Title } from "react-native-paper";

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])


    return (
        <View>
            <Navbar bottomBar={true} fixed={false} />
            <View style={tw``}>
                <View style={tw`font-inter text-[#4A4A4A]`}>
                    <Title style={tw`font-inter font-bold text-2xl ml-20 mt-12 mb-12`}>MEU CARRINHO</Title>
                    {cartItems === null || cartItems === undefined || cartItems.length == 0 
                        ? 
                        <Text style={tw`text-lg font-inter font-medium ml-20`}>Você não tem nenhum item no seu carrinho</Text> 
                        : 
                        <View style={tw`overflow-y-auto`}>
                            {cartItems.map(cartItem => {
                                return (
                                    <CartCard item={cartItem.item} initial={cartItem.quantity} navigation={undefined}/>
                                );
                        })}
                    </View>}
                </View>
            </View>
        </View>
    )
}

export default Cart;