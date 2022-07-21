import React, { useEffect, useState } from "react";
import { useParams } from "react-router-native";
import Navbar from "../Navbar";
import addToCart from '../../images/add-to-cart.svg';
import buyNow from '../../images/buy-now.svg';
import { useCookies } from "@react-native-cookies/cookies";
import Review from "../Review";
import { proxied_host } from "../../api/spec"
import User from "../../model/User";
import UserStorage from "../../model/UserStorage";
import { get_item_with_reviews, ItemWithReviews } from "../../api/item";
import ItemWithAssets from "../../model/ItemWithAssets";
import { post_cart } from "../../api/cart";
import { Response } from "../../model/Response";
import { get_user_received_reviews, post_review, ReviewsWithAverage } from "../../api/review";
import { View, ViewComponent } from "react-native";
import { Text } from "react-native-paper";

import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-native";
import tw from 'twrnc';

type Props = {
    img: string,
    formated: string,
    price: number,
    delivery: string,
    description: string
}

export default function Item({navigation}: any) {

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
            
        })

        navigation.navigate("Orders")
    }

    function postReview() {
        post_review({item: id!, rate: rating*2, message: review}, cookies.access_token, (resp: Response) => {
            if(resp.status) {
                setReviews(reviews.concat(
                    {
                        user: UserStorage.getUser(),
                        message: review,
                        rate: rating*2
                    }
                ));
                setReview("");
                setRating(0);
            }
        })
    }

    return (

        <View style={tw`mb-8`}>
            <Navbar fixed={true} bottomBar={true} />
            <View style={tw`mt-24 bg-gray-100 p-5 md:flex justify-center`}>
                <View style={tw`md:w-3/5 md:flex p-5 rounded-xl bg-white border-[1px] border-gray-300`}>
                    <View style={tw`md:w-3/6 rounded-lg mr-12`}>
                        <Image source={require(imagem)} style={tw`"h-64 w-64 mb-4 md:mb-0 md:h-96 md:w-96 p-4"`} />
                    </View>
                    <View style={tw`md:w-3/5`}>
                        <View>
                            <Text style={tw`text-2xl font-inter font-semibold ml-2 mr-2 text-gray-800`}>{title}</Text>
                            <View style="font-inter text-4xl font-normal text-gray-800 static mt-8 ml-2 flex">
                                <Text style="text-2xl mr-2">R$</p>
                                <Text style="font-semibold">{preco.toFixed(2)}</Text>
                            </View>
                            <View style={tw`flex`}>
                                <View style={tw`w-1/2`}>
                                    <View style={tw`flex text-sm font-inter font-semibold my-auto ml-2 mr-2 text-gray-700`}>
                                        <Text style={tw`mt-1 mr-2`}>Avaliação: </Text>
                                        { rating == -1 ? <Text style={`w-full`}> Nenhuma avaliação</Text> :
                                            <Rating style="mt-1" precision={0.5} name="read-only" value={rating/2} readOnly size="small"/>
                                        }
                                    </View>
                                </View>
                            </View>

                            <Text style={tw`text-sm font-inter text-justify pt-4 ml-2 mt-4 font-medium text-gray-700`}>{description}</p>
                        </View>
                        <View style="md:float-right flex mt-10">
                            <View onClick={postCart} style="mr-4 text-sm font-inter font-semibold bg-transparent text-indigo-500 py-2 px-3 border border-indigo-500 rounded hover:cursor-pointer">
                                <View style="flex">
                                    <img src={addToCart} alt="" />
                                    <span style="ml-2">Adicionar ao carrinho</span>
                                </View>
                            </View>
                            <View onClick={() => navigation} style="text-sm font-inter font-semibold bg-transparent text-indigo-500 py-2 px-3 border border-indigo-500 rounded hover:cursor-pointer">
                                <View style="flex">
                                    <img src={buyNow} alt="" />
                                    <span style="ml-2">Comprar agora</span>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style="md:w-1/4">
                    <View style="bg-white w-full border-[1px] p-4 border-purple-600 mt-4 md:mt-0 md:ml-5 rounded-xl">
                        <p style="mb-4 font-inter text-sm font-light">Vendedor(a):</p>
                        <View style="ml-4">
                            <View style="flex">
                                <img onClick={() => window.location.href = "/user/" + seller?.username} src={seller?.profile_picture} style="hover:cursor-pointer h-11 w-11 border-purple-600 border-2 rounded-full" />
                                <View>
                                    <p style="font-inter text-md font-normal ml-4">{seller?.name}</p>
                                    <p style="font-inter text-xs font-normal ml-4 text-gray-500 mt-1">{seller?.city}</p>
                                </View>
                            </View>
                            <p style="font-inter text-md text-gray-700 font-bold mt-8">Avaliação geral:</p>
                            <Rating style="mt-1" precision={0.5} name="read-only" value={sellerRating/2} readOnly size="small"/>
                        </View>
                    </View>
                </View>
            </View>
            <View style="p-5 pt-0 bg-gray-100">
                <View style="flex justify-center">
                    <View style="p-5 w-full md:w-[86.5%] bg-white rounded-xl border-[1px] border-gray-300">
                        <View style="flex md:ml-14">
                            <svg style="w-6 h-6 fill-yellow-400 my-auto" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 6.5c-.414 0-.75.336-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5c0-.414-.336-.75-.75-.75zm-.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" fill-rule="nonzero"/></svg>
                            <p style="font-inter font-bold text-gray-900 text-lg ml-4 mt-6 mb-6">Avaliações dos usuários:</p>
                        </View>
                        {(reviews === undefined || reviews.length === 0)
                            ? <p style="text-gray-900 font-light text-md md:ml-16 md:text-left text-center">Nenhuma avaliação até o momento.</p>
                            : reviews.map((review: any, i: number, reviews: any[]) => {
                                return (
                                    <View style={`
                            ${i == 0 ? "md:rounded-t-xl" : "md:border-t-0"}
                            ${i == reviews.length - 1 ? "md:rounded-b-xl" : "md:border-b-0"}
                            p-4 md:mx-16 md:border-[1px]
                            border-indigo-400
                        `}>
                                        <Review reviewer={review.user.name} pfp={review.user.profile_picture} rating={review.rate} description={review.message} />
                                    </View>
                                );
                            })}
                        <View style="md:mx-16 mx-2 mt-10">
                            <textarea value={review} onChange={(e: any) => setReview(e.target.value)} placeholder="Deixe uma avaliação para esse produto" style="w-full border-[1px] rounded-xl border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3 resize-none" rows={2} />
                            <View style="flex">
                                <View style="mt-3 md:mt-2">
                                    <Rating
                                        size="medium"
                                        name="simple-controlled"
                                        value={rating}
                                        precision={0.5}
                                        onChange={(event, newValue: any) => {
                                            setRating(newValue);
                                        }}
                                    />
                                </View>
                                <View style="ml-auto mr-0 mt-2 rounded-md bg-yellow-400 hover:cursor-pointer" onClick={postReview}>
                                    <p style="text-white p-2 font-inter font-medium">Enviar avaliação</p>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}