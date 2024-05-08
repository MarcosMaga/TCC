import React from "react";
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../../components/Header";
import Tip from "../../components/Tip";
import styles from "./style";
import { BASE_URL } from "../../config/config";

function Tips() {
    const [type, setType] = React.useState('liked');
    const [tips, setTips] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);

    const getTips = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const result = await axios.get(`${BASE_URL}/tip?type=${type}&page=${page}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            setTips([...tips, ...result.data]);
            setPage(page + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 400;

        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            getTips();
        }
    };

    const changeType = async (value) => {
        await setPage(1);
        await setTips([]);
        setType(value)
    }

    React.useEffect(() => {
        getTips();
    }, [type])

    return (
        <View>
            <View style={{ zIndex: 3 }}>
                <Header title="Dicas Economia" />
            </View>
            <ScrollView style={{ height: 'auto', marginBottom: 70 }}
                onScroll={({ nativeEvent }) => handleScroll({ nativeEvent })}
                scrollEventThrottle={400}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => { changeType('liked') }} style={styles.button}>
                        <Text style={styles.buttonText}>Mais curtidos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { changeType('new') }} style={styles.button}>
                        <Text style={styles.buttonText}>Novos</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    {tips && tips.map(tip => (
                        <Tip key={tip.id} tip={tip} />
                    ))}
                </View>
                {loading && <ActivityIndicator style={styles.loadingIndicator} />}
            </ScrollView>
        </View>
    );
}

export default Tips;