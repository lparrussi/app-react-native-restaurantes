import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';

const ChangeDisplayNameForm = (props) => {

    const { displayName, setShowModal, toastRef, setRealoadUserInfo  } = props
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, seterror] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () =>{
        seterror(false);
        if(!newDisplayName) {
            seterror("El nombre no puede estar vacio.")
        }else if(displayName === newDisplayName){
            seterror("El nombre no puede ser igual al actual.")
        }else{
            setIsLoading(true);
            const update = {
                displayName: newDisplayName
            };

            firebase
            .auth()
            .currentUser
            .updateProfile(update)
            .then(() => {
                setIsLoading(false);
                setShowModal(false);
                setRealoadUserInfo(true);
            })
            .catch(() => {
                seterror("Error al actualizar el nombre");
                setIsLoading(false);
            });
        }
    }

    return ( 
        <View styles={styles.view}>
           <Input
                placeholder="Nombre y apellidos"
                constainerStyles={styles.input}
                rightIcon={{
                    type:"material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
                defaultValue={displayName || ""}
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
                />

            <Button
                title="Cambiar nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}/>
        </View>
     );
}

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