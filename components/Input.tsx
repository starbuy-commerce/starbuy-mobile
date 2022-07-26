import { View, TextInput } from "react-native";
import tw from 'twrnc';
import { useState } from 'react';

export default function Input({placeholder, w, h}: any) {
    const [value, setValue] = useState();

    return(
      <View>
        <TextInput value={value} onChange={(e: any) => setValue(e.target.value)} placeholder={placeholder} style={tw`border-[1px] rounded-md border-indigo-400 outline-none font-inter font-medium text-gray-700 p-3`}/>
      </View>  
    );
}