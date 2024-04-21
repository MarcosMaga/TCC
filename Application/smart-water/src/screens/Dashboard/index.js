import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from 'socket.io-client';

import { AppContext } from "../../contexts/AppContext";
import Header from "../../components/Header";
import HorizontalLine from "../../components/HorizontalLine";
import styles from "./style";
import CustomIcon from "../../components/CustomIcon";
import { BASE_URL } from "../../config/config";

function Dashboard() {
    const { user, setUser } = React.useContext(AppContext);
    const [activeDevice, setActiveDevice] = React.useState({});
    const [devices, setDevices] = React.useState([]);
    const pickerRef = React.useRef();

    const verifyDevice = async (id, list) => {
        const result = await new Promise((resolve, reject) => {
            const found = list.some(a => a.deviceId === id);
            resolve(found);
        });
    
        return result;
    } 

    const handleGetDevices = async () => {
        const definyDevicesState = (newDevices) => {
            setDevices(newDevices);
        }

        const fetch = async () => {
            try{
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/devices`, {
                    headers: {
                        Authorization: `${token}`
                 }
                });
                return response.data;
            }catch(error){
                throw error;
            }
        }

        try{
            const data = await fetch();
            if(data){
                definyDevicesState(data)
            }
            else{
                definyDevicesState([]);
            }

            const storedData = JSON.parse(await AsyncStorage.getItem('activeDevice'));
            setActiveDevice(storedData);
            
            const deviceFind = await verifyDevice(storedData.deviceId, data);

            if(!deviceFind || data.length == 0){
                setActiveDevice({});
                saveData({});
            }else{
                setSelectedDevice(storedData.deviceId);
            }
        }catch(error){
            console.log(error);
        }
    }

    const saveData = async(valueData) => {
        if(valueData){
            try{
                await AsyncStorage.setItem('activeDevice', JSON.stringify(valueData));
                console.log('Salvo com sucesso')
                const storedDevice = JSON.parse(await AsyncStorage.getItem('activeDevice'));
                setActiveDevice(storedDevice);
            }catch(error){
                console.error('Erro ao salvar os dados.');
            }
        }
    }

    const handleValueChange = (itemValue, itemIndex) => {
        if(itemIndex >= 0 && itemValue != "default-value"){
            setSelectedDevice(itemValue);
            saveData(itemValue);
        }
            
    }

    React.useEffect(() => {
        handleGetDevices();
    }, []);

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.containerData}>
                <HorizontalLine vertical={0} horizontal={6} color='white' size={1} background="#0099FF" />
                <Text style={styles.firstText}>{activeDevice !== '' ? 'Seu consumo' : 'Selecione um dispositivo'}</Text>
                <Text style={styles.nameText}>{activeDevice.deviceName}</Text>
                <Text style={styles.waterText}>127,37L</Text>
                <TouchableOpacity style={styles.deviceButton} onPress={() => {pickerRef.current.focus()}}>
                    <Text style={styles.deviceButtonText}><CustomIcon type="SimpleLineIcons" name="speedometer" size={18} /> TROCAR DISPOSITIVO</Text>
                    <Picker
                        ref={pickerRef}
                        dropdownIconColor={"#0099FF"}
                        selectedValue={activeDevice.deviceId}
                        style={{ display: 'none' }}
                        onValueChange={handleValueChange}
                        >
                        <Picker.Item style={{ display: 'none'}} label="Selecione um dispositivo" value="default-value"/>
                        {(devices && devices.length !== 0) && devices.map(device => (
                            <Picker.Item key={device.deviceId} style={{ display: 'none' }} label={device.deviceName} value={{deviceId: device.deviceId, deviceName: device.deviceName}} />
                        ))}
                    </Picker>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Dashboard;