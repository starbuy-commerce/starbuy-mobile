import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from 'twrnc';

type Props = {
    img: string,
    name: string,
    price: number,
    id: string
    navigation:any;
}

export default function ProductCard({ img, name, price, id,navigation }: Props) {
    var formated: string = name;
    if(formated.length > 40) formated = name.substring(0, 40) + "..."

    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate("/item/" + id)}>
            <View style={tw`z-0 flex-grow cursor-pointer justify-center box-border flex-row w-40 max-w-[10rem] md:max-w-[13rem] md:w-52 md:shadow-md border-yellow-400 rounded-lg border shadow-gray-300 transition ease-in-out hover:border-violet-700 delay-100 hover:-translate-y-1 hover:scale-110 duration-300`}>
                <Image source={require(img)} style={tw`p-4 w-40 h-40 md:h-52 md:w-52 rounded-t-md`} />
                <View style={tw`w-40 h-28 md:w-52 md:h-24`}>
                    <Text style={tw`text-sm break-words font-inter font-light mt-2 ml-2 mr-2 text-gray-800`}>{formated}</Text>
                    <Text style={tw`font-inter font-bold text-violet-900 static mt-4 ml-2`}>R$ {price.toFixed(2)}</Text>
                </View>
            </View>
            </TouchableOpacity>
        </>
    );
}