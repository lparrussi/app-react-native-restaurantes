import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native';
import AddRestaurant from '../../screens/restaurants/AddRestaurant';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { map, size, filter } from 'lodash';

const AddRestaurantForm = (props) => {

    const { toastRef, setIsLoading, navigation } = props;
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const [restaurantDescription, setDescription] = useState("");
    const [imageSelected, setImageSelected] = useState([]);

    const addRestaurant = () => {
        console.log(restaurantName)
        console.log(restaurantAddress)
        console.log(restaurantDescription);
        console.log(imageSelected);
    }
    return ( 
        <ScrollView style={styles.scrollView}>
           <FormAdd
                setRestaurantAddress={setRestaurantAddress}
                setRestaurantName={setRestaurantName}
                setDescription={setDescription}
           />
           <UpLoadImage 
                toastRef={toastRef}
                setImageSelected={setImageSelected}
                imageSelected={imageSelected}
           />
           <Button
                title="Crear restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
           />
        </ScrollView>
     );
}


function FormAdd(props){

    const { setDescription, setRestaurantAddress, setRestaurantName } = props;

    return(
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del restaurante"
                containerStyle={styles.input}
                onChange={e => setRestaurantName(e.nativeEvent.text)}
            />
            <Input
                placeholder="Dirección"
                containerStyle={styles.input}
                onChange={e => setRestaurantAddress(e.nativeEvent.text)}
            />
            <Input
                placeholder="Descripción del restaurant"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={e => setDescription(e.nativeEvent.text)}
            />
        </View>
    )
};

function UpLoadImage(props){

    const { toastRef, setImageSelected, imageSelected } = props;

    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.MEDIA_LIBRARY
        );

        if(resultPermissions === 'denied'){
            toastRef.current.show("Es necesario obtener los permisos de la galeria", 3000)
        }else{
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect: [4,3]
            });
            
          if(result.cancelled){
              toastRef.current.show("No has seleccionado ninguna imagen", 2000)
          } else {
            setImageSelected([...imageSelected ,result.uri])
          }
        }
    }

    const removeImage = (image) => {
        const arrayImages = imageSelected;

        Alert.alert(
            "Eliminar imagen",
            "Estas seguro de que quieres eliminar la imagen?",
            [
                {
                    text:"Cancel",
                    style: "Cancel"
                },
                {
                    text:"Eliminar",
                    onPress: () => {
                       setImageSelected(
                        filter(arrayImages, (imageUrl) => imageUrl !== image)
                       ) 
                    }
                }
            ],
            { cancelable:false}
        )
    }

    return(
        <View style={styles.viewImage}>
            {size(imageSelected) < 5 && (
                <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={imageSelect}
            />
            )}
        {map(imageSelected, (imageRestaurant, index) => (
            <Avatar 
                key={index}
                style={styles.miniatureStyle}
                source={{ uri: imageRestaurant }}
                onPress={() => removeImage(imageRestaurant)}
            />
        ))}
    </View>
    )
    
}

const styles = StyleSheet.create({
    scrollView:{
        height:"100%",

    },
    viewForm:{
        marginLeft:10,
        marginRight:10
    },
    input:{
        marginBottom:10
    },
    textArea:{
        height:100,
        width:"100%",
        padding:0,
        margin:0,
    },
    btnAddRestaurant:{
        backgroundColor:"#00a680",
        margin: 20
    },

    viewImage:{
        flexDirection: 'row',
        marginLeft:20,
        marginRight:20,
        marginTop:30
    },

    containerIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"
    },
    miniatureStyle:{
        width:70,
        height:70,
        marginRight:10
    }
});


export default AddRestaurantForm;