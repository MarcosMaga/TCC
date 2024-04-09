import React from "react";
import {View, Text, TouchableOpacity} from "react-native"

import { AppContext } from "../../contexts/AppContext";
import Header from "../../components/Header";
import HorizontalLine from "../../components/HorizontalLine";
import styles from "./style";
import CustomIcon from "../../components/CustomIcon";

function Dashboard(){
    const { user, setUser } = React.useContext(AppContext)
    
    return(
        <View>
            <Header/>
            <View style={styles.container}>
                <HorizontalLine vertical={0} horizontal={6} color='white' size={1} background="#0099FF"/>
                <Text style={styles.firstText}>Seu consumo</Text>
                <Text style={styles.waterText}>127,37L</Text>
                <TouchableOpacity style={styles.deviceButton}>
                    <Text style={styles.deviceButtonText}><CustomIcon type="SimpleLineIcons" name="speedometer" size={18}/> TROCAR DISPOSITIVO</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Dashboard;