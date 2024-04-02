import React from "react";
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { AppContext } from "../../contexts/AppContext";
import { BASE_URL } from '../../config/config';
import styles from './style';
import logo from '../../assets/img/logo-smartwater.png'

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
            setUser({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                createdOn: response.data.createdOn
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