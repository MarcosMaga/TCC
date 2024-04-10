import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0099FF",
    },
    containerData:{
        zIndex: -3
    },
    firstText: {
        marginVertical: 10,
        color: 'white',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '300'
    },
    waterText: {
        fontSize: 40,
        color: 'white',
        textAlign: 'center',
        marginVertical: 5,
        fontWeight: 'bold'
    },
    deviceButton: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 35,
        marginVertical: 5,
        marginBottom: 30,
        marginHorizontal: '20%'
    },
    deviceButtonText: {
        padding: 5,
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    }
})

export default styles;