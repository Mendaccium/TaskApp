import React, { useEffect, useState } from "react";
import {
    View, 
    Text, 
    SafeAreaView, 
    TouchableOpacity, 
    FlatList 
} from "react-native";
import firebase from "../../config/firebaseconfig";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";

export default function Task({ navigation, route }){
    const [ task, setTask ] = useState([])
    const database = firebase.firestore()
    
    function logout(){
        firebase.auth().signOut().then(() => {
            navigation.navigate("Login");
          }).catch((error) => {
            
          });
          
    }

    function deleteTask(id){
        database.collection(route.params.idUser).doc(id).delete()
    }

    useEffect(() =>{
        database.collection(route.params.idUser).onSnapshot((query) =>{
            const list = []
            query.forEach((doc) =>{
                list.push({...doc.data(), id: doc.id })
                
            })
            setTask(list)
        })
    }, [])
    return(
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator = {false}
                data = {task}
                renderItem = {( { item } ) => {
                    return(
                    <View style = {styles.Tasks}>
                        <TouchableOpacity style
                            style={styles.deleteTask}
                            onPress = { () => deleteTask(item.id)}
                        >
                        <FontAwesome
                            name = "star"
                            size = {23}
                            color = "#F92e6a"
                        >

                        </FontAwesome>
                        
                        </TouchableOpacity>
                        <Text
                            style = {styles.DescriptionTask}
                            onPress = {() => {
                                navigation.navigate("Details",{
                                    id: item.id,
                                    description: item.description,
                                    idUser: route.params.idUser
                                })
                            }}
                        >
                            {item.description}
                            
                        </Text>
                        
                    </View>
                    )
                }}
            />
            <TouchableOpacity
             style={styles.buttonNewtask}
             onPress = { () => navigation.navigate("NewTask", { idUser: route.params.idUser })}
             >
             
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {styles.buttonLogout}
                onPress = { () => { logout() }}
            >
                <Text style = {styles.iconButtonLogout}>
                    <MaterialCommunityIcons
                        name = "location-exit"
                        size = {23}
                        color = "#F92E6A"
                    />
                </Text>
            </TouchableOpacity>
        </View>
    )
}