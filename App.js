import react, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home.js';
import Map from './Map.js';
import List from './List.js'


export default function App() {
  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      getData()
      
      console.log(location)
    })();
  }, []);

  if (errorMsg) { alert(errorMsg)}

  function getData(){
    fetch(`https://stud.hosted.hr.nl/0986087/carstuff/autodealers.json`)
    .then(res => res.json())
    .then(data => {setData(data); initMarkers(data)})
    .catch(err => console.log(err))
  }

  function initMarkers(data){
    for (const single of data) {
      setMarkers(current => [...current, {
        title: single.name,
        coords : {
          longitude: (1*single.adress.lon),
          latitude: (1*single.adress.lat)
        },
        description: single.brands.join(', ')
      }])
    }
  }


const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" >
          { (props) => <Home {...props} markers={markers}/> }
        </Tab.Screen> 

        <Tab.Screen name="Map">
          { (props) => <Map {...props} location={location} markers={markers}/>}
        </Tab.Screen>

        <Tab.Screen name="List">
          { (props) => <List {...props} markers={markers}/>}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})