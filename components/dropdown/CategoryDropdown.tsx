//import { connect } from "http2";
import React, { Component, useState } from "react";
import { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Svg, { Path, SvgXml } from "react-native-svg";
import tw from 'twrnc';
import Unorderedlist from 'react-native-unordered-list';

type Props=
{
  navigation:any;
}

const elements = [
  {
    name: "Eletrônicos",
    id: 1,
  },
  {
    name: "Vestuário",
    id: 2
  },
  {
    name: "Livros",
    id: 4
  },
  {
    name: "Música",
    id: 7
  },
  {
    name: "Casa",
    id: 3
  },
]

export default function  CategoryDropdown({navigation }: Props) {
  const ref = React.useRef(null);
  const [isActive, setActive] = useState(false);
  const onClick = () => setActive(!isActive);
  
  const setacima = require('../../images/iconmonstr-arrow-65.png')
  const setabaixo = require('../../images/iconmonstr-arrow-56.png')

  return (
    <View style={tw`mb-20 flex justify-center cursor-pointer`}>
      <Unorderedlist style={tw`z-10 absolute`}>
        <View>
          <TouchableOpacity onPress={(onClick)} ref={ref}>
          <View style={tw`${isActive? "rounded-bl-none rounded-br-none border-b-transparent" : "rounded-br-md rounded-bl-md"} w-60 p-2 rounded-md flex border-[1px] bg-white border-gray-700`}>
            <View style={tw`text-gray-700 font-inter`}>Selecione uma categoria</View>
            {!isActive && <Image source={setacima}></Image>}
            {isActive && <Image source={setabaixo}></Image>}
          </View>
          </TouchableOpacity>
          <View style={tw`${isActive ? "visible" : "invisible"} flex flex-col`}>
            {elements.map((element, index) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate("/category/" + element.id)}>
                <View style={tw`"border-b-[1px] rounded-bl-md rounded-br-md" :  p-2 bg-white w-60 border-l-[1px] border-r-[1px] border-gray-700 hover:border-l-4 hover:border-purple-600 hover:bg-yellow-100`} >
                  <Text style={tw`text-gray-700 font-inter`}>{element.name}</Text>
                </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </Unorderedlist>
    </View>
  )
}