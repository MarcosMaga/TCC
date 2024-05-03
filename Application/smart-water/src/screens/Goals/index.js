import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppContext } from "../../contexts/AppContext";
import Header from "../../components/Header";
import styles from "./style";
import { BASE_URL } from "../../config/config";

function Goal(){
    const { user, setUser } = React.useContext(AppContext);
    const [goal, setGoal] = React.useState(user.setting?.goal ? user.setting.goal : null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const verifyGoal = (inputValue) => {
        setGoal(inputValue);

        if(inputValue){
            try{
                const input = parseInt(inputValue);
    
                if(input >= 1 && input <= 10000)
                    setError(null);
                else
                    setError(`Valor inválido`);
            }catch(error){
                setError('O valor deve ser um número inteiro');
            }
        }
    }

    const handleSettingGoal = async () => {
        try{
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}/setting`, {
                setting: {
                    goal: parseInt(goal),
                }
            }, {
                headers: {
                    Authorization: `${token}`
                }
            })
            await AsyncStorage.setItem('token', response.data.token);
            const decodedToken = jwtDecode(response.data.token);
            setUser({
                id: decodedToken.id,
                name: decodedToken.name,
                email: decodedToken.email,
                createdOn: decodedToken.createdOn,
                setting: decodedToken.setting
            })
        }catch(error){
            console.error(error);
        }finally{
            setLoading(false);
        }
    }

    return(
        <View>
            <Header title="Metas"/>
            <View style={{zIndex: -3}}>
                <Text style={styles.label}>{user.setting && user.setting.goal ? `Sua meta atual: ${user.setting.goal.toString()}L` : 'Você ainda não possui uma meta.'}</Text>
                <Text style={styles.label}>Atualize sua meta mensal (L)</Text>
                    <TextInput
                        keyboardType='numeric'
                        placeholder="Digite sua meta mensal em litros"
                        value={goal.toString()}
                        onChangeText={verifyGoal}
                        style={error ? styles.inputError : styles.input}
                    />
                {error ? <Text style={styles.labelError}>{error}</Text> : null}
                <TouchableOpacity onPress={handleSettingGoal} style={error ? styles.buttonDisabled : styles.button} disabled={Boolean(error)}>
                        {
                            loading ? (
                                <ActivityIndicator
                                    size={40}
                                    color="white"
                                />
                            ) : (
                                <Text style={styles.textButton}>SALVAR</Text>
                            )
                        }
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Goal;