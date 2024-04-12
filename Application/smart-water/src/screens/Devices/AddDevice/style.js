import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    button:{
        backgroundColor: "#0099FF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 15,
    },
    buttonDisabled: {
        backgroundColor: "#0099FF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 15,
        opacity: 0.5
    },
    textButton: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    label:{
        fontSize: 19,
        marginHorizontal: 10,
        marginVertical: 3
    },
    input:{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 5,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        marginHorizontal: 10
    },
    inputError:{
        height: 40,
        borderColor: 'tomato',
        borderWidth: 1,
        marginTop: 5,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        marginHorizontal: 10
    },
    labelError:{
        fontSize: 17,
        marginHorizontal: 10,
        marginVertical: 3,
        color: 'tomato'
    }
})

export default styles;