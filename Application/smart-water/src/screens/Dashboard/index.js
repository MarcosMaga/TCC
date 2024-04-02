import React from "react";
import {View, Text} from "react-native"

import { AppContext } from "../../contexts/AppContext";
import Header from "../../components/Header";

function Dashboard(){
    const { user, setUser } = React.useContext(AppContext)
    
    return(
        <View>
            <Header/>
        </View>
    )
}

export default Dashboard;