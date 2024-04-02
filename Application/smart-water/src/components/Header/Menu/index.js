import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

function Menu(){
    return(
        <View style={{ marginLeft: 5, marginBottom: 'auto', marginTop: 'auto' }}>
            <Icon name="menu" size={32} color={'white'}/>
        </View>
    )
}

export default Menu;