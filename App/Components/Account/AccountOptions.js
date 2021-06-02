import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { map } from 'lodash';
import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

const AccountOptions = (props) => {

    const { userInfo, toastRef, setRealoadUserInfo} = props;
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const selectComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setRealoadUserInfo={setRealoadUserInfo} />)
                setShowModal(true);
                break;

            case "email":
                setRenderComponent( <ChangeEmailForm
                    email={userInfo.email}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setRealoadUserInfo={setRealoadUserInfo} />)
                setShowModal(true)
               
                setShowModal(true);
                break;
            
            case "password":
                setRenderComponent( <ChangePasswordForm
                    password={userInfo.password}
                    setShowModal={setShowModal}
                    toastRef={toastRef}/>)
                setShowModal(true)
                break;
               
            default: 
                setRenderComponent(null);
                setShowModal(false);
                break;
        }
    };
    const menuOptions = generateOptions(selectComponent);

    return (
        <View style={styles.viewStyle}>
            {map(menuOptions, (menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{ 
                        name: menu.iconNameLeft,
                        type: menu.iconType,
                        color: menu.iconColorLeft,
                        iconNameRight: menu.iconNameRight,
                        
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight
                    }}
                    containerStyle={styles.menuItem}
                    onPress={menu.onPress}
                    /> 
            ))}
            {renderComponent && (
                 <Modal isVisible={showModal} setIsVisible={setShowModal}>{renderComponent}</Modal>
            )}
        </View>
     );
}

function generateOptions (selectComponent) {
    return [
        {
            title:"Cambiar Nombre y Apellidos",
            iconType: "material-community",
            iconNameLeft:"account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("displayName")
        },
        {
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft:"at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("email")
        },
        {
            title:"Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft:"lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("password")
        }
    ]
} 

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth:1,
        borderBottomColor: "#e3e3e3"
    },

    viewStyle:{
       
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#00a680",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    }
})
 
export default AccountOptions;