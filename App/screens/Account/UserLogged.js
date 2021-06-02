import React, { useState , useRef, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
    const [realoadUserInfo, setRealoadUserInfo] = useState(false);
    const toastRef = useRef();

    useEffect(() => {
      (async () => {
          const user = await firebase.auth().currentUser;
          setUserInfo(user);
      })()
      setRealoadUserInfo(false);
    }, [realoadUserInfo]);

    const shadowStyle = {
        shadowOpacity:1
    }

    return ( 
        <View style={styles.viewUserInfo}>
            {userInfo && <InfoUser 
                            userInfo={userInfo} 
                            toastRef={toastRef}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
                            />}
            <Text style={styles.misDatos}>Mis datos</Text>
            <AccountOptions 
                userInfo={userInfo}
                toastRef={toastRef}
                setRealoadUserInfo={setRealoadUserInfo}
            />


            <Button 
                title="Como salir de las drogas"
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
        padding:20,
        display: "flex",
        flexDirection: "column"
        
    },

    btnCloseSession: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopColor:"#e3e3e3",
        borderBottomWidth:1,
        borderBottomColor:"#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

    },

    btnCloseSessionText: {
        color: "#00a680"
    },

    misDatos:{
        fontWeight:"bold",
        fontSize: 20,
        display:'flex',
        alignItems:"flex-start",
        paddingBottom:15,
    }
})