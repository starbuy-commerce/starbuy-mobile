import Input from "../Input"
import { View, Text, TextInput, Image } from "react-native";
import tw from 'twrnc';
import React from "react";

export default function CreditCardForm() {

    const card = require ('../../images/card.png')

    return (
        <View style={tw`w-2/5`}>
            <View style={tw`flex mb-2`}>
                <Image source={card}></Image>
                <Text style={tw`font-inter my-auto font-semibold text-sm ml-4`}>INFORMAÇÕES DO CARTÃO</Text>
            </View>
            <TextInput placeholder="Número do cartão" style={tw`w-full border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
            <View style={tw`flex gap-2 mt-4`}>
                <TextInput placeholder="CVV" style={tw`w-2/4 border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
                <TextInput placeholder="Validade" style={tw`w-2/4 border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
            </View>
            <View style={tw`flex gap-2 mt-4`}>
                <TextInput placeholder="Agência" style={tw`w-2/4 border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
                <TextInput placeholder="Conta" style={tw`w-2/4 border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
            </View>
        </View>
    );
}