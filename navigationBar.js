import React, {useState}  from 'react';
import {View, ScrollView, FlatList, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export function Footer() {
  const navigation = useNavigation();

  return(
    <View style={ styles.bottomView } >
      <Button type="outline" title="Feed" onPress={() => navigation.navigate('Feed')}/>
      <Button type="outline" title="Create Post" onPress={() => navigation.navigate('Create Post')}/>
    </View>
  );
}

const styles = StyleSheet.create(
{
    MainContainer:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },

    bottomView:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: 50,
      backgroundColor: '#FF9800',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
    },

    textStyle:{

      color: '#fff',
      fontSize:22
    }
});
