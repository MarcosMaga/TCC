import React from "react";
import { View, TouchableOpacity, Text } from 'react-native';
import * as VectorIcons from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from "../style";

function MenuButton(props){
    const iconLibrary = VectorIcons[props.type];
    const navigation = useNavigation();

    const goTo = (destination) => {
        navigation.reset({
            index: 0,
            routes: [{ name: destination}]
        })
        navigation.navigate(destination);
    }

    if(!iconLibrary){
        console.warn('Biblioteca de vetor não existente');
        return null;
    }

    const Icon = iconLibrary.default || iconLibrary;
    
    if(!Icon){
        console.warn(`Ícone '${props.name}' não encontrado`);
        return null;
    }

    return(
        <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => {goTo(props.destination)}}>       
                <Text style={styles.menuItensText}><Icon name={props.name} size={23} color='#0099FF'/> {props.text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MenuButton;