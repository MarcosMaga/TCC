import React from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { Picker } from "@react-native-picker/picker"

import { AppContext } from "../../contexts/AppContext";
import Header from "../../components/Header";
import HorizontalLine from "../../components/HorizontalLine";
import styles from "./style";
import CustomIcon from "../../components/CustomIcon";

function Dashboard() {
    const { user, setUser } = React.useContext(AppContext)
    const [selectedLanguage, setSelectedLanguage] = React.useState();
    const pickerRef = React.useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.containerData}>
                <HorizontalLine vertical={0} horizontal={6} color='white' size={1} background="#0099FF" />
                <Text style={styles.firstText}>Seu consumo</Text>
                <Text style={styles.waterText}>127,37L</Text>
                <TouchableOpacity style={styles.deviceButton} onPress={open}>
                    <Text style={styles.deviceButtonText}><CustomIcon type="SimpleLineIcons" name="speedometer" size={18} /> TROCAR DISPOSITIVO</Text>
                    <Picker
                        ref={pickerRef}
                        dropdownIconColor={"#0099FF"}
                        selectedValue={selectedLanguage}
                        style={{ display: 'none' }}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item style={{ display: 'none' }} label="Java" value="java" />
                        <Picker.Item style={{ display: 'none' }} label="JavaScript" value="js" />
                    </Picker>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Dashboard;