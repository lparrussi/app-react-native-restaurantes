import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import {  isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import { validateEmail } from '../../Utils/Validation';
import Loading from '../Loading';




const LoginForm = (props) => {

    const { toastRef } = props;

    const [ showPassword, setShowPasswprd] = useState(false);
    const [formData, setformData] = useState(defaultFormData());
    const navigation = useNavigation();
    const [loading, setloading] = useState(false);

    const onChange = (e, type) => {
        setformData({ ...formData, [type]: e.nativeEvent.text})
    }; 

    const onSubmit = () => {

        // Mostrar alerta si los campos estan vacios
        if (isEmpty(formData.email) || isEmpty(formData.password)){
            toastRef.current.show('Todos los campos son obligatorios')
        }

        // Validar email
        else if (!validateEmail(formData.email)) {
            toastRef.current.show("El email no es correcto")
        }else {
            setloading(true);
            firebase
            .auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                setloading(false);
                navigation.navigate('account') 
            })
            .catch(() => {
                toastRef.current.show("Email o contraseña incorrecta")
            })
        }

        
    };
    
    
    return ( 
        <View style={styles.formContainer}>

            <Input
                placeholder="Email"
                containerStyle={styles.inputForm}
                onChange={ (e) => onChange(e, "email")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />

            <Input
                placeholder="Password"
                containerStyle={styles.inputForm}
                secureTextEntry={!showPassword ? true : false}
                onChange={ (e) => onChange(e, "password")}
                password={true}
                rightIcon={
                    <Icon
                        onPress={() => setShowPasswprd(!showPassword)}
                        type="material-community"
                        name={!showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                    />
                }
            />
            
            <Button
                title="Log in"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnLogin}
                onPress={onSubmit}
            />

            <Loading 
                isVisible={loading} text="Iniciando sesión"
            />
            
        </View>
     );
};

function defaultFormData(){
    return {
        email:'',
        password:''
    }
};

const styles = StyleSheet.create({
    formContainer: {
        flex:1,
        alignItems:"center",
        justifyContent: "center",
        marginTop: 30
    },

    inputForm: {
        width:"100%",
        marginTop: 20
    },

    btnContainer:{
        marginTop:20,
        width:"95%"

    },

    btnLogin:{
        backgroundColor:"#00a680"
    },

    iconRight:{
        color:"#c1c1c1"
    }



})
 
export default LoginForm;