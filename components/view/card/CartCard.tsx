import { Button } from "@mui/material";
import { setUncaughtExceptionCaptureCallback } from "process";
import React, { createRef, RefObject, useRef, useState } from "react";
import { useCookies } from "@react-native-cookies/cookies";
import { delete_cart } from "../../api/cart";
import Item from "../../model/Item";
import ItemWithAssets from "../../model/ItemWithAssets";
import { Response } from "../../model/Response";
import QuantityController from "../QuantityController"

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
        <div className="w-10/12 mx-auto mb-4 h-2/5 border-[1px] border-yellow-400 rounded-lg">
            <div className="flex mb-6 mt-6 ">
                <img onClick={() => window.location.href = "/item/" + item.item.identifier} className="h-20 w-20 my-auto ml-8 hover:cursor-pointer" src={item.assets[0]} alt="" />
                <div className="text-md font-medium ml-10 text-md">
                    <div className="flex">
                        <p className="font-bold mr-8 mt-2 w-full max-w-full">{item.item.title}</p>
                    </div>
                    <p className="mt-4">Preço total: R$ {item.item.price * quantity}</p>
                    <p>Quantidade: {quantity} unidade(s)</p>
                </div>
                <div className="flex flex-col justify-between ml-auto mr-8">
                    <div className="mx-auto">
                        <div className="flex">
                            <div onClick={less} className="hover:cursor-pointer hover:bg-slate-200 flex justify-center w-8 h-8 border-t-[1px] border-l-[1px] border-b-[1px] border-gray-700 rounded-tl-md rounded-bl-md">
                                <div className="my-auto">
                                    <svg className="fill-slate-500" width="12" height="12" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z" /></svg>
                                </div>
                            </div>
                            <div className="flex justify-center w-8 h-8 border-[1px] border-gray-700">
                                <p className="my-auto">{quantity}</p>
                            </div>
                            <div onClick={increase} className="hover:cursor-pointer hover:bg-slate-200 flex justify-center w-8 h-8 border-t-[1px] border-r-[1px] border-b-[1px] border-gray-700 rounded-tr-md rounded-br-md">
                                <div className="my-auto">
                                    <svg className="fill-slate-500" width="12" height="12" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={() => window.location.href = "/checkout?item=" + item.item.identifier + "&quantity=" + quantity} variant="contained" color="success" className="h-8" >
                            FINALIZAR
                        </Button>
                        <Button onClick={() => { removeFromCart(); window.location.href = "/cart"}} variant="contained" color="error" className="h-8" >
                            REMOVER
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}