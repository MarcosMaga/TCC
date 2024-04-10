import { StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight - 120
    },
    button:{
        position: 'absolute',
        backgroundColor: "#0099FF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        bottom: 0,
        zIndex: -2,
        width: '95%'
    },
    textButton: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default styles;