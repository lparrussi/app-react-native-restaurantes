import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../Utils/firebase';
import firebase from 'firebase/app'

const Restaurants = (props) => {
    const [user, setUser] = useState(null);
    const { navigation } = props;

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo)
        })
    }, [])

    return ( 
        <View style={styles.viewBody}>
            <Text>Restaurantes...</Text>
            {user && <Icon
                type="material-community"
                name="plus"
                color="#00a680"
                reverse
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate("add-restaurant")}
            />}
        </View>
     );
}


const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },

    btnContainer: {
        position: "absolute",
        bottom: 10,
        right:10,
        shadowColor:"#000",
        shadowOffset: { 
            width: 0, 
            height: 5},
        shadowOpacity: 0.5,
        
    }
})
 
export default Restaurants;