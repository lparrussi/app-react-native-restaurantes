import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Restaurants from '../screens/restaurants/Restaurants'
import AddRestaurant from '../screens/restaurants/AddRestaurant';

const Stack = createStackNavigator();

const RestaurantStack = () => {
    return ( 
        <Stack.Navigator>
            <Stack.Screen
                name="restaurants"
                component={Restaurants}
                options={{title:"Restaurantes "}}
            />
            <Stack.Screen
                name="add-restaurant"
                component={AddRestaurant}
                options={{ title: "Añadir nuevo restaurant" }}
            />
        </Stack.Navigator>
     );
}
 
export default RestaurantStack;