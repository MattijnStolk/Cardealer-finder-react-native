import { StatusBar } from 'expo-status-bar';
import react, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


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
      //toCoordinates('96 Meent 3011 JP Rotterdam')
      //console.log(markers.data[0].longitude)
    })();
  }, []);

  if (errorMsg) { alert(errorMsg)}

  function getData(){
    fetch(`https://stud.hosted.hr.nl/0986087/carstuff/autodealers.json`)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err))
  }

  //368e7f16fb9dfb925ece44370674ab2c
  function toCoordinates(adress){
    fetch(`http://api.positionstack.com/v1/forward?access_key=368e7f16fb9dfb925ece44370674ab2c&query=${adress}&output=json&country=NL&limit=1`)
    .then(res => res.json())
    .then(data => setMarkers(data))
    .catch(err => console.log(err))
  }

  function ShowHome(){
    //lijst met autodealers/merken
    //als je op een van deze merken klikt wordt dit een 'filter' voor de map
    return(
      <View>
        <Text>Hello</Text>
      </View>
    )
  }

  function ShowMap(){
    return(
      <View style={styles.container}> 
      <MapView 
      style={styles.map} 
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      showsUserLocation={true}
      //showsMyLocationButton={true} 
      >
        {/* <Marker coordinate={{latitude: markers.data[0].latitude, longitude: markers.data[0].longitude}}/> */}
      </MapView>
      </View>
    )
  }


const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={ShowHome} />
        <Tab.Screen name="Map" component={ShowMap} />
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
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});