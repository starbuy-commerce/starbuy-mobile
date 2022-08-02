import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-native";
import Navbar from "../Navbar";

import { proxied_host } from "../../api/spec"
import { get_orders } from "../../api/order";
import Order from "../../model/Order";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { Title } from "react-native-paper";
import { Image } from "react-native";
import Svg, { Path, SvgUri, SvgXml } from "react-native-svg";

export default function Orders( {navigation}: any) {

    const proxy = 'https://blooming-coast-08475.herokuapp.com/'
    const delivery=require("../../images/delivery.png")    
    const [orders, setOrders] = useState<any[]>([])
    


    return (
        <View>
            <Navbar bottomBar={true} fixed={false} />
            <View style={tw`flex`}>
                <View style={tw`font-inter text-[#4A4A4A]`}>
                    <Title style={tw`font-inter font-bold text-2xl ml-20 mt-12 mb-12`}>MEUS PEDIDOS</Title>
                    {orders === null || orders === undefined || orders.length == 0 
                        ? 
                        <Text style={tw`text-lg font-inter font-medium ml-20`}>Você não tem nenhum pedido em andamento</Text> 
                        : 
                        <View style={tw`overflow-y-auto`}>
                            {orders.map(order => {
                                return (
                                    <View style={tw`w-11/12 h-2/5 mb-12 border-[1px] border-yellow-400 mx-auto rounded-lg`}>
                                    <View style={tw`flex mb-6 mt-6 `}>
                                        <TouchableOpacity onPress={() => navigation.navigate("item") + order.item.item.identifier} >
                                        <Image style={tw`h-48 w-48 ml-8 my-auto hover:cursor-pointer`} source={order.item.assets[0]} />
                                        </TouchableOpacity>
                                        <View style={tw`text-md font-medium ml-10 text-md`}>
                                            <Text style={tw`font-bold mr-4 mt-2`}>{order.item.item.title} - Comprado em: 22/02/2022</Text>
                                            <Text style={tw`mt-4`}>Preço total: R$ {order.price}</Text>
                                            <Text>Quantidade: {order.quantity} unidade(s)</Text>
                                            <Text>Endereço de entrega: Trampo</Text>
                                            <View style={tw`flex mt-4`}>
                                                <Text>Status:
                                                    <Text style={tw`text-green-400 font-bold`}> ENVIADO</Text>
                                                </Text>
                                                <Image source={delivery} style={tw`w-6 h-6 fill-green-400 ml-2`}></Image>
                                                <Text style={tw`ml-8`}>Entrega estimada para 22 de abril de 2022</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                );
                        })}
                    </View>}
                </View>
            </View>
        </View>
    )

}