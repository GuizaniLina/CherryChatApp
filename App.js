// import { useRef, useState } from 'react';
 import { StyleSheet, Text, View, ImageBackground, TextInput,placeholder, Button,TouchableOpacity } from 'react-native';
// // import "./assets/auth";
// import { StatusBar } from 'react-native';
import Auth from './screens/Auth';
import Accueil from './screens/Accueil';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateUser from './screens/CreateUser';
import ChatScreen from './screens/ChatScreen';
import Intro from './screens/intro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName='Intro' screenOptions={{
          headerStyle: {
            backgroundColor: '#e5a0ad',
          },
          headerTintColor: '#fff', // Text color
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name='Sweet Talk' component={Intro}/>
        <Stack.Screen name='Auth' component={Auth}/>
        <Stack.Screen name='Accueil' component={Accueil}/>
        <Stack.Screen name='CreateUser' component={CreateUser}/>
        <Stack.Screen name='Chat' component={ChatScreen}/>

      </Stack.Navigator>
      
    </NavigationContainer>
  );
}