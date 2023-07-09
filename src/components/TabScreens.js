import React, { Component } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";
//import LiteratureScreen from "./LiteratureScreen";
import SettingsScreensStack from "./SettingsScreensStack";

class TabScreens extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const Tab = createBottomTabNavigator();
        const Stack = createNativeStackNavigator();
        return (
                <Tab.Navigator>
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{ title: 'Home', headerShown: false, headerBackVisible:false }}
                    />
                    {/* <Stack.Screen
                        name="LiteratureScreen"
                        component={LiteratureScreen}
                        options={{ title: 'Literature', headerShown: false, headerBackVisible:false }}
                    /> */}
                    <Stack.Screen
                        name="SettingsScreensStack"
                        component={SettingsScreensStack}
                        options={{ title: 'Settings', headerShown: false, headerBackVisible:false }}
                    /> 
                </Tab.Navigator>
        )
    }
}

export default TabScreens;