import React from "react";
import { View } from "react-native";

import Header from "../../components/Header";
import Tip from "../../components/Tip";

function Tips(){
    return(
        <View>
            <Header title="Dicas Economia"/>
            <Tip/>
        </View>
    );
}

export default Tips;