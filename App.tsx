// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import { theme } from './src/core/theme'
import { Provider } from 'react-native-paper';
import ListTravelScreen from './src/screen/ListTravelScreen';
import HomeScreen from './src/screen/HomeScreen';
import EditProfileScreen from './src/screen/EditProfileScreen';
import PostTravelSrceen from './src/screen/PostTravelSrceen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Travel" component={ListTravelScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="PostTravel" component={PostTravelSrceen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;