import React, { useEffect, useState,} from "react";
import { useLocation } from "react-router-dom";
import useQuery from "../../hook/useQuery";

import { View, Text, Image  } from "react-native";
import tw from 'twrnc';
import { Component } from 'react';

import ItemWithAssets from "../../model/ItemWithAssets";
import Navbar from "../Navbar"
import { proxied_host } from "../../api/spec"
import { Radio, Snackbar } from "@mui/material";
import { indigo, pink, purple } from "@mui/material/colors";
import RadioGroup from '@mui/material/RadioGroup';
import CreditCardForm from "../payment/CreditCardForm";
import BoletoForm from "../payment/BoletoForm";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useCookies } from "@react-native-cookies/cookies";
import { post_order } from "../../api/order";
import { Response } from "../../model/Response";
import { get_item, ItemWithAverage } from "../../api/item";

interface Props {
    item: ItemWithAssets,
    quantity: number
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function OrderCheckout() {

    let query = useQuery();
    const itemId = query.get("item");
    const quantity = query.get("quantity");

    const [item, setItem] = useState<ItemWithAssets>();
    const [payment, setPayment] = React.useState('a');

    const [cookies, setCookie] = useCookies();

    const [successSnack, setSuccessSnack] = useState(false);
    const [errorSnack, setErrorSnack] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessSnack(false);
        setErrorSnack(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPayment(event.target.value);
    };

    const controlProps = (item: string) => ({
        checked: payment === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    useEffect(() => get_item(itemId!, (resp: ItemWithAverage) => setItem(resp.item)), [])

    async function postOrder() {
        post_order(itemId!, parseInt(quantity!), cookies.access_token, (resp: Response) => {
            if (resp.status == false) {
                setErrorSnack(true);
                setErrorMessage(resp.message);
            }
            window.location.href = "/orders"
            setSuccessSnack(true);
            setSuccessMessage(resp.message);
        })
    }

    return (
        <View>
            <Navbar fixed={false} bottomBar={true} />
            <View style={tw`p-5 bg-gray-100`}>
                <View style={tw`bg-white p-10 rounded-xl`}>
                    <Text style={tw`font-bold font-inter text-2xl text-gray-700`}> CONFIRMAR PEDIDO:</Text>
                    <Text style={tw`ml-20 mt-12 font-inter font-semibold text-xl text-gray-800`}>REVISAR ITEM:</Text>
                    <View style={tw`flex mt-8 ml-20`}>
                        <Image source={require(item?.assets[0])} style={tw`w-32 h-32`}/>
                        <View style={tw`font-inter my-auto ml-12 font-normal text-xl text-gray-800 gap-y-4`}>
                            <p className="mb-3"><b>COMPRANDO</b>: {item?.item.title}</p>
                            <p className="mb-3"><b>QUANTIDADE</b>: {quantity} unidade(s)</p>
                            <p><b>PREÇO FINAL:</b> R$ {item?.item.price! * parseInt(quantity!)}</p>
                        </View>
                    </View>
                    <Text style={tw `ml-20 mt-20 font-inter font-semibold text-xl text-gray-800`} >FORMA DE PAGAMENTO:</Text>

                    <View style={tw`flex justify-center gap-24 mt-8`}>
                        <View style={tw`flex`}>
                            <Radio {...controlProps('a')} sx={{
                                color: indigo[700],
                                '&.Mui-checked': {
                                    color: indigo[700],
                                },
                            }}
                            />
                            <Text style={tw`my-auto font-inter font-medium`}>Cartão de crédito</Text>
                        </View>

                        <View style={tw`flex`}>
                            <Radio {...controlProps('b')} sx={{
                                color: indigo[700],
                                '&.Mui-checked': {
                                    color: indigo[700],
                                },
                            }}
                            />
                            <Text style={tw`my-auto font-inter font-medium`}>Boleto bancário</Text>
                        </View>

                    </View>

                    <View style={tw`mx-auto flex justify-center mt-6`}>
                        {payment == 'a' ? <CreditCardForm />
                            : payment == 'b' ? <BoletoForm />
                                : <></>}
                    </View>

                    <View style={tw`flex justify-center mt-10 hover:cursor-pointer`} onPress={(postOrder)}>
                        <View style={tw`w-1/5 bg-indigo-500 p-2 py-3 rounded-[0.250rem] hover:bg-indigo-600`}>
                            <Text style={tw`font-inter font-semibold text-lg text-white text-center`}>FINALIZAR PEDIDO</Text>
                        </View>
                    </View>

                </View>
            </View>
            <Snackbar open={successSnack} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={errorSnack} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </View>
    );
}