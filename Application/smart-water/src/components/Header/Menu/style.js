import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        marginLeft: 5, 
        marginBottom: 'auto', 
        marginTop: 'auto',
    },
    menu: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: height,
        width: width * 0.85,
        borderRightWidth: 1,
        borderColor: 'gray',
        zIndex: 3
    },
    menuClose: {
        display: 'none'
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    menuItensText: {
        fontSize: 18,
        padding: 10
    }
})

export default styles;