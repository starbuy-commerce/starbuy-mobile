import { Link, useNavigate } from "react-router-dom";
import { View, Text, Image } from "react-native";
import tw from 'twrnc';

type Props = {
    img: string,
    category: string,
    size: string,
    id: number
}

export default function CategoryButton({img, category, size, id}: Props) {

    return (
        <View style={tw`cursor-pointer flew-grow`} onClick={() => window.location.href="/category/" + id}>
            <View style={tw`rounded-full border-4 border-violet-600 w-14 h-14 flex mx-auto hover:bg-yellow-300 transition duration-300 ease-in-out`}>
                <Image style={tw`mx-auto justify-center my-auto ${size}`} source={require(img)}/>
            </View>
            <Text style={tw`text-violet-700 text-sm font-semibold text-center`}>{category}</Text>
        </View>
    );
}