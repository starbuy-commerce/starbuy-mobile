import { useCookies } from "react-cookie";
import User from "./User";

const UserStorage = (function() {

    function getUser(): User {
        return {
            birthdate: getBirthdate(),
            city: getCity(),
            email: getEmail(),
            name: getName(),
            profile_picture: getPfp(),
            registration: getRegistration(),
            seller: isSeller(),
            username: getUsername(),
        }
    }

    function isSeller(): boolean {
        return localStorage.getItem("isSeller") == "true" ? true : false;
    }

    function setSeller(seller: boolean) {
        localStorage.setItem("seller", seller + "");
    }

    function getRegistration(): string {
        return localStorage.getItem("registration") + "";
    }

    function getName(): string {
        return localStorage.getItem("name") + "";
    }

    function getEmail(): string {
        return localStorage.getItem("email") + "";
    }

    function getUsername(): string {
        return localStorage.getItem("username") + "";
    }

    function getPfp(): string {
        return localStorage.getItem("profile_picture") + "";
    }

    function getCity(): string {
        return localStorage.getItem("city") + "";
    }

    function getBirthdate(): string {
        return localStorage.getItem("birthdate") + ""; 
    }

    function setName(name: string) {
        localStorage.setItem("name", name);
    }

    function setEmail(email: string) {
        localStorage.setItem("email", email);
    }

    function setPfp(url: string) {
        localStorage.setItem("profile_picture", url);
    } 

    function setCity(city: string) {
        localStorage.setItem("city", city);
    }

    function setUsername(username: string) {
        localStorage.setItem("username", username);
    }

    function setBirthdate(birthdate: string) {
        localStorage.setItem("birthdate", birthdate);
    }

    function setRegistration(registration: string) {
        localStorage.setItem("registration", registration);
    }

    function clear() {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("profile_picture");
        localStorage.removeItem("city");
        localStorage.removeItem("username");
        localStorage.removeItem("birthdate");
        localStorage.removeItem("registration");
    }

    return {
        getRegistration: getRegistration,
        setRegistration: setRegistration,
        getName: getName,
        setName: setName,
        getUsername: getUsername,
        setUsername: setUsername,
        getEmail: getEmail,
        setEmail: setEmail,
        getBirthdate: getBirthdate,
        getPfp: getPfp,
        setPfp: setPfp,
        getCity: getCity,
        setCity: setCity,
        setBirthdate: setBirthdate,
        getUser: getUser,
      }
})();

export default UserStorage