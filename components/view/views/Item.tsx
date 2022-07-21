import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import addToCart from '../../images/add-to-cart.svg';
import buyNow from '../../images/buy-now.svg';
import { useCookies } from "react-cookie";
import Review from "../Review";
import { json } from "stream/consumers";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Rating, Snackbar } from "@mui/material";
import { proxied_host } from "../../api/spec"
import User from "../../model/User";
import UserStorage from "../../model/UserStorage";
import { get_item_with_reviews, ItemWithReviews } from "../../api/item";
import ItemWithAssets from "../../model/ItemWithAssets";
import { post_cart } from "../../api/cart";
import { Response } from "../../model/Response";
import { get_user_received_reviews, post_review, ReviewsWithAverage } from "../../api/review";

type Props = {
    img: string,
    formated: string,
    price: number,
    delivery: string,
    description: string
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Item() {

    const { id } = useParams();

    const [seller, setSeller] = useState<User>()
    const [imagem, setImagem] = useState<string>("")
    const [preco, setPreco] = useState<number>(0)
    const [description, setDesc] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [reviews, setReviews] = useState<any[]>([])
    const [rateSum, setRateSum] = useState(0);
    const [cookies, setCookie] = useCookies();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [sellerRating, setSellerRating] = useState(0);

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

    useEffect(() => {
        get_item_with_reviews(id!, (item: ItemWithReviews) => {
            setTitle(item.item.item.title)
            setImagem(item.item.assets[0]);
            setPreco(item.item.item.price);
            setDesc(item.item.item.description);
            setRating(item.average);
            if(item.reviews !== undefined && item.reviews !== null) {
                setReviews(item.reviews);
            }
            setSeller(item.item.item.seller);

            if (reviews.length != 0) {
                reviews.map((review: any) => {
                    setRateSum(rateSum + review.rate)
                })
            }
        })
    }, [])

    useEffect(() => {
        if(seller !== undefined) {
            get_user_received_reviews(seller!.username, (resp: ReviewsWithAverage) => {
                console.log(resp.average)
                setSellerRating(resp.average);
            });
        }
    }, [seller])

    function postCart() {
        post_cart(id!, 1, cookies.access_token, (resp: Response) => {
            if(!resp.status) {
                setErrorSnack(true);
                setErrorMessage(resp.message);
                return 
            }
            setSuccessSnack(true);
            setSuccessMessage(resp.message);
        })
    }

    function postReview() {
        post_review({item: id!, rate: rating*2, message: review}, cookies.access_token, (resp: Response) => {
            if(!resp.status) {
                setErrorSnack(true);
                setErrorMessage(resp.message);
            } else {
                setReviews(reviews.concat(
                    {
                        user: UserStorage.getUser(),
                        message: review,
                        rate: rating*2
                    }
                ));
                setSuccessSnack(true);
                setSuccessMessage(resp.message);
                setReview("");
                setRating(0);
            }
        })
    }

    return (

        <div className="mb-8">
            <Navbar fixed={true} bottomBar={true} />
            <div className="mt-24 bg-gray-100 p-5 md:flex justify-center">
                <div className="md:w-3/5 md:flex p-5 rounded-xl bg-white border-[1px] border-gray-300">
                    <div className="md:w-3/6 rounded-lg mr-12">
                        <img src={imagem} className="h-64 w-64 mb-4 md:mb-0 md:h-96 md:w-96 p-4" />
                    </div>
                    <div className="md:w-3/5">
                        <div>
                            <p className="text-2xl font-inter font-semibold ml-2 mr-2 text-gray-800">{title}</p>
                            <div className="font-inter text-4xl font-normal text-gray-800 static mt-8 ml-2 flex">
                                <p className="text-2xl mr-2">R$</p>
                                <p className="font-semibold">{preco.toFixed(2)}</p>
                            </div>
                            <div className="flex">
                                <div className="w-1/2">
                                    <div className="flex text-sm font-inter font-semibold my-auto ml-2 mr-2 text-gray-700">
                                        <p className="mt-1 mr-2">Avaliação: </p>
                                        { rating == -1 ? <p className="w-full"> Nenhuma avaliação</p> :
                                            <Rating className="mt-1" precision={0.5} name="read-only" value={rating/2} readOnly size="small"/>
                                        }
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm font-inter text-justify pt-4 ml-2 mt-4 font-medium text-gray-700">{description}</p>
                        </div>
                        <div className="md:float-right flex mt-10">
                            <div onClick={postCart} className="mr-4 text-sm font-inter font-semibold bg-transparent text-indigo-500 py-2 px-3 border border-indigo-500 rounded hover:cursor-pointer">
                                <div className="flex">
                                    <img src={addToCart} alt="" />
                                    <span className="ml-2">Adicionar ao carrinho</span>
                                </div>
                            </div>
                            <div onClick={() => window.location.href = "/checkout?item=" + id + "&quantity=1"} className="text-sm font-inter font-semibold bg-transparent text-indigo-500 py-2 px-3 border border-indigo-500 rounded hover:cursor-pointer">
                                <div className="flex">
                                    <img src={buyNow} alt="" />
                                    <span className="ml-2">Comprar agora</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/4">
                    <div className="bg-white w-full border-[1px] p-4 border-purple-600 mt-4 md:mt-0 md:ml-5 rounded-xl">
                        <p className="mb-4 font-inter text-sm font-light">Vendedor(a):</p>
                        <div className="ml-4">
                            <div className="flex">
                                <img onClick={() => window.location.href = "/user/" + seller?.username} src={seller?.profile_picture} className="hover:cursor-pointer h-11 w-11 border-purple-600 border-2 rounded-full" />
                                <div>
                                    <p className="font-inter text-md font-normal ml-4">{seller?.name}</p>
                                    <p className="font-inter text-xs font-normal ml-4 text-gray-500 mt-1">{seller?.city}</p>
                                </div>
                            </div>
                            <p className="font-inter text-md text-gray-700 font-bold mt-8">Avaliação geral:</p>
                            <Rating className="mt-1" precision={0.5} name="read-only" value={sellerRating/2} readOnly size="small"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5 pt-0 bg-gray-100">
                <div className="flex justify-center">
                    <div className="p-5 w-full md:w-[86.5%] bg-white rounded-xl border-[1px] border-gray-300">
                        <div className="flex md:ml-14">
                            <svg className="w-6 h-6 fill-yellow-400 my-auto" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 6.5c-.414 0-.75.336-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5c0-.414-.336-.75-.75-.75zm-.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" fill-rule="nonzero"/></svg>
                            <p className="font-inter font-bold text-gray-900 text-lg ml-4 mt-6 mb-6">Avaliações dos usuários:</p>
                        </div>
                        {(reviews === undefined || reviews.length === 0)
                            ? <p className="text-gray-900 font-light text-md md:ml-16 md:text-left text-center">Nenhuma avaliação até o momento.</p>
                            : reviews.map((review: any, i: number, reviews: any[]) => {
                                return (
                                    <div className={`
                            ${i == 0 ? "md:rounded-t-xl" : "md:border-t-0"}
                            ${i == reviews.length - 1 ? "md:rounded-b-xl" : "md:border-b-0"}
                            p-4 md:mx-16 md:border-[1px]
                            border-indigo-400
                        `}>
                                        <Review reviewer={review.user.name} pfp={review.user.profile_picture} rating={review.rate} description={review.message} />
                                    </div>
                                );
                            })}
                        <div className="md:mx-16 mx-2 mt-10">
                            <textarea value={review} onChange={(e: any) => setReview(e.target.value)} placeholder="Deixe uma avaliação para esse produto" className="w-full border-[1px] rounded-xl border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3 resize-none" rows={2} />
                            <div className="flex">
                                <div className="mt-3 md:mt-2">
                                    <Rating
                                        size="medium"
                                        name="simple-controlled"
                                        value={rating}
                                        precision={0.5}
                                        onChange={(event, newValue: any) => {
                                            setRating(newValue);
                                        }}
                                    />
                                </div>
                                <div className="ml-auto mr-0 mt-2 rounded-md bg-yellow-400 hover:cursor-pointer" onClick={postReview}>
                                    <p className="text-white p-2 font-inter font-medium">Enviar avaliação</p>
                                </div>
                            </div>
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
    )
}