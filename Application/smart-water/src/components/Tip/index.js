import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import HorizontalLine from "../HorizontalLine";
import styles from "./style";
import CustomIcon from "../CustomIcon";
import { BASE_URL } from "../../config/config";

function Tip({tip}){
    const [isLiked, setIsLiked] = React.useState(tip.isLiked);
    const [quantLike, setQuantLike] = React.useState(tip.likes.length ? tip.likes.length : 0);
    const [page, setPage] = React.useState(1);

    const handleLike = async () => {
        try{
            const token = await AsyncStorage.getItem('token');
            await axios.post(`${BASE_URL}/like?page=${page}`, {
                tipId: tip.id
            },{
                headers: {
                    Authorization: `${token}`
                }
            });
            
            const newQuantLike = isLiked ? quantLike - 1 : quantLike + 1;
            setIsLiked(!isLiked);
            setQuantLike(newQuantLike);
        }catch(error){
            console.error(error);
        }
    }

    return(
        <View style={styles.container}>
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.tipTitle}>{tip.title}</Text>
                    <View style={styles.titleIcon}>
                        <Text style={styles.titleNew}>NOVO</Text>
                        <CustomIcon type="Ionicons" size={25} name="water" color="#0099FF"/>
                    </View>
                </View>
                <HorizontalLine color="#0099FF" horizontal={3} top={2} bottom={2} size={1}/>
                <Text style={styles.tipText}>{tip.description}
                </Text>
                <View style={styles.likeContainer}>
                    <TouchableOpacity onPress={handleLike}>
                        <CustomIcon type="AntDesign" size={30} name={isLiked ? "like1" : "like2"} color="#0099FF"/>
                    </TouchableOpacity>
                    <Text style={styles.textLike}>{quantLike}</Text>
                </View>
            </View>
        </View>
    );
}

export default Tip;