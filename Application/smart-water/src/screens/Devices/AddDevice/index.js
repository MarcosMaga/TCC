import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

import Header from '../../../components/Header';
import styles from "./style";
import { BASE_URL } from '../../../config/config';

function AddDevice(){
    const navigation = useNavigation();
    const [deviceName, setDeviceName] = React.useState('');
    const [errorName, setErrorName] = React.useState(null);
    const [deviceId, setDeviceId] = React.useState('');
    const [errorId, setErrorId] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const verifyNameInput = (inputText) => {
        setDeviceName(inputText);
        if(inputText.length >= 6)
            setErrorName(null);
        else
            setErrorName('O apelido deve conter no mínimo 6 caracteres');
    }

    const verifyIdInput = (inputText) => {
        setDeviceId(inputText.toUpperCase());
        if(inputText.length < 12)
            setErrorId('O código do dispositivo deve conter no mínimo 12 caracteres');
        else if(deviceId.includes(' '))
            setErrorId('O código não pode conter um espaço');
        else
            setErrorId(null);
    }

    const handleAddDevice = async () => {
        try{
            setLoading(true);
            await axios.post(`${BASE_URL}/devices`, {
                deviceId,
                deviceName
            })
            navigation.reset({
                index: 0,
                routes: [{ name: 'Devices'}]
            })
            navigation.navigate('Devices');
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    return(
        <View>
            <Header title="Dispositivos | Adicionar"/>
            <View style={{zIndex: -3}}>
                <Text style={styles.label}>Apelido do dispositivo</Text>
                <TextInput
                    placeholder="Digite o apelido do seu dispositivo"
                    value={deviceName}
                    onChangeText={verifyNameInput}
                    style={errorName ? styles.inputError : styles.input}
                />
                {errorName ? <Text style={styles.labelError}>{errorName}</Text> : null}
                <Text style={styles.label}>Código do dispositivo</Text>
                <TextInput
                    placeholder="Digite o código do seu dispositivo" 
                    value={deviceId}
                    onChangeText={verifyIdInput}
                    style={errorId ? styles.inputError : styles.input}
                />
                {errorId ? <Text style={styles.labelError}>{errorId}</Text> : null}
                <TouchableOpacity onPress={handleAddDevice} style={Boolean(errorId) + Boolean(errorName) == false && deviceId.length && deviceName.length ? styles.button : styles.buttonDisabled} disabled={Boolean(errorId) + Boolean(errorName) == false && deviceId.length && deviceName.length ? false : true}>
                    {
                        loading ? (
                            <ActivityIndicator
                                size={40}
                                color="white"
                            />
                        ) : (
                            <Text style={styles.textButton}>CADASTRAR</Text>
                        )
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddDevice;