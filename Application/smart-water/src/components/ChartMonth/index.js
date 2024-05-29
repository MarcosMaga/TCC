import React from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { LineChart } from 'react-native-gifted-charts';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

import { BASE_URL } from "../../config/config";
import { AppContext } from "../../contexts/AppContext";
import styles from "./style";

function ChartMonth(props) {
    const [data, setData] = React.useState([]);
    const [max, setMax] = React.useState(50);
    const [goalData, setGoalData] = React.useState([]);
    const { user, setUser } = React.useContext(AppContext);
    const navigation = useNavigation();

    
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
                const newGoalData = [];

                let maxValue = 0;
    
                for (const key in result.data) {
                    if (result.data.hasOwnProperty(key)) {
                        const value = result.data[key];
                        if(value > maxValue)
                            maxValue = value;
                        const label = key;
                        const dataPointText = result.data[key].toFixed(1).replace('.', ',');
                        newData.push({ value, label, dataPointText });
                        if(user.setting?.goal){
                            newGoalData.push({value: user.setting.goal, label});
                        }
                    }
                }

                user.setting?.goal > maxValue ? maxValue = user.setting.goal : null;
                setMax(Math.round(maxValue));
                setData(newData);
                setGoalData(newGoalData);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const goToGoal = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Goal'}]
        })
        navigation.navigate('Goal');
    }

    React.useEffect(() => {
        getData();
    }, [props.deviceId, props.value, user]);

    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Consumo por mês</Text>
            <LineChart
                data={data}
                data2={goalData}
                width={Dimensions.get('window').width - 85}
                height={210}
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
                color1="#0099FF"
                color2="yellow"
                textColor="#1F1F1F"
                isAnimated
                highlightedRange={{
                    from: user.setting?.goal ? user.setting.goal+ 0.1 : null,
                    color: 'tomato'
                }}
                maxValue={max + (max*10)/100}
                animationDuration={1200}
                startOpacity={1}
                endOpacity={0.3}
                curved
                rotateLabel
            />
            <TouchableOpacity onPress={goToGoal} style={styles.button}>
                <Text style={styles.textButton}>{user.setting?.goal ? `Alterar Meta (${user.setting.goal}L)` : 'Definir Meta'}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ChartMonth;