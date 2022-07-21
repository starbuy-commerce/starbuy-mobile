import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useQuery from "../../hook/useQuery";
import ItemWithAssets from "../../model/ItemWithAssets";
import Navbar from "../Navbar"
import { proxied_host } from "../../api/spec"
import { Radio, Snackbar } from "@mui/material";
import { indigo, pink, purple } from "@mui/material/colors";
import RadioGroup from '@mui/material/RadioGroup';
import CreditCardForm from "../payment/CreditCardForm";
import BoletoForm from "../payment/BoletoForm";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useCookies } from "react-cookie";
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
        <div>
            <Navbar fixed={false} bottomBar={true} />
            <div className="p-5 bg-gray-100">
                <div className="bg-white p-10 rounded-xl">
                    <p className="font-bold font-inter text-2xl text-gray-700">CONFIRMAR PEDIDO:</p>
                    <p className="ml-20 mt-12 font-inter font-semibold text-xl text-gray-800">REVISAR ITEM:</p>
                    <div className="flex mt-8 ml-20">
                        <img src={item?.assets[0]} className="w-32 h-32" />
                        <div className="font-inter my-auto ml-12 font-normal text-xl text-gray-800 gap-y-4">
                            <p className="mb-3"><b>COMPRANDO</b>: {item?.item.title}</p>
                            <p className="mb-3"><b>QUANTIDADE</b>: {quantity} unidade(s)</p>
                            <p><b>PREÇO FINAL:</b> R$ {item?.item.price! * parseInt(quantity!)}</p>
                        </div>
                    </div>
                    <p className="ml-20 mt-20 font-inter font-semibold text-xl text-gray-800">FORMA DE PAGAMENTO:</p>

                    <div className="flex justify-center gap-24 mt-8">
                        <div className="flex">
                            <Radio {...controlProps('a')} sx={{
                                color: indigo[700],
                                '&.Mui-checked': {
                                    color: indigo[700],
                                },
                            }}
                            />
                            <p className="my-auto font-inter font-medium">Cartão de crédito</p>
                        </div>

                        <div className="flex">
                            <Radio {...controlProps('b')} sx={{
                                color: indigo[700],
                                '&.Mui-checked': {
                                    color: indigo[700],
                                },
                            }}
                            />
                            <p className="my-auto font-inter font-medium">Boleto bancário</p>
                        </div>

                    </div>

                    <div className="mx-auto flex justify-center mt-6">
                        {payment == 'a' ? <CreditCardForm />
                            : payment == 'b' ? <BoletoForm />
                                : <></>}
                    </div>

                    <div className="flex justify-center mt-10 hover:cursor-pointer" onClick={postOrder}>
                        <div className="w-1/5 bg-indigo-500 p-2 py-3 rounded-[0.250rem] hover:bg-indigo-600">
                            <p className="font-inter font-semibold text-lg text-white text-center">FINALIZAR PEDIDO</p>
                        </div>
                    </div>

                </div>
            </div>
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
        </div>
    );
}