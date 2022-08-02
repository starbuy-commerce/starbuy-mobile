import { Button } from "react-native-paper";
import React, { createRef, RefObject, useRef, useState } from "react";
//import { useCookies } from "@react-native-cookies/cookies";
import { delete_cart } from "../../api/cart";
import Item from "../../model/Item";
import ItemWithAssets from "../../model/ItemWithAssets";
import { Response } from "../../model/Response";

import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import Svg, { Path }from "react-native-svg";

interface Props {
    item: ItemWithAssets,
    initial: number
    navigation:any
}

export default function CartCard({ item, initial, navigation }: Props) {


    const menos = require('../../images/menos.png')
    const mais = require('../../images/mais.png')

    
    const [quantity, setQuantity] = useState(initial)

    function less() {
        if (quantity - 1 <= 0) {
            return;
        }
        setQuantity(quantity - 1);
    }

    function increase() {
        setQuantity(quantity + 1);
    }

    function removeFromCart() {
        delete_cart(item.item.identifier, "", (resp: Response) => {})
    }

    return (
        <View style={tw`w-10/12 mx-auto mb-4 h-2/5 border-[1px] border-yellow-400 rounded-lg`}>
            <View style={tw`flex mb-6 mt-6`}>
                <TouchableOpacity onPress={() => navigation.navigate( "/item/" + item.item.identifier)}>
                <Image style={tw`h-20 w-20 my-auto ml-8 hover:cursor-pointer`} source={require(item.assets[0])} />
                </TouchableOpacity>
                <View style={tw`text-md font-medium ml-10 text-md`}>
                    <View style={tw`flex`}>
                        <Text style={tw`font-bold mr-8 mt-2 w-full max-w-full`}>{item.item.title}</Text>
                    </View>
                    <Text style={tw`mt-4`}>Preço total: R$ {item.item.price * quantity}</Text>
                    <Text>Quantidade: {quantity} unidade(s)</Text>
                </View>
                <View style={tw`flex flex-col justify-between ml-auto mr-8`}>
                    <View style={tw`mx-auto`}>
                        <View style={tw`flex`}>
                            <TouchableOpacity onPress={less}>
                            <View style={tw`hover:cursor-pointer hover:bg-slate-200 flex justify-center w-8 h-8 border-t-[1px] border-l-[1px] border-b-[1px] border-gray-700 rounded-tl-md rounded-bl-md`}>
                                <View style={tw`my-auto`}>
                                    <Image source={menos} style={tw`width="12" height="12"`}></Image>
                                </View>
                            </View>
                            </TouchableOpacity>
                            <View style={tw`"flex justify-center w-8 h-8 border-[1px] border-gray-700"`}>
                                <p style={tw`my-auto`}>{quantity}</p>
                            </View>
                            <TouchableOpacity onPress={increase}>
                            <View  style={tw`hover:cursor-pointer hover:bg-slate-200 flex justify-center w-8 h-8 border-t-[1px] border-r-[1px] border-b-[1px] border-gray-700 rounded-tr-md rounded-br-md`}>
                                <View style={tw`"my-auto"`}>
                                    <Image source={mais} style={tw`width="12" height="12"`}></Image>
                                </View>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={tw`"flex gap-4"`}>
                        <Button onPress={() => navigation.navigate( "/checkout?item=" + item.item.identifier + "&quantity=" + quantity)} mode="contained" color="success" style={tw`h-8`} >
                            FINALIZAR
                        </Button>
                        <Button onPress={() => { removeFromCart(); navigation.navigate("/cart")}} mode="contained" color="error" style={tw`h-8`} >
                            REMOVER
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    );
}