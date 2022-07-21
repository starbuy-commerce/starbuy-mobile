import { Link, useNavigate } from "react-router-dom";
import { View, Text, Image } from "react-native";
import tw from 'twrnc';

type Props = {
    duration: number,
    src: string,
    target_url: string
}

export default function TransitionButton({ duration, src, target_url }: Props) {

    return (
        <View onClick={() => window.location.href = `${target_url}`}>
            <li id="cartButton" style={tw`ml-3 mt-2 md:pr-10 transition duration-${duration} ease-in-out transform hover:-translate-y-1 hover:scale-110`}>
                <img src={src} style={tw`w-6 h-6 md:w-10 md:h-10 cursor-pointer" alt=""`} />
            </li>
        </View>
    );
}