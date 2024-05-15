import { StyleSheet, Dimensions, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        zIndex: -3,
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 15,
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
    chartContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    labelView: {
        flexDirection: 'row',
        marginRight: 'auto',
        marginLeft: 5,
        marginVertical: 5
    },
    labelColor: {
        padding: 10, 
        borderRadius: 50,
        marginHorizontal: 5
    }
})

export default styles;