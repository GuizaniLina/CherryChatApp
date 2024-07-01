import { StyleSheet, ImageBackground, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import firebase from '../config';
import { FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import { Dialog, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ListeProfile = () => {
  const navigation = useNavigation();

  const database = firebase.database();
  const ref_profils = database.ref('Profils');
  const [data, setData] = useState([]);
  const [dialogIsVisible, setDialogIsVisible] = useState(false);
  const currentUserId = firebase.auth().currentUser?.uid;

  useEffect(() => {
    ref_profils.on('value', (snapshot) => {
      let d = [];
      snapshot.forEach((child) => {
        const profile = child.val();
        if (profile.id !== currentUserId) {
          // Exclude the currently logged-in user's profile
          d.push(profile);
        }
      });
      setData(d);
    });

    return () => {
      ref_profils.off('value');
    };
  }, [currentUserId]);

  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      style={styles.container}
      blurRadius={1}>
      <View style={styles.container}>
        <Text style={styles.title}>Liste des Profils</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.profileContainer}>
              <Image source={{ uri: item.url }} style={styles.profileImage} />

              <View style={styles.textContainer}>
                <Text style={styles.label}>
                  {`Nom: `}
                  <Text style={styles.value}>{item.nom}</Text>
                </Text>

                <Text style={styles.label}>
                  {`Prenom: `}
                  <Text style={styles.value}>{item.prenom}</Text>
                </Text>
               
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.numero}`)}>
                  <Image source={require('../assets/call2.png')} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Chat', { userId: item.id, userName: `${item.nom} ${item.prenom}`, userphoto: item.url , userphone: item.numero })}>
                  <Image source={require('../assets/msg.png')} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default ListeProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  title: {
    fontSize: 24,
    marginTop: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row', // Align children horizontally
    alignItems: 'center', // Align children vertically
    borderWidth: 1,
    borderColor: '#7b844a',
    backgroundColor: 'rgba(251,211,213,0.9 )',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Assuming the image is a circle
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Take remaining space in the row
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666666',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});