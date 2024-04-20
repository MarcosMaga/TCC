import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppContext } from "../../contexts/AppContext";
import Header from "../../components/Header";
import HorizontalLine from "../../components/HorizontalLine";
import styles from "./style";
import CustomIcon from "../../components/CustomIcon";
import Consumption from "../../components/Consumption";
import { BASE_URL } from "../../config/config";

function Dashboard() {
    const { user, setUser } = React.useContext(AppContext);
    const [activeDevice, setActiveDevice] = React.useState({});
    const [activeDeviceName, setActiveDeviceName] = React.useState('');
    const [devices, setDevices] = React.useState([]);
    const [selectedDevice, setSelectedDevice] = React.useState();
    const pickerRef = React.useRef();

    const handleGetDevices = async () => {
        try{
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/devices`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            if(response.data)
                setDevices(response.data);
            else
                setDevices([])
            
            const deviceFind = devices.find(device => device.deviceId !== activeDevice.deviceId) || null;
            if(!deviceFind || devices.length == 0){
                setActiveDevice({});
                saveData({});
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
                loadStoredData();
            }catch(error){
                console.error('Erro ao salvar os dados.');
            }
        }
    }

    const loadStoredData = async () => {
        try{
            const storedData = await AsyncStorage.getItem('activeDevice');
            if(storedData)
                try{
                    setActiveDevice(JSON.parse(storedData));
                }catch(error){
                    console.log('Não foi possivel converter em objeto');
                }
            return Promise.resolve();
        }catch(error){
            console.error('Erro ao carregar os dados.', error);
            return Promise.reject(error);
        }
    }

    React.useEffect(() => {
        loadStoredData().then(() => {
            handleGetDevices();
        });
    }, []);

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.containerData}>
                <HorizontalLine vertical={0} horizontal={6} color='white' size={1} background="#0099FF" />
                <Text style={styles.firstText}>{activeDevice !== '' ? 'Seu consumo' : 'Selecione um dispositivo'}</Text>
                <Text style={styles.nameText}>{activeDevice ? activeDevice.deviceName : null}</Text>
                <Text style={styles.waterText}>127,37L</Text>
                {activeDevice ? <Consumption deviceId={activeDevice.deviceId}/>: ''}
                <TouchableOpacity style={styles.deviceButton} onPress={() => {pickerRef.current.focus()}}>
                    <Text style={styles.deviceButtonText}><CustomIcon type="SimpleLineIcons" name="speedometer" size={18} /> TROCAR DISPOSITIVO</Text>
                    <Picker
                        ref={pickerRef}
                        dropdownIconColor={"#0099FF"}
                        selectedValue={activeDevice.deviceId ? activeDevice.deviceId : selectedDevice}
                        style={{ display: 'none' }}
                        onValueChange={(itemValue) => {
                            setSelectedDevice(itemValue);
                            saveData(itemValue);
                        }}>
                        {(devices || devices.length !== 0) && devices.map(device => (
                            <Picker.Item key={device.deviceId} style={{ display: 'none' }} label={device.deviceName} value={{deviceId: device.deviceId, deviceName: device.deviceName}} />
                        ))}
                    </Picker>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Dashboard;