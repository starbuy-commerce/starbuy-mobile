import { View, Text, Image, TouchableOpacity, ScrollView,} from "react-native";
import tw from 'twrnc';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransitionButton from "./button/TransitionButton";
import UserStorage from "../model/UserStorage";
import { useState } from "react";
import UserDropDownMenu from "./dropdown/UserDropDownMenu";
import HomeScreen from "./HomeScreen";
import { useNavigation } from '@react-navigation/native';
import { List, TextInput } from "react-native-paper";
import { Button, ListItem } from "react-native-elements";
import Svg, { Path, SvgXml } from "react-native-svg";
import Unorderedlist from 'react-native-unordered-list';



type Prop = { fixed: boolean, bottomBar: boolean };

export default function Navbar({navigation}: any , { fixed, bottomBar }: Prop) {

    //const navigation = useNavigation();
    //const [cookies, setCookie] = useCookies();
    const [dropdownToggled, setDropdown] = useState<boolean>(false);
    const [search, setSearch] = useState<any>("");
    const cart= require('../images/cart.png')
    const logo=require('../images/logo.png')
    const login=require('../images/login.png')
    const found = require('../images/found.png')
    

    const Stack = createNativeStackNavigator();
    function query() {
        if(search != "")
        {
        return(navigation.navigate("/search/"+search.replaceAll(" ","%20")))
        
        }
}

    return(
       
            <View style={tw`bg-white top-0 w-screen z-[99] ${fixed ? "fixed" : ""}`}>
                <View style={tw`flex justify-between`}>
                    <View style={tw`hidden sm:block`}>
                        <TouchableOpacity onPress={() => navigation.navigate("/") }>
                        <Image source={logo} style={tw`cursor-pointer md:pr-0 h-16 w-36 md:h-16 md:w-56 m-4`}  />
                        </TouchableOpacity>
                    </View>
                    <View style={tw`pt-1 md:pt-3 mt-4`}>
                        <View style={tw`ml-4 mb-3 md:mr-16 flex h-10 text-gray-500 border-2 rounded border-purple-700`}>
                            <TextInput value={search} onChangeText={setSearch} style={tw`w-48 md:w-96 sm:w-16 pl-3 text-sm focus-within:outline-none`} placeholder="Pesquisar produto ou loja" />
                            <Button onPress={query} style={tw`flex items-center justify-center px-4 border-l hover:bg-yellow-300 transition duration-500 ease-in-out`}>
                                <Image source={found} style={tw`"w-6 h-6 text-indigo-700" fill="#4338CA" viewBox="0 0 24 24`}></Image>
                            </Button>
                        </View>
                    </View>
            </View>
            <Unorderedlist style={tw`flex flex-row text-white my-auto`}>
           
                        {""/*cookies.access_token*/ == undefined &&
                            <TransitionButton duration={200} src={login} target_url="/login" navigation={undefined} />}
                        {""/*cookies.access_token*/ != undefined && <UserDropDownMenu visible={true} navigation={undefined}/>}

                    
            </Unorderedlist>
                {bottomBar && <View style={tw`h-1 bg-indigo-400`}></View>}
            </View>
       
    );
}
