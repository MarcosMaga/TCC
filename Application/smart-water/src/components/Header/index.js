import React from "react";
import { View, Text } from "react-native"

import { AppContext } from "../../contexts/AppContext";
import styles from "./style";
import Menu from "./Menu";

function Header(){
    const { user, setUser } = React.useContext(AppContext);

    return(
        <View style={styles.container}>
            <Menu/>
            <Text style={styles.textName}>{user.name}</Text>
            <Text style={styles.plus}>+</Text>
        </View>
    )
}

export default Header;