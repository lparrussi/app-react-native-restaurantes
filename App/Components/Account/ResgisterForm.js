import React, {useState} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../Utils/Validation';
import Loading from '../Loading';

import { isEmpty } from 'lodash';
import * as firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

const RegisterForm = (props) => {

    const { toastRef } = props;
    
    const [ showPassword, setShowPasswprd] = useState(false);
    const [ showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [ formData, setFormData] = useState(defaultFormValue());
    const [ loading, setLoading ] = useState(false);
 
    const navigation = useNavigation();

    const onSubmit = () => {

         // Verificar si todos los campos estan completos
        if( isEmpty(formData.email) || 
            isEmpty(formData.password) || 
            isEmpty(formData.repeatPassword)
        ) {
            toastRef.current.show("Todos los campos son obligatorios");
        }
        
        // Verificar si es un email valido
        else if (!validateEmail(formData.email)){
            toastRef.current.show("El email es incorrecto"); 

        }
        // Verificar que la password sea mayor a 6 caracteres
        else if(formData.password.length < 6 ){
            toastRef.current.show("La contraseña debe ser de al menos 6 caracteres");
        }
        
        //Verificar si las passwords coinciden
        else if(formData.password !== formData.repeatPassword) {
            toastRef.current.show("Las contraseñas no coinciden");
        }else{
            setLoading(true)
            firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                setLoading(false)
                navigation.navigate("account")
                
            })
            .catch(() => {
                setLoading(false)
                toastRef.current.show("El email ya esta en uso")
            })
        };
        
    };

    const onChange = (e, type) => {
        setFormData({...formData, [type] : e.nativeEvent.text })
    };

    return ( 
        <ScrollView containerStyle={style.formContainer}>
            <Input
                onChange={e => onChange(e, "email")} 
                placeholder="Email"
                containerStyle={style.inputForm}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name="at"
                        iconStyle={style.iconRight}
                    />
                }/>
            <Input
                placeholder="Password"
                password={true}
                secureTextEntry={showPassword ? false : true}
                containerStyle={style.inputPassword}
                onChange={e => onChange(e, "password")} 
                rightIcon={
                    <Icon
                        onPress={() => setShowPasswprd(!showPassword)}
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={style.iconRight}
                    />
                }
                />
             <Input
                placeholder="Confirm password"
                password={true}
                secureTextEntry={showRepeatPassword ? false : true}
                containerStyle={style.inputPassword}
                onChange={e => onChange(e, "repeatPassword")}
                rightIcon={
                    <Icon
                        onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                        type="material-community"
                        name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={style.iconRight}
                    /> }
            />  

            <Button 
                title="Sing in"
                containerStyle={style.btnContainer}
                buttonStyle={style.btnRegister}
                onPress={onSubmit}
            />

            <Loading 
                isVisible={loading}
                text="Creando cuenta"
                />
                
        </ScrollView>
     );
}

function defaultFormValue (){
    return{
        email:"",
        password: "",
        repeatPassword: "",
    }
};

const style = StyleSheet.create({
    formContainer:{
        flex:1,
        justifyContent:"center",
        textAlign:"center",
        marginTop:30
    },

    inputForm:{
        width:"100%",
        marginTop:20
    },

    inputPassword:{
        width:"100%",
        marginTop:50
    },

    btnContainer:{
        marginTop:20,
        width:"95%",
    
    },

    btnRegister:{
        backgroundColor:"#00a680"
    },

    iconRight:{
        color:"#c1c1c1"
    }

})
 
export default RegisterForm;