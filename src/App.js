import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from "react-native-flash-message";

import TabScreens from "./components/TabScreens";
import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignupScreen"
//import PrivacyScreen from "./components/PrivacyScreen"
//import ContactScreen from "./components/ContactScreen"
//import SponsorScreen from "./components/SponsorScreen";
//import PDFScreen from "./components/PDFScreen";
//import BookmarkScreen from "./components/BookmarkScreen";

const Stack = createNativeStackNavigator();

class App extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{ title: 'Welcome' }}
                    />
                    <Stack.Screen
                        name="SignUpScreen"
                        component={SignUpScreen}
                        options={{ title: 'Sign Up for 4Today' }}
                    />
                   {/* <Stack.Screen
                        name="PrivacyScreen"
                        component={PrivacyScreen}
                        options={{ title: 'Privacy Policy' }}
                    /> */}
                    <Stack.Screen
			            name="TabScreens"
			  	        component={TabScreens}             
					    options={{ title: '4Today', headerShown: false }}
				    />
                    {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen
                            name="ContactScreen"
                            component={ContactScreen}
                            options={{ title: '4Today', headerShown: false, headerBackVisible:false }}
                        />
                        <Stack.Screen
                          name="PDFScreen"
                            component={PDFScreen}
                            options={{ title: '', headerShown: false, headerBackVisible:false }}
                        />
                        <Stack.Screen
                          name="BookmarkScreen"
                            component={BookmarkScreen}
                            options={{ title: 'Bookmarks', headerShown: false, headerBackVisible:false }}
                        />
                    </Stack.Group> */}
                </Stack.Navigator>
            </NavigationContainer>
            <FlashMessage
              style={{
                marginTop: Platform.OS == "ios" ? 0 : StatusBar.currentHeight,
              }}
              position="top"
              animated={true}
            />
            </View>
        );
    }
}

export default App;