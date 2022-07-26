import React, { useEffect, useState, Component } from 'react';
import { useLocation } from "react-router-native";
import useQuery from "../../hook/useQuery";
import ItemWithAssets from "../../model/ItemWithAssets";
import Navbar from "../Navbar"
import { proxied_host } from "../../api/spec"
import { RadioButton, Text } from 'react-native-paper';
import CreditCardForm from "../payment/CreditCardForm";
import BoletoForm from "../payment/BoletoForm";
import { post_order } from "../../api/order";
import { Response } from "../../model/Response";
import { get_item, ItemWithAverage } from "../../api/item";
import {View, Image, TouchableOpacity} from "react-native";
import tw from 'twrnc';


interface Props {
    item: ItemWithAssets,
    quantity: number
}

export default function OrderCheckout({ navigation }: any) {

    let query = useQuery();
    const itemId = query.get("item");
    const quantity = query.get("quantity");

    const [item, setItem] = useState<ItemWithAssets>();
    const [payment, setPayment] = React.useState('a');

    const [successSnack, setSuccessSnack] = useState(false);
    const [errorSnack, setErrorSnack] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => get_item(itemId!, (resp: ItemWithAverage) => setItem(resp.item)), [])

    async function postOrder() {
        post_order(itemId!, parseInt(quantity!), 'teste', (resp: Response) => {
            if (resp.status == false) {
                setErrorSnack(true);
                setErrorMessage(resp.message);
            }
            navigation.navigate("Orders")
            setSuccessSnack(true);
            setSuccessMessage(resp.message);
        })
    }


    return (
        <View>
            <Navbar fixed={false} bottomBar={true} />
            <View style={tw`p-5 bg-gray-100`}>
                <View style={tw`bg-white p-10 rounded-xl`}>
                    <Text style={tw`font-bold font-inter text-2xl text-gray-700`}>CONFIRMAR PEDIDO:</Text>
                    <Text style={tw`ml-20 mt-12 font-inter font-semibold text-xl text-gray-800`}>REVISAR ITEM:</Text>
                    <View style={tw`flex mt-8 ml-20`}>

                        <Image source={require("")} style={tw`w-32 h-32`}/>

                        <View style={tw`font-inter my-auto ml-12 font-normal text-xl text-gray-800 gap-y-4`}>
                            <Text style={tw`mb-3`}><b>COMPRANDO</b>: {item?.item.title}</Text>
                            <Text style={tw`mb-3`}><b>QUANTIDADE</b>: {quantity} unidade(s)</Text>
                            <Text><b>PREÇO FINAL:</b> R$ {item?.item.price! * parseInt(quantity!)}</Text>
                        </View>
                    </View>
                    <Text style={tw`ml-20 mt-20 font-inter font-semibold text-xl text-gray-800`}>FORMA DE PAGAMENTO:</Text>

                    <View style={tw`flex justify-center gap-24 mt-8`}>
                        <View style={tw`flex`}>
                            <RadioButton
                                value="credito"
                                status={ payment === 'credito' ? 'checked' : 'unchecked' }
                                onPress={() => setPayment('credito')}
                            />
                            <Text style={tw`my-auto font-inter font-medium`}>Cartão de crédito</Text>
                        </View>

                        <View style={tw`flex`}>
                            <RadioButton
                                value="boleto"
                                status={ payment === 'boleto' ? 'checked' : 'unchecked' }
                                onPress={() => setPayment('boleto')}
                            />
                            <Text style={tw`my-auto font-inter font-medium`}>Boleto bancário</Text>
                        </View>

                    </View>

                    <View style={tw`mx-auto flex justify-center mt-6`}>
                        {payment == 'a' ? <CreditCardForm />
                            : payment == 'b' ? <BoletoForm />
                                : <></>}
                    </View>

                    <TouchableOpacity onPress={(postOrder)}>
                        <View style={tw`flex justify-center mt-10 hover:cursor-pointer`}>
                            <View style={tw`w-1/5 bg-indigo-500 p-2 py-3 rounded-[0.250rem] hover:bg-indigo-600`}>
                                <Text style={tw`font-inter font-semibold text-lg text-white text-center`}>FINALIZAR PEDIDO</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}
