import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0099FF",
    },
    containerData:{
        zIndex: -3,
    },
    firstText: {
        marginTop: 10,
        marginBottom: 0,
        color: 'white',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '300'
    },
    nameText: {
        textAlign: 'center',
        color: 'white',
        marginVertical: 1
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
    },
    infoArea: {
        backgroundColor: '#F2F2F2',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -3
    }
})

export default styles;