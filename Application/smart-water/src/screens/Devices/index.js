import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

import Header from "../../components/Header";
import DeviceItem from "../../components/DeviceItem";
import { BASE_URL } from "../../config/config"
import styles from "./style";

function Devices(){
    const [devices, setDevices] = React.useState([]);
    const navigation = useNavigation();
    
    const handleGetDevices = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/devices`);
            setDevices(response.data);
        }catch(error){
            console.log(error);
        }
    }

    const goToAdd = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'AddDevice'}]
        })
        navigation.navigate('AddDevice');
    }

    React.useEffect(() => {
        handleGetDevices();
    }, []);

    return(
        <View>
            <Header title="Dispositivos"/>
            {devices && devices.map(device => (
                <DeviceItem key={device.deviceId} id={`${device.userId}_${device.deviceId}`} deviceId={device.deviceId} deviceName={device.deviceName}/>
            ))}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={goToAdd}>
                    <Text style={styles.textButton}>+ NOVO</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Devices;