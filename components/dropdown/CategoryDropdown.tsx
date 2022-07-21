import { connect } from "http2";
import React, { Component, useState } from "react";
import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import tw from 'twrnc';

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

export default function  CategoryDropdown() {
  const ref = React.useRef(null);
  const [isActive, setActive] = useState(false);
  const onClick = () => setActive(!isActive);

  return (
    <View style={tw`mb-20 flex justify-center cursor-pointer`}>
      <ul style={tw`z-10 absolute`}>
        <li>
          <View style={tw`${isActive? "rounded-bl-none rounded-br-none border-b-transparent" : "rounded-br-md rounded-bl-md"} w-60 p-2 rounded-md flex border-[1px] bg-white border-gray-700`} onPress={(onClick)} ref={ref}>
            <span style={tw`text-gray-700 font-inter`}>Selecione uma categoria</span>
            {!isActive && <svg style={tw`my-auto ml-2 fill-gray-700" width="16" height="16" viewBox="0 0 24 24"`}><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>}
            {isActive && <svg style={tw`rotate-180 my-auto ml-2 fill-gray-700" width="16" height="16" viewBox="0 0 24 24"`}><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>}
          </View>
          <View style={tw`${isActive ? "visible" : "invisible"} flex flex-col`}>
            {elements.map((element, index) => {
              return (
                <View style={tw`"border-b-[1px] rounded-bl-md rounded-br-md" :  p-2 bg-white w-60 border-l-[1px] border-r-[1px] border-gray-700 hover:border-l-4 hover:border-purple-600 hover:bg-yellow-100`} onPress={() => window.location.href = "/category/" + element.id}>
                  <Text style={tw`text-gray-700 font-inter`}>{element.name}</Text>
                </View>
              )
            })}
          </View>
        </li>
      </ul>
    </View>
  )
}