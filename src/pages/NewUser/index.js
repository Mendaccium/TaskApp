import React, {useState, useEffect } from "react";
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
        
       } from "react-native";
import firebase from "../../config/firebaseconfig"
import styles from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function Login({ navigation }){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorRegister, setErrorRegister] = useState("");

    const registerFirebase = () => {


                firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            navigation.navigate("Task", { idUser: user.uid })
        })
        .catch((error) => {
            setErrorRegister(true);
            let errorCode = error.code;
            let errorMessage = error.message;
        });


    }

    useEffect(() =>{

    }, []);
    return(
        <KeyboardAvoidingView
            behavior= {Platform.OS === "ios" ? "padding" : "height"}
            style = {styles.container}
        >
            <Text style = {styles.title}>Create Account</Text>
            <TextInput
                style = {styles.input}
                placeholder = "Enter Your Email"
                type = "text"
                onChangeText = {(text) => setEmail(text)}
                value = { email }
            />
            <TextInput
                style = {styles.input}
                secureTextEntry = { true }
                placeholder = "Enter a Password"
                type = "text"
                onChangeText = {(text) => setPassword(text)}
                value = { password }
            />
            {errorRegister === true
            ?
            <View style = {styles.contentAlert}>
                <MaterialCommunityIcons
                    name = "alert-circle"
                    size = { 24 }
                    color = "#bdbdbd"
                />
                <Text style = {styles.warningAlert}>Invalid Email or Password</Text>
            </View>
            :
                <View/>
            }
            {email === "" || password === ""
            ?
                <TouchableOpacity
                    disabled = { true }
                    style = {styles.buttonRegister}
                >
                    <Text style = { styles.textButtonRegister}>Register</Text>
                </TouchableOpacity>
            :
            <TouchableOpacity
            style = {styles.buttonRegister}
            onPress = {registerFirebase}
            >
                <Text style = { styles.textButtonRegister}>Register</Text>
            </TouchableOpacity>
            }
            <Text style = {styles.login}> 
                Already Register?
                <Text 
                    style = {styles.linkLogin}
                    onPress = {() => navigation.navigate("Task")}
                >
                    Login
                </Text>
            </Text>
            <View style = {{height:100}}/>

        </KeyboardAvoidingView>
    )
}