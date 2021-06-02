import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-easy-toast-types';
import Loading from '../../Components/Loading';
import AddRestaurantForm from '../../Components/Restaurants/AddRestaurantForm'


const AddRestaurant = (props) => {

     const { navigation } = props;
     const toastRef = useRef();
     const [isLoading, setIsLoading] = useState(false);

    return ( 
        <View>
             <AddRestaurantForm
               toastRef={toastRef}
               setIsLoading={setIsLoading}
               navigation={navigation}
             />
             <Toast toastRef={toastRef} position="center" opacity={0.5} />
             <Loading isVisible={isLoading} text="Creando restaurante" />
        </View>
     );
};


 const styles = StyleSheet.create({
     
 }) 

export default AddRestaurant;