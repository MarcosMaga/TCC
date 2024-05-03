import { StyleSheet, Dimensions, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        zIndex: -3,
        borderRadius: 10,
        marginTop: 15,
        width: Dimensions.get('window').width - 25,
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.25,
              shadowRadius: 25,
            },
            android: {
              elevation: 5,
            },
        }),
    },
    chartTitle: {
        color: '#1F1F1F',
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
    },
    goalText: {
        fontSize: 20,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 5
    }
})

export default styles;