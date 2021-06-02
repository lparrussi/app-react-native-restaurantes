import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import { validateEmail } from '../../Utils/Validation';
import { reauthenticate } from '../../Utils/api';

const ChangeDisplayNameForm = (props) => {

    const { email, setShowModal, toastRef, setRealoadUserInfo  } = props;
    const [formData, setFormData] = useState(defaultValue());
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const onSubmit = () =>{
       
        if(!formData.email || email === formData.email) {
            setError({email:"El Email no ha cambiado."})
        }
        else if(!validateEmail(formData.email)){
            setError({
                email: "Email incorrecto"
            })
        }
        else if(!formData.password){
            setError({
                password: "La contraseña debe coincidir con la actual"
            })
        }
        else{
            setIsLoading(true);
            reauthenticate(formData.password).then(() => {
                firebase
                .auth()
                .currentUser.updateEmail(formData.email)
                .then(() => {
                    setIsLoading(false);
                    setRealoadUserInfo(true);
                    toastRef.current.show("Email actualizado correctamente");
                    setShowModal(false);
                })
                .catch(() => {
                    setError({ email: "Error al actualizar el email."})
                    setIsLoading(false);
                })
            })
            .catch(() => {
                setError({ password: "La contraseña no es correcta."})
            })
        }
    };

    return ( 
        <View styles={styles.view}>
           <Input
                placeholder="Cambiar Email"
                constainerStyles={styles.input}
                errorMessage={error.email}
                rightIcon={{
                    type:"material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
                defaultValue={email || ""}
                onChange={(e) => onChange(e, "email")}
                
                />
            <Input
                password={true}
                placeholder="Confirmar password"
                constainerStyles={styles.input}
                onChange={(e) => onChange(e, "password")}
                secureTextEntry={showPassword ? false : true}
                errorMessage={error.password}
                rightIcon={{
                    type:"material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
            />

            <Button
                title="Cambiar Email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={(e) => onSubmit(e, "password")}
                loading={isLoading}/>
        </View>
     );
};

function defaultValue() {
    return{
        email:"",
        password:""
    }
};

const styles = StyleSheet.create({
    view: {
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10
    },

    input:{
        marginBottom:10
    },

    btnContainer:{
        marginTop:20,
        width:"95%"
    },

    btn:{
        backgroundColor:"#00a680"
    }
})
 
export default ChangeDisplayNameForm;