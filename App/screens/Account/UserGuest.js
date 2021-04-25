import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'


const UserGuest = () => {

    const navigation = useNavigation();
   
    return ( 
        <ScrollView style={styles.viewBody} centerContent={true}>
            <Image style={styles.image}
                source={require("../../../assets/img/user-guest.jpg")}
                resizeMode="contain"
            />
            <Text style={styles.title}>Consulta tu perfil de 5 Tenedores</Text>
            <Text style={styles.description}>
                ¿Como describirias tu mejor restaurante? Busca y visualiaza
                los mejores restaurantes de una forma sencilla, vota cual te 
                ha gustadoo más y comenta como ha sido tu experiencia
            </Text>

            <View style={styles.viewBtn}>
                <Button
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    title="Ver tu perfil"
                    onPress={() => navigation.navigate("login")}
                />
            </View>
        </ScrollView>
     );
};

const styles = StyleSheet.create({
    viewBody:{
        margin: 30
    },

    image:{
        height:300,
        width:"100%",
        marginBottom:40
    },

    title:{
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center"
    },

    description:{
        textAlign: "center",
        marginBottom: 20
    },

    viewBtn:{
        flex: 1,
        alignItems:"center"
    },

    btnStyle:{
        backgroundColor:"#00a680"
    },

    btnContainer:{
        width:"50%"
    }
})
 
export default UserGuest;