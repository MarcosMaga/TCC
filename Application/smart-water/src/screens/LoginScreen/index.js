import React from "react";
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppContext } from "../../contexts/AppContext";
import { BASE_URL } from '../../config/config';
import styles from './style';
import logo from '../../../assets/logo-smartwater.png'

function LoginScreen(){
    const navigation = useNavigation();
    const { user, setUser } = React.useContext(AppContext)

    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [loadingAuth, setLoadingAuth] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleLogin = async () => {
        try{
            setLoadingAuth(true);
            if(!email || !password) return setError('Digite seu email e senha.');
            const response = await axios.post(`${BASE_URL}/login`, {
                email,
                password
            })

            await AsyncStorage.setItem('token', response.data.token);
            const decodedToken = jwtDecode(response.data.token);
            console.log(decodedToken);
            setUser({
                id: decodedToken.id,
                name: decodedToken.name,
                email: decodedToken.email,
                createdOn: decodedToken.createdOn,
                setting: decodedToken.setting
            })
            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard'}]
            })
            navigation.navigate('Dashboard');
        } catch (error){
            error.response?.data?.error ? setError(error.response.data.error) : setError(`Erro com o servidor`);
            console.log(error);
        } finally{
            setLoadingAuth(false);
        }
    }

    return(
        <View style={styles.body}>
            <Image
                style={styles.logo}
                source={logo}
                resizeMode="contain"
            />
            <TextInput
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.inputs}
            />
            <TextInput
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.inputs}
            />
            <TouchableOpacity style={styles.button} disabled={loadingAuth} onPress={handleLogin}> 
                {
                    loadingAuth ? (
                        <ActivityIndicator
                            size={40}
                            color="#0099FF"
                        />
                ) : (
                    <Text style={styles.buttonText}>ENTRAR</Text>
                )
              }
            </TouchableOpacity>
            <Text style={styles.statusText}>{error}</Text>
        </View>
    )
}

export default LoginScreen;