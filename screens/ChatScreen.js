import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, FlatList, Image, Linking,TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../config';

const ChatScreen = ({ route }) => {
  const { userId, userName, userphoto,userphone } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const currentUserId = firebase.auth().currentUser?.uid;
  const chatId = [currentUserId, userId].sort().join('');

  useEffect(() => {
    let isMounted = true;

    const chatRef = firebase.database().ref('Chats').child(chatId).child('messages');
    const typingRef = firebase.database().ref('Chats').child(chatId).child('typing');

    const onNewMessage = (snapshot) => {
      if (isMounted) {
        const newMessage = snapshot.val();
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    const onTyping = (snapshot) => {
      if (isMounted) {
        setIsTyping(snapshot.val());
      }
    };

    chatRef.on('child_added', onNewMessage);
    typingRef.on('value', onTyping);

    return () => {
      isMounted = false;
      chatRef.off('child_added', onNewMessage);
      typingRef.off('value', onTyping);
    };
  }, [chatId]);

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      return;
    }

    const chatRef = firebase.database().ref('Chats').child(chatId).child('messages');
    const typingRef = firebase.database().ref('Chats').child(chatId).child('typing');
    const newMessageRef = chatRef.push();

    await newMessageRef.set({
      userId: currentUserId,
      text: message,
      isTyping: false,
    });

    typingRef.set(false); // Clear typing indicator when a message is sent
    setMessage('');
  };

  const handleTyping = () => {
    const typingRef = firebase.database().ref('Chats').child(chatId).child('typing');
    typingRef.set(true); // Set typing indicator to true when user starts typing

    // Clear typing indicator after a delay (e.g., 5 seconds)
    setTimeout(() => {
      typingRef.set(false);
    }, 5000);
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.container} blurRadius={2}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }} >
          <Image
            source={{ uri: userphoto }}
            style={styles.profileImage}
          />
          <Text style={styles.header}>{userName}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${userphone}`)}>
            <Image
              source={require('../assets/call2.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={item.userId === currentUserId ? styles.currentUserMessage : styles.otherUserMessage}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
        {isTyping && <Text style={styles.typingIndicator}>Typing...</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={message}
            onChangeText={(text) => {
              setMessage(text);
              handleTyping();
            }}
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 11,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e5a0ad',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#cc637b',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  messageText: {
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 8,
    borderRadius: 15,
    borderColor: '#b6212c',
  },
  sendButton: {
    backgroundColor: '#b6212c',
    padding: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  typingIndicator: {
    fontStyle: 'italic',
    color: '#666', // Adjust the color to a subtle gray
    marginTop: 5, // Add some spacing above the typing indicator
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});

export default ChatScreen;
