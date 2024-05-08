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
        padding: 10
    },
    tipTitle: {
        fontSize: 25
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'right',
        marginLeft: 'auto'
    },
    titleNew: {
        backgroundColor: 'rgba(0, 153, 255, 0.2)',
        color: '#0099FF',
        padding: 5,
        fontWeight: 'bold',
        borderRadius: 15,
        fontSize: 12
    },
    tipText: {
        fontSize: 17
    },
    likeContainer: {
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textLike: {
        color: "#0099FF",
        margin: 5,
        fontSize: 18
    }
})

export default styles;