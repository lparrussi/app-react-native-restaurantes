import React, { useState , useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast-types';
import * as firebase from 'firebase';

import Loading from '../../Components/Loading';
import InfoUser from '../../Components/Account/InfoUser';
import AccountOptions from '../../Components/Account/AccountOptions';


const UserLogged = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const toastRef = useRef();

    useEffect(() => {
      (async () => {
          const user = await firebase.auth().currentUser;
          setUserInfo(user);
      })()
    }, []);

    return ( 
        <View style={styles.viewUserInfo}>
            {userInfo && <InfoUser 
                            userInfo={userInfo} 
                            toastRef={toastRef}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
                            />}
            
            <AccountOptions/>


            <Button 
                title="Cerrar sesión"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionText}
                onPress={() => firebase.auth().signOut()}
                />

            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading 
                text={loadingText} 
                isVisible={loading}
            />
        </View>
     );
}
 
export default UserLogged;

const styles = StyleSheet.create({
    viewUserInfo:{
        minHeight: "100%",
        backgroundColor: "#f2f2f2",
        padding:10
    },

    btnCloseSession: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth:1,
        borderTopColor:"#e3e3e3",
        borderBottomWidth:1,
        borderBottomColor:"#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10
    },

    btnCloseSessionText: {
        color: "#00a680"
    }
})