import React from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';

import { AppContext } from "../../contexts/AppContext";
import styles from "./style";
import Menu from "./Menu";

function Header(props){
    const { user, setUser } = React.useContext(AppContext);
    const navigation = useNavigation();

    const goToCreateDevice = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'AddDevice'}]
        })
        navigation.navigate('AddDevice');
    }

    return(
        <View style={styles.container}>
            <Menu/>
            <Text style={styles.textName}>{props.title ? props.title : user.name}</Text>
            <TouchableOpacity onPress={goToCreateDevice}>
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Header;