import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import defaultAvatar from '../../../assets/img/avatar-default.jpg'
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePiker from 'expo-image-picker';
import { update } from 'lodash';

const InfoUser = (props) => {

    const { userInfo:{photoURL, displayName, email, uid,toastRef },
            setLoading, setLoadingText } = props;

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        const resultPermissionCamara = resultPermission.permissions.mediaLibrary.status;

        if (resultPermissionCamara === "denied"){
            toastRef.current.show("Es necesario aceptar los permisos")
        };

        const result = await ImagePiker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,3]
        })

        if(result.cancelled){
            toastRef.current.show("Has cerrado la seleccion de imagenes");
        } else {
            upLoadImage(result.uri).then(() => {
                upDatePhotoUpdate()
               
            }) .catch(() => {
                toastRef.current.show("Error al actualizar el avatar")
            });
        };
    };

    const upLoadImage = async (uri) => {
        setLoadingText("actualizando Avatar");
        setLoading(true);

        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`avatar/${uid}`);
        return ref.put(blob);
    };

    const upDatePhotoUpdate = () => {
        firebase
        .storage().
        ref(`avatar/${uid}`)
        .getDownloadURL()
        .then(async response => {
            const update = {
                photoURL: response
            };
            await firebase.auth().currentUser.updateProfile(update);
            setLoading(false);
        })
        .catch(() => {
            toastRef.current.show("Error al actualizar el avatar")
        })
    }


    return ( 
        <View style={styles.viewUserInfo}>
           <Avatar rounded
           size={120}
           showEditButton
           onEditPress={changeAvatar}

           source={photoURL ? { uri: photoURL} : defaultAvatar}
           containerStyle={styles.infoAvatar}
            />

        
        <View styles={styles.viewUserInfoDisplay}>
            <Text style={styles.displayName}>{displayName ? displayName : "Anonimo"}</Text>
            <Text style={styles.displayEmail}>{email ? email : "Social login"}</Text>
        </View>
        </View>
     );
}
 
export default InfoUser;

const styles = StyleSheet.create({
    viewUserInfo:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#f2f2f2",
        paddingTop: 10,
        paddingBottom: 30,
        
       
    },

    viewUserInfoDisplay:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },

    infoAvatar: {
        marginRight: 20,
        
    },


    displayName: {
        fontSize: 25 ,
        fontWeight: "bold",
    },

    displayEmail: {
        display:"flex",
        color:"#888888",
        justifyContent:"center"
        
    }
})