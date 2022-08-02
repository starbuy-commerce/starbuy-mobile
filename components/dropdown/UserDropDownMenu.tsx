import React, { useState } from "react";
import UserStorage from "../../model/UserStorage";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import Line from "../line/Line";

type Prop = { 
    visible: boolean
    navigation:any
};



export default function UserDropDownMenu({ visible, navigation }: Prop) {

    const sections = [
        {
            name: "Perfil",
            png:require("iconmonstr-user-2.png"),
            trigger: () => navigation.navigate("/user")
        },
        {
            name: "Configuração",
            png: require('gear.png'),
            trigger: () => navigation.navigate("/settings")
        },
        {
            name: "Minhas compras",
            png: require('shopping_bag'),
            trigger: () => navigation.navigate("/orders")
        },
        {
            name: "Meu carrinho", 
            png: require('iconmonstr-shopping-cart-2.png'),
            trigger: () => navigation.navigate("/cart")
        },
        {
            //cookies para sair
            name: "Sair",
            png: require('iconmonstr-log-out-8.png'),
            trigger: () => { navigation.navigate("/") }
        }
    ]

    //const [cookies, setCookie, removeCookie] = useCookies();
    const [isActive, setActive] = useState(false);
    function onClick() {
        setActive(!isActive)
    }

    return (
        <View style={tw`flex flex-col`}>
            <TouchableOpacity onPress={onClick}>
            <Image source={require(UserStorage.getPfp())}  style={tw`rounded-full border-indigo-600 w-10 h-10 mr-12 mt-2 border-[3px] top-[-10] cursor-pointer`}/>
            </TouchableOpacity>
            <View style={tw`absolute transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0"} ${isActive ? "z-20" : "-z-10"} float-right right-10 top-[-50px] bg-white rounded-lg mx-auto mt-32 w-72 border-[1px] border-yellow-300 overflow-auto`}>
            {sections.map((section, i, arr) => {
                return (
                    <>
                    <TouchableOpacity onPress={() => { if(isActive) section.trigger()}}>
                        <View style={tw`flex px-2 hover:cursor-pointer hover:bg-gray-100 text-yel text-gray-700 fill-gray-700`} >
                            <Image source={section.png} style={tw`my-auto w-6 h-6 ml-2`} ></Image>
                            <Text style={tw`font-inter ml-6 font-bold my-3`}>{section.name}</Text>
                        </View>
                    </TouchableOpacity>
                        {i != arr.length-1 && <Line/>}
                    </>
                )
            })}
        </View>
        </View>
    );
}