import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        zIndex: -3,
        borderRadius: 10,
        marginTop: 15,
        width: Dimensions.get('window').width - 25
    },
    chartTitle: {
        color: '#464C4E',
        fontSize: 25,
        fontWeight: '400',
        marginHorizontal: 10,
        marginVertical: 5
    },
    button: {
        marginTop: 25,
        backgroundColor: '#0099FF',
        padding: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    textButton: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        margin: 5
    }
})

export default styles;