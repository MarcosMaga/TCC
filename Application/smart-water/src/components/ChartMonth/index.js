import React from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { LineChart } from 'react-native-gifted-charts';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../../config/config";
import { AppContext } from "../../contexts/AppContext";
import styles from "./style";

function ChartMonth(props) {
    const [data, setData] = React.useState([]);
    const { user, setUser } = React.useContext(AppContext);

    const getData = async () => {
        if(props.deviceId){
            const token = await AsyncStorage.getItem('token');
    
            try {
                const result = await axios.get(`${BASE_URL}/reading/month/${props.deviceId}`, {
                    headers: {
                        Authorization: token
                    }
                })
    
                const newData = [];
    
                for (const key in result.data) {
                    if (result.data.hasOwnProperty(key)) {
                        const value = result.data[key];
                        const label = key;
                        const dataPointText = result.data[key].toFixed(1).replace('.', ',');
                        newData.push({ value, label, dataPointText });
                    }
                }
                setData(newData.reverse());
            } catch (error) {
                console.error(error);
            }
        }
    }

    React.useEffect(() => {
        getData();
    }, [props.deviceId, props.value]);

    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Consumo por mês</Text>
            <LineChart
                data={data}
                width={Dimensions.get('window').width - 85}
                textColor1="black"
                textFontSize1={16}
                textShiftY={-8}
                textShiftX={-10}
                textFontSize={13}
                thickness={5}
                yAxisColor="#0099FF"
                showVerticalLines
                verticalLinesColor="#0099FF"
                xAxisColor="#0099FF"
                color="#0099FF"
                areaChart
                isAnimated
                animationDuration={1200}
                startFillColor1="#0099FF"
                startOpacity={1}
                endOpacity={0.3}
                curved
                rotateLabel
            />
            {user.setting?.goal ? null : 
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>Definir Meta</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

export default ChartMonth;