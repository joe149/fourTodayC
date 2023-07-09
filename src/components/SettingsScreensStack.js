import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import ProfileScreen from './ProfileScreen';
// import SettingsScreen from './SettingsScreen';
// import ChangePhotoScreen from './ChangePhotoScreen';
// import AboutScreen from './AboutScreen';
// import ContactUsScreen from './ContactUsScreen';

class SettingsScreenStack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{title: 'Settings', headerShown: false}}
        />
        {/* <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{title: 'Profile', headerShown: false}}
        />
        <Stack.Screen
          name="ChangePhotoScreen"
          component={ChangePhotoScreen}
          options={{title: 'Change Photo', headerShown: false}}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{title: 'About 4Today', headerShown: false}}
        />
        <Stack.Screen
          name="ContactUsScreen"
          component={ContactUsScreen}
          options={{title: 'Contact Us', headerShown: false}}
        /> */}
      </Stack.Navigator>
    );
  }
}
export default SettingsScreenStack;
