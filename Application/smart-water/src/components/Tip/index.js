import React from "react";
import { View, Text } from "react-native";

import HorizontalLine from "../HorizontalLine";

function Tip(){
    return(
        <View>
            <View>
                <Text>Dica</Text>
                <HorizontalLine color="#0099FF" horizontal={2} top={2} bottom={2} size={1}/>
                <Text>Lorem Lorem lorem lorem lorem Lorem</Text>
            </View>
        </View>
    );
}

export default Tip;