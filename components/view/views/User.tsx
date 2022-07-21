import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserStorage from "../../model/UserStorage";
import Navbar from "../Navbar";
import { proxied_host } from "../../api/spec"

export default function User() {
    
    const [name, setName] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [profilePicture, setPfp] = useState<string>("")

    const {username} = useParams();
    const path = username == undefined ? UserStorage.getUsername() : "/" + username;

    useEffect(() => {
        fetch(proxied_host + 'user/' + path + "?includeItems=true", {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => response.json())
        .then(json => {
            console.log(json)
            setPfp(json.user.profile_picture);
            setName(json.user.name);
            setCity(json.user.city);
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Navbar fixed={false} bottomBar={false}/>
            <div className="w-full h-24 from-[#6366F1] via-[#6366F1] to-[#7ED8FF] bg-gradient-to-r relative visible">
                <div>
                    <p className="font-inter text-white absolute mt-8 ml-48 font-bold text-xl">
                        {name.toUpperCase()}
                    </p>
                    <p className="font-inter text-white absolute mt-16 ml-48 font-light text-sm">
                        {city.toUpperCase()}
                    </p>
                </div>
            </div>
            <img src={profilePicture} className="rounded-full border-yellow-400 border-4 w-32 h-32 absolute top-32 ml-10"/>
        </div>
    )
} 