import { Image, Text, View } from "react-native";
import tw from 'twrnc';

const Review = () => {
    const imageSla = undefined;
    return (
        <View>
            <View style={tw`flex`}>
                <Image source={require('./linkdaimagem')} style={tw`rounded-full w-12 h-12`}/>
                <View style={tw`ml-4`}>
                    <View style={tw`flex`}>
                        <Text style={tw`font-inter text-gray-800 font-medium text-[0.95rem]`}>Victor Hugo</Text>
                    </View>
                    <Text style={tw`font-inter text-gray-900 text-sm mt-2 w-full text-justify`}>aaaa</Text>
                </View>
            </View>
        </View>
    );
}

export default Review