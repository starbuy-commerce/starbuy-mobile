import CategoryButton from "../button/CategoryButton";
import CategoryDropdown from "../dropdown/CategoryDropdown";
import Navbar from "../Navbar";
import ProductCard from "../card/ProductCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "../Review";
import { proxied_host } from "../../api/spec";
import { get_items, query_category, query_items } from "../../api/item";
import { Response } from "../../model/Response";
import ItemWithAssets from "../../model/ItemWithAssets";
import { View, Text } from "react-native";
import tw from 'twrnc';


const Home = () => {

    const { category } = useParams();
    const [items, setItems] = useState<ItemWithAssets[]>([])
    const { query } = useParams();
    const tech=require("../images/category/tech.svg")
    const clothes=require("../../images/category/clothes.svg")
    const books=require("../../images/category/books.svg")
    const home=require("../../images/category/home.svg")
    const guitarLogo=require("../../images/category/guitar.svg")
    
    useEffect(() => {
        if(category === undefined && query === undefined) {
            get_items((resp: ItemWithAssets[]) => setItems(resp))
            return
        }

        if(category !== undefined) {
            query_category(parseInt(category), (resp: ItemWithAssets[]) => setItems(resp))
            return
        }

        if(query !== undefined) {
            query_items(query, (resp: ItemWithAssets[]) => setItems(resp))
            return
        }
        
    })

    return (
        <>
            <Navbar fixed={true} bottomBar={true} />
            <View style={tw`mt-32 mb-10`}>
                <View style={tw`md:flex gap-6 justify-center hidden`}>
                    <CategoryButton img={tech} size="w-10 h-10" category="Eletrônico" id={1} />
                    <CategoryButton img={clothes} size="w-10 h-10" category="Vestuário" id={2} />
                    <CategoryButton img={books} size="w-8 h-8" category="Livros" id={4} />
                    <CategoryButton img={guitarLogo} size="w-8 h-8" category="Música" id={7} />
                    <CategoryButton img={home} size="w-8 h-8" category="Casa" id={3} />
                </View>
                
                <View style={tw`md:hidden md:invisible`}>
                    <CategoryDropdown/>
                </View>

                <View style={tw`flex gap-6 flex-wrap md:pr-24 md:pl-24 md:gap-y-7 mt-12 justify-center z-0`}>
                    {items === null ? <p>Nenhum item encontrado</p>
                    : items.map(item => {
                        const image: string = item.assets[0];
                        return (<ProductCard img={image} name={item.item.title} price={item.item.price} id={item.item.identifier} />)
                    })}
                </View>
            </View>
        </>
    );
}

export default Home;