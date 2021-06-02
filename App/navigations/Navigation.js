import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import RestaurantStack from './RestaurantStack'
import FavoriteStack from './FavoriteStack'
import TopRestaurantStack from './TopRestaurantStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return ( 
        <NavigationContainer>
            <Tab.Navigator 
              initialRouteName="restaurants"
              tabBarOptions={{
                  inactiveTintColor:"#646464",
                  activeTintColor: "#00a680",
                  keyboardHidesTabBar: true,
              }}
              screenOptions={({ route }) => ({
                  tabBarIcon: ({ color }) => screenOptions(route, color)
              })}
              >
                <Tab.Screen 
                    name="restaurants" 
                    component={RestaurantStack} 
                    options={{ title:"Restaurantes" }}
                />
                <Tab.Screen 
                        name="top-restaurants" 
                        component={TopRestaurantStack} 
                        options={{ title:"Top 5"}}
                />
                <Tab.Screen 
                        name="search" 
                        component={SearchStack} 
                        options={{ title:"Buscar"}}
                />
                <Tab.Screen 
                        name="favorites" 
                        component={FavoriteStack} 
                        options={{ title:"Favoritos"}}
                />
                <Tab.Screen 
                    name="account" 
                    component={AccountStack} 
                    options={{ title:"Cuenta"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
     );
}
 
export default Navigation;

function screenOptions(route, color) {
    let iconName;


    switch (route.name) {
        case "restaurants": 
              iconName = "storefront-outline";
        break;

        case "top-restaurants": 
              iconName = "star-outline";
        break;

        case "search": 
              iconName = "magnify";
        break;
        
        case "favorites": 
              iconName = "heart-outline";
        break;

        case "account": 
              iconName = "account-outline";
        break;
        default:
            break;
    }
    return(
        <Icon 
            type="material-community" name={iconName} size={25} color={color}
        />
    )
}