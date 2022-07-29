import Input from "../Input"
import { View, Text, TextInput } from "react-native";
import tw from 'twrnc';
import React from "react";
import Svg, { Path } from "react-native-svg";

export default function CreditCardForm() {
    return (
        <View style={tw`w-2/5`}>
            <View style={tw`flex mb-2`}>
                <Svg style={tw`"fill-gray-700" width="32" height="32" viewBox="0 0 24 24`}><Path d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm0 13.5c0 .276-.224.5-.5.5h-19c-.276 0-.5-.224-.5-.5v-6.5h20v6.5zm0-9.5h-20v-1.5c0-.276.224-.5.5-.5h19c.276 0 .5.224.5.5v1.5zm-9 6h-9v-1h9v1zm-3 2h-6v-1h6v1zm10-2h-3v-1h3v1z"/></Svg>
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