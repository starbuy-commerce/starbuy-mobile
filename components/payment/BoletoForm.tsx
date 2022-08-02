import Input from "../Input"
import { View, Text, TextInput, Image } from "react-native";
import tw from 'twrnc';
import React from "react";


export default function BoletoForm() {
    const pix = require('../../images/pix.png')
    const boleto = require('../../images/boleto.png')
    return (
        <View style={tw`w-2/5`}>
            <View style={tw`flex mb-2`}>
            <Image source={boleto}/>
            <Text style={tw`font-inter my-auto font-semibold text-sm ml-4`}>INFORMAÇÕES DO BOLETO</Text>
            </View>
            <View style={tw`flex gap-2 mt-4`}>
                <TextInput placeholder="Nome" style={tw`w-2/4 border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
                <TextInput placeholder="Sobrenome" style={tw`w-2/4 border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
            </View>
            <TextInput placeholder="CPF" style={tw`w-full border-[1px] mt-4 rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
        </View>
    );
}