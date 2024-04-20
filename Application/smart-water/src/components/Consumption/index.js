import React from "react";
import { Text } from "react-native";
import io from 'socket.io-client';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../../config/config";

function Consumption(props){
    const [value, setValue] = React.useState(0);
    
    const connectToSocket = React.useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            console.log(props.deviceId);

            // if(props.deviceId){
            //     const socket = io(`${BASE_URL}?id=${props.deviceId}`, {
            //         auth: {
            //             token: token
            //         }
            //     });
    
            //     socket.on('consumption', (data) => {
            //         setValue(data);
            //     })

            //     return () => {
            //         socket.disconnect();
            //     };
            // }

        } catch (error) {
            console.error('Erro ao conectar ao socket:', error);
        }
    }, []);

    React.useEffect(() => {
        connectToSocket();
    }, [connectToSocket]);

    return (
        <Text>{value}</Text>
    )
}

export default Consumption;