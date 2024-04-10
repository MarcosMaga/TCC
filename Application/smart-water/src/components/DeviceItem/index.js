import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

import CustomIcon from "../CustomIcon";
import styles from "./style";
import { BASE_URL } from "../../config/config";

function DeviceItem(props){
    const navigation = useNavigation();

    const handleDeleteDevice = async (device) => {
        try{
            const response = await axios.delete(`${BASE_URL}/devices/${device}`);
        }catch(error){
            console.log(error);
        }finally{
            navigation.reset({
                index: 0,
                routes: [{ name: 'Devices'}]
            })
            navigation.navigate('Devices');
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.deviceName} | {props.deviceId}</Text>
            <TouchableOpacity onPress={() => {handleDeleteDevice(props.id)}}>
                <CustomIcon type="FontAwesome" size={20} name="trash-o" color="tomato"/>
            </TouchableOpacity>
        </View>
    )
}

export default DeviceItem;