import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import UserStorage from "../../model/UserStorage";
import Navbar from "../Navbar";
import { proxied_host } from "../../api/spec"

export default function Settings() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pfp, setPfp] = useState("")
    const [cookies, setCookie] = useCookies();
    const [addresses, setAddresses] = useState("")

    useEffect(() => {
        fetch(proxied_host + 'user/' + UserStorage.getUsername(), {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then(response => response.json())
        .then(json => {
            setPfp(json.profile_picture)
            setName(json.name);
            setEmail(json.email);
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetch(proxied_host + 'address', {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*',
                'Authorization:': "Bearer " + cookies.access_token
            },
        })
        .then(response => response.json())
        .then(json => setAddresses(json))
        .catch(err => console.log(err))
    }, [])

    return (
        <>
        <Navbar fixed={true} bottomBar={true}/>
        <div className="flex relative ml-20 mt-32">
            <div className="font-inter">
                <p className="font-normal mb-1">Nome:</p>
                <input spellCheck="false" type="text" placeholder={name} className="p-1 border-[1px] border-purple-600 rounded-lg w-96 outline-none"/>
            </div>
            <div className="ml-20 font-inter">
                <p className="font-normal text-gray-800 mb-1">E-mail:</p>
                <input spellCheck="false" type="text" placeholder={email} className="text-gray-600 p-1 border-[1px] border-purple-600 rounded-lg w-96 outline-none"/>
            </div>
        </div>
        </>
    )
}