import React from "react";
import {View, Text} from "react-native"

import { AppContext } from "../../contexts/AppContext";
import Header from "../../components/Header";
import HorizontalLine from "../../components/HorizontalLine";

function Dashboard(){
    const { user, setUser } = React.useContext(AppContext)
    
    return(
        <View>
            <Header/>
            <HorizontalLine vertical={0} horizontal={4} color='red' size={2}/>
            <View>
                
            </View>
        </View>
    )
}

export default Dashboard;