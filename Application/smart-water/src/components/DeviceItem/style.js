import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
        zIndex: -3
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'space-between',
        marginRight: 'auto'
    }
})

export default styles;