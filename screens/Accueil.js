import { ImageBackground, StyleSheet,Image, Text, View } from 'react-native'
import React from 'react'
import Chat from './Chat';
import Profils from './AddProfile';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ListProfil from './ListProfil';




export default function Accueil(props) {
  const currentid=props.route.params.currentid;

  const Tab = createMaterialBottomTabNavigator();

   // const { name } = route.params;
   // const { password } = route.params;
   
  return (
    
    <Tab.Navigator  barStyle={{ backgroundColor: '#e5a0ad' ,height : 90, }} activeColor={'#b61827'}
    inactiveColor={'white'} 
     
    >
     
      <Tab.Screen name='Profil' component={Profils} initialParams={{currentid:currentid}}  
        
        
        />
      <Tab.Screen name='Room Chat' component={Chat}  options={{
          tabBarIcon: () => (
            <Image
              style={[styles.image ]}
              source={require('../assets/cerise.png')}
            />
          ),
        
          tabBarLabel: 'Room Chat',
        }}/>
      <Tab.Screen
        name="ListProfile"
        component={ListProfil}
        initialParams={{ currentid: currentid }}
       
      />
    </Tab.Navigator>
  
  )
}

const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#005',
          alignItems: 'center',
          justifyContent: 'center',
        },
        textinput: {
            marginBottom: 5,
            backgroundColor: '#fff5',
            width: "65%",
            height: 60,
        },
        text: {
            textAlignVertical: 'center',
            color: '#b6212c',
            
        },
        btn: {
            backgroundColor: "#9BBEC8",
            margin: 2,
            width: 110,
          },
          image: {
            width: 30,
            height: 30,}
})