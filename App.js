import { StatusBar } from 'expo-status-bar';
import react, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location)
    })();
  }, []);

  if (errorMsg) { alert(errorMsg)}

  function ShowHome(){
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
      showsMyLocationButton={true}
      />
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