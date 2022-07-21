import { Text, View, Image } from 'react-native';
import tw from 'twrnc';
import { Rating, AirbnbRating } from 'react-native-ratings';

export default function Review({reviewer, pfp, rating, description}: any) {
    return (
        <View style={tw``}>
            <View style={(tw`Flex`)}>
                <Image source={(pfp)} style={tw`rounded-full w-12 h-12`}/>
                <View style={tw`ml-4`}>
                    <View style={tw`flex`}>
                        <Text style={tw`font-inter text-gray-800 font-medium text-[0.95rem]`}>{reviewer}</Text>
                        <View style={tw`ml-4`}>
                            <Rating precision={0.5} name="read-only" value={rating/2} readOnly size="small"/>
                        </View>
                    </View>
                    <Text style={tw`font-inter text-gray-900 text-sm mt-2 w-full text-justify`}>{description}</Text>
                </View>
            </View>
        </View>
    );
}