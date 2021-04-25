import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { map } from 'lodash';

const AccountOptions = (props) => {

    const { userInfo, toastRef} = props;
    const menuOptions = generateOptions()

    return (
        <View>
            {map(menuOptions, (menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}/> 
            ))}
        </View>
     );
}

function generateOptions () {
    return [
        {
            title:"Cambiar Nombre y Apellidos"
        },
        {
            title: "Cambiar Email"
        },
        {
            title:"Cambiar contraseña"
        }
    ]
} 
 
export default AccountOptions;