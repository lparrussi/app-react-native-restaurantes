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
           size="large"
           showEditButton
           onEditPress={changeAvatar}

           source={photoURL ? { uri: photoURL} : defaultAvatar}
           containerStyle={styles.infoAvatar}
            />
        <View>
            <Text style={styles.displayName}>{displayName ? displayName : "Anonimo"}</Text>
            <Text style={styles.displayEmail}>{email ? email : "Social login"}</Text>
        </View>
        </View>
     );
}
 
export default InfoUser;

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30,
       
    },

    infoAvatar: {
        marginRight: 20
    },


    displayName: {
        fontWeight: "bold",
        paddingBottom:1
    }
})