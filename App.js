import { StatusBar } from 'expo-status-bar';
import react, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home.js';
import Map from './Map.js';


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState(null);
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
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }
  



  // function Map(){
  //   return(
  //     <View style={styles.container}> 
  //     <MapView 
  //     style={styles.map} 
  //     initialRegion={{
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421
  //     }}
  //     showsUserLocation={true}
  //     //showsMyLocationButton={true} 
  //     >
  //       {/* <Marker coordinate={{latitude: markers.data[0].latitude, longitude: markers.data[0].longitude}}/> */}
  //     </MapView>
  //     </View>
  //   )
  // }


const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" >
          { (props) => <Home {...props} /> }
        </Tab.Screen> 

        <Tab.Screen name="Map">
          { (props) => <Map {...props} location={location}/>}
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