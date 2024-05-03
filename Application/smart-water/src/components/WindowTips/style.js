import { StyleSheet, Platform, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        zIndex: -3,
        borderRadius: 10,
        marginTop: 15,
        width: Dimensions.get('window').width - 2 * 10,
        flexDirection: 'row',
        alignItems: 'center',
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
    lamp: {
        padding: 15,
        width: 80,
        height: 80,
        margin: 15,
        backgroundColor: 'rgba(0, 153, 255, 0.2)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tips: {
        color: 'black',
        fontSize: 16,
        flexWrap: 'wrap',
        maxWidth: Dimensions.get('window').width - 80 - 2 * 15 - 2 * 4 - 30
    }
})

export default styles;