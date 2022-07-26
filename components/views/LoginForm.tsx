import { View, Text, Image, Linking} from "react-native";
import tw from 'twrnc';
import { Component } from 'react';
import { useEffect, useState } from 'react';
import UserStorage from '../../model/UserStorage';
import { proxied_host } from "../../api/spec"
import { AuthResponse, login } from '../../api/user';
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-paper";

export default function LoginForm() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("")
    const shopping=require('../../images/shopping.jpg')    

    function handleUsernameChange(event: { target: HTMLInputElement; }) {
        setUsername
    }

    function handlePasswordChange(event: { target: HTMLInputElement; }) {
        setPassword
    }

    const handleLogin = () => {
        if(username === "" || password === "")  {
            setError("Digite suas credenciais");
            return
        }

        login({password: password, username: username}, (resp: AuthResponse) => {
            if (!resp.status) {
                setError(resp.message);
                setPassword("");
                setUsername("");
            } else {
                UserStorage.setEmail(resp.user.email);
                UserStorage.setUsername(resp.user.username);
                UserStorage.setName(resp.user.name);
                UserStorage.setCity(resp.user.city);
                UserStorage.setPfp(resp.user.profile_picture);
                
                setError("");
            }
        })
    }

    return (
        <>
            <View style={tw`md:flow-root`}>
                <View style={tw`md:h-screen bg-white md:float-left`}>
                    <View style={tw`m-4 md:m-28 md:mt-20`}>
                        <View>
                            <View>
                                <View style={tw`font-rubik font-extrabold text-3xl md:text-4xl text-gray-800`}>Bem-vindo de volta<br /></View>
                                <View style={tw`font-rubik font-bold text-3xl md:text-4xl text-gray-800`}>a </View>
                                <View style={tw`font-rubik font-extrabold text-5xl md:text-6xl text-purple-600}`}>Starbuy!</View>
                            </View>
                            <Text style={tw`font-rubik font-bold md:max-w-lg text-sm text-gray-600 mt-16`}>Faça login com a sua conta. Não tem uma?
                                <Text  style={tw`text-yellow-500` } onPress={() => { Linking.openURL('');} }> Registre-se</Text>
                            </Text>
                            <Text nativeID="error" style={tw`font-rubik font-bold md:max-w-lg text-sm text-rose-600 mt-4`}>
                                {error}
                            </Text>

                            <View /*nativeID="loginForm"*/ style={tw`mt-10`}>
                                <TextInput style={tw`login-input`} value={username} placeholder="Digite seu username" onChange={handleUsernameChange}/>
                                {'\n'} {'\n'}
                                <TextInput style={tw`login-input`} value={password} /*type="password"*/ placeholder="Senha" onChange={handlePasswordChange} />
                                <View style={tw`mt-4`}>
                                    <Text onPress={() => { Linking.openURL('');} } style={tw`text-yellow-500 text-sm font-bold text-right`}>Esqueceu sua senha?</Text>
                                </View>
                                {'\n'}{'\n'}
                                <Button onPress={handleLogin} style={tw`w-full text-white font-bold py-2 px-4 rounded-full bg-purple-700 hover:bg-indigo-700 transition duration-500 ease-in-out`}>
                                    Entrar
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={tw`md:h-screen md:float-right md:mr-20`}>
                    <img src={shopping} style={tw`md:w-full md:h-full`} alt="" />
                </View>
            </View>
        </>

    );
}