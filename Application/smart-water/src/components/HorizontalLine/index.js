import React from "react";
import { View, StyleSheet } from 'react-native';

function HorizontalLine(props){
    const styles = StyleSheet.create({
        line: {
          borderBottomColor: props.color,
          borderBottomWidth: props.size,
          marginVertical: props.vertical,
          marginHorizontal: props.horizontal 
        },
    });

    return <View style={styles.line}/>
}

export default HorizontalLine;