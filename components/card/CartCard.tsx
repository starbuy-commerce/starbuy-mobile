import { Button } from "@mui/material";
import { setUncaughtExceptionCaptureCallback } from "process";
import React, { createRef, RefObject, useRef, useState } from "react";
import { useCookies } from "@react-native-cookies/cookies";
import { delete_cart } from "../../api/cart";
import Item from "../../model/Item";
import ItemWithAssets from "../../model/ItemWithAssets";
import { Response } from "../../model/Response";
import QuantityController from "../QuantityController"

import { View, Text, Image } from "react-native";
import tw from 'twrnc';

interface Props {
    item: ItemWithAssets,
    initial: number
}

export default function CartCard({ item, initial }: Props) {

    const [quantity, setQuantity] = useState(initial)
    const [cookies] = useCookies();

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
        delete_cart(item.item.identifier, cookies.access_token, (resp: Response) => {})
    }

    return (
        <View style={tw`w-10/12 mx-auto mb-4 h-2/5 border-[1px] border-yellow-400 rounded-lg`}>
            <View style={tw`flex mb-6 mt-6`}>
                <Image onClick={() => window.location.href = "/item/" + item.item.identifier} style={tw`h-20 w-20 my-auto ml-8 hover:cursor-pointer`} source={require(item.assets[0])} alt="" />
                <View style={tw`text-md font-medium ml-10 text-md`}>
                    <View style={tw`flex`}>
                        <Text style={tw`font-bold mr-8 mt-2 w-full max-w-full`}>{item.item.title}</Text>
                    </View>
                    <Text style={tw`mt-4`}>Preço total: R$ {item.item.price * quantity}</Text>
                    <Text>Quantidade: {quantity} unidade(s)</Text>
                </View>
                <View style={tw`flex flex-col justify-between ml-auto mr-8`}>
                    <View style={tw`mx-auto`}>
                        <View style={tw`"flex`}>
                            <View onClick={less} style={tw`hover:cursor-pointer hover:bg-slate-200 flex justify-center w-8 h-8 border-t-[1px] border-l-[1px] border-b-[1px] border-gray-700 rounded-tl-md rounded-bl-md`}>
                                <View style={tw`my-auto`}>
                                    <svg style={tw`"fill-slate-500" width="12" height="12" viewBox="0 0 24 24"`}><path d="M0 10h24v4h-24z" /></svg>
                                </View>
                            </View>
                            <View style={tw`"flex justify-center w-8 h-8 border-[1px] border-gray-700"`}>
                                <p style={tw`my-auto`}>{quantity}</p>
                            </View>
                            <View onClick={increase} style={tw`hover:cursor-pointer hover:bg-slate-200 flex justify-center w-8 h-8 border-t-[1px] border-r-[1px] border-b-[1px] border-gray-700 rounded-tr-md rounded-br-md`}>
                                <View style={tw`"my-auto"`}>
                                    <svg style={tw`"fill-slate-500" width="12" height="12" viewBox="0 0 24 24"`}><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={tw`"flex gap-4"`}>
                        <Button onClick={() => window.location.href = "/checkout?item=" + item.item.identifier + "&quantity=" + quantity} variant="contained" color="success" style="h-8" >
                            FINALIZAR
                        </Button>
                        <Button onClick={() => { removeFromCart(); window.location.href = "/cart"}} variant="contained" color="error" style="h-8" >
                            REMOVER
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    );
}