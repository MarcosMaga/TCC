import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import styles from "./style";

function MonthAverage(props){
    const data = [
        {value: props.value, color: '#0099FF'},
        {value: props.value >= 3300 ? 0 : 3300 - props.value, color: '#77C3F5'}
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Cons. mensal recomendado</Text>
            <View style={styles.chartContainer}>
                <PieChart
                    data={data}
                    donut
                    innerRadius={80}
                    centerLabelComponent={() => {
                        return (
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 38, fontWeight: 'bold', color: '#0099FF', textAlign: 'center'}}>{Math.round((100 * props.value)/3300)}%</Text>
                                <Text style={{textAlign: 'center'}}>{props.value}L/3300L</Text>
                            </View>
                        )
                    }}
                />
                <View style={styles.labelView}>
                    <View style={[styles.labelColor, {backgroundColor: "#0099FF"}]}/>
                    <Text>Seu consumo</Text>
                </View>
                <View style={styles.labelView}>
                    <View style={[styles.labelColor, {backgroundColor: "#77C3F5"}]}/>
                    <Text>Consumo mensal recomendado pela OMS</Text>
                </View>
            </View>
        </View>
    );
}

export default MonthAverage;