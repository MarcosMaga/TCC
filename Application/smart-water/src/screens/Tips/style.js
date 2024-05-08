import { StyleSheet, Dimensions, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
        zIndex: -3,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: "row"
    },
    button: {
        backgroundColor: "#0099FF",
        margin: 5,
        borderRadius: 25,
        padding: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        margin: 5
    }
})

export default styles;