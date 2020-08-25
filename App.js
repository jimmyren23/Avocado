import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StatusBar,SafeAreaView, ActivityIndicator, FlatList} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import {Footer} from './navigationBar';
import {AddPostView} from './AddPostView';
import firestore from '@react-native-firebase/firestore';

// Deletes Post
function removePost(postID) {
  firestore()
  .collection('Avocado')
  .doc(postID)
  .delete()
  .then(() => {
    console.log('Post deleted!');
  });
}

function Posts() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [posts, setPosts] = useState([]); // Initial empty array of posts
  useEffect(() => {
  const subscriber = firestore()
    .collection('Avocado')
    .orderBy('Date', 'desc')
    .onSnapshot(querySnapshot => {
      const posts = [];
      querySnapshot.forEach(documentSnapshot => {
        posts.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setPosts(posts);
      setLoading(false);
      console.log(posts);
    });
  // Unsubscribe from events when no longer in use
  return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <View style={{ height: 200, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {item.Title}</Text>
          <Text>Description: {item.Description}</Text>
          <Text>Rating: {item.Rating} / 10 </Text>
          <Text> Date Published: {item.Date}</Text>
          <Text> Date Published: {item.key}</Text>
          <Button title="delete post" onPress={() => removePost(item.key)}/>
          <Button title="edit post"/>
        </View>
      )}
    />
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed"
      screenOptions = {{ headerLeft: null, animationEnabled: false,  headerShown: false}}>
        <Stack.Screen name="Feed" component={FeedView}/>
        <Stack.Screen name="Create Post" component={CreatePostView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function FeedView({ navigation }) {
  const usersCollection = firestore().collection('Users');
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
            <Posts/>
            <Footer/>
        </View>
      </SafeAreaView>
    </>
  );
}

//Separate page to add new post
function CreatePostView({ navigation }) {
  const [newPostName, setNewPostName] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <AddPostView/>
          <Footer/>
        </View>
      </SafeAreaView>
    </>
  );
}



export default App;
