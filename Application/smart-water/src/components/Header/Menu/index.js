import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import styles from "./style";
import MenuButton from "./MenuButton";
import { BASE_URL } from '../../../config/config';

function Menu(){
    const [menuOpen, setMenuOpen] = React.useState(false);
    const navigation = useNavigation();

    const logout = async () => {
        try{
            await axios.get(`${BASE_URL}/logout`);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login'}]
            })
            navigation.navigate('Login');
        }catch(error){
            console.log(error);
        }
    }

    return(
        <View>
            <View style={menuOpen ? styles.menu : styles.menuClose}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => {setMenuOpen(false)}}>       
                        <Text style={styles.menuItensText}><AntDesign name="menufold" size={18} color='#0099FF'/> Fechar Menu</Text>
                    </TouchableOpacity>
                </View>
                <MenuButton type="Entypo" name="circular-graph" destination="Dashboard" text="Dashboard"/>
                <MenuButton type="SimpleLineIcons" name="speedometer" destination="Devices" text="Dispositivos"/>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={logout}>       
                        <Text style={styles.menuItensText}><AntDesign name="logout" size={18} color='#0099FF'/> Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {setMenuOpen(true)}}>
                    <Icon name="menu" size={32} color={'white'}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Menu;