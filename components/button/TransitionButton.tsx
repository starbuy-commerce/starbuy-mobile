import { Link, useNavigate } from "react-router-native";
import { View, Text, Image } from "react-native";
import { Touchable, TouchableOpacity,} from "react-native";
import * as React from 'react';
import tw from 'twrnc';
import {List} from "react-native-paper"
import { ListItem } from "react-native-elements";
import Unorderedlist from 'react-native-unordered-list';

type Props = {
    duration: number,
    src: string,
    target_url: string
    navigation:any;
}

export default function TransitionButton({ duration, src, target_url, navigation}: Props) {

    return (
        <TouchableOpacity onPress={() => navigation.navigate(`${target_url}`)}>
        <View nativeID="cartButton">
        <Unorderedlist style={tw`ml-3 mt-2 md:pr-10`}>
                <Image source={require(src)} style={tw`w-6 h-6 md:w-10 md:h-10 cursor-pointer`} />
        </Unorderedlist>
        </View>
        </TouchableOpacity>
    );
}