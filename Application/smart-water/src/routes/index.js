import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "../screens/LoginScreen"
import Dashboard from "../screens/Dashboard";
import Devices from "../screens/Devices";

const Stack = createNativeStackNavigator();

function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Devices"
                component={Devices}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default Routes;