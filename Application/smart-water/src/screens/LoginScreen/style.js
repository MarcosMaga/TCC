import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    body:{
        backgroundColor: "#0099FF",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 5
    },
    logo: {
        width: '75%',
    },
    button:{
        width: '75%',
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    buttonText:{
        textAlign: 'center',
        color: "#0099FF",
        fontSize: 25,
        margin: 5
    },
    statusText: {
        textAlign: 'center',
        color: 'tomato',
        margin: 5,
        fontSize: 18
    }
})

export default styles;