import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native' 
import Toast from 'react-native-easy-toast-types';

import LoginForm from '../../Components/Account/LogingForm';

const Login = () => {

    const toastRef = useRef();

    return ( 
        <ScrollView>
           <Image 
                source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                resizeMode="contain"
                style={style.logo}
           />

           <View style={style.viewContainer}>
               <LoginForm toastRef={toastRef} />
               <CreateAcount/>
           </View>
           <Divider style={style.divider}/>
           <Text style={style.textRegister}>Social logo</Text>
           <Toast
                ref={toastRef}
                position="center"
                opacity={0.9}
           />
        </ScrollView>
     )
};

function CreateAcount() {

    const navigation = useNavigation();

    return (
        <Text style={style.textRegister}>
            ¿Aún no tienes una cuenta?{" "}
            <Text
                style={style.btnRegister}
                onPress={() => navigation.navigate("register") }>
                Regístrarse
            </Text>
        </Text>
    )
}


const style = StyleSheet.create({

    logo:{
        width: "100%",
        height: 150,
        marginTop:20
    },

    viewContainer:{
        margin: 20,
    },

    textRegister:{
        marginTop: 15,
        marginLeft: 10,
        marginRight:10
    },

    btnRegister:{
        color: "#00a680",
        fontWeight: "bold",
    },

    divider:{
        backgroundColor:"#00a680",
        margin:40
    }


})
 
export default Login;