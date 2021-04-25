import React, {useRef} from 'react';
import { View, StyleSheet, Image } from 'react-native' ;
import Toast from 'react-native-easy-toast-types';

import RegisterForm from '../../Components/Account/ResgisterForm';



const Register = () => {

    const toastRef = useRef();

    return ( 
        <View>
           <Image source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                  resizeMode="contain"
                  style={style.logo}
           />

           <View style={style.viewForm}>
               <RegisterForm toastRef={toastRef}/>
           </View>
           <Toast 
                ref={toastRef}
                position="center"
                opacity={0.9}
           />
        </View>
     );
};

const style = StyleSheet.create({

    logo:{
        width:"100%",
        height: 150,
        marginTop: 20
    },

    viewForm:{
        marginRight: 40,
        marginLeft: 40
    },


});

export default Register;