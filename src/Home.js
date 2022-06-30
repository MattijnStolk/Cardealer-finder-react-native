import { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, StatusBar, TouchableOpacity, TextInput, Button } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ markers, setMarkers }) {
  //globals
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([])
  const [text, onChangeText] = useState()
  const [data, setData] = useState()


  //when page loads, get everything from asyncstorage
  useEffect(() => {
    getData()
  }, [])

  //when the markers are fetched from app.js, put info in the dropdown
  useEffect(() => {
    const titles = []
    if (markers) {
      markers.map((marker) => {
        titles.push({ label: marker.title, value: marker.title })
      })
    }
    setItems(titles)
  }, [markers])

//rendering the flatlist
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.title}>{item[0] + '\n' + item[1]}</Text>
    </TouchableOpacity>
  );

  //saving info to asyncstorage
  async function saveInfo(text, title) {
    try {
      await AsyncStorage.setItem(title, text)
    } catch (err) {
      console.log(err)
    }
    getData()
  }

//get everything from asyncstorage
  async function getData() {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const storedData = await AsyncStorage.multiGet(keys)
      if (storedData !== null) {
        setData(storedData)
      } else {
        setData(['No data to display'])
      }
    } catch (err) {
      console.log(err)
    }
  }

  //function to wipe all async storage
  async function clearAsyncStorage(){
    await AsyncStorage.clear()
    getData()
  }

  return (
    <SafeAreaView style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <TextInput
        multiline
        numberOfLines={3}
        style={styles.inputText}
        onChangeText={onChangeText}
        value={text}
      />
      <Button
        title='Opslaan'
        onPress={() => saveInfo(text, value)}
        style={styles.button}
      />
      <Button 
        title='delete all data'
        onPress={() => clearAsyncStorage()}
        style={styles.button}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  inputText: {
    // height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#f9c2ff',
    backgroundColor: '#808080'
  },
  button: {
    paddingBottom: 12,
  },
  title: {
    fontSize: 32,
  },
});


