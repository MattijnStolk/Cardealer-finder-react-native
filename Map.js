import { LocationEventEmitter } from 'expo-location/build/LocationEventEmitter.js';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, LogBox, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map({ location, markers, route } ) {
  const mapView = React.createRef();

  useEffect(()=> {
    if (route.params) {
      console.log(route.params)
    } else {
      console.log('no params')
    }

    if(route.params?.currentMarker){
      changeRegion(route.params?.currentMarker)
    } else {
      changeRegion(location)
    }
  
    function changeRegion(loc){
      const targetLatitude = loc.coords.latitude
      const targetLongitude = loc.coords.longitude
      mapView.current.animateToRegion({
        latitude: targetLatitude,
        longitude: targetLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }, 1000)
    }
  
    console.log("in map")
    //console.log(location)
  })
  

  
  //console.log(data)

  // useEffect(() => {
    
  // }, [])


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        ref={mapView}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsTraffic={true}
      >
        {markers.map(marker => (
          <Marker key={marker.title} coordinate={marker.coords} title={marker.title} description={marker.description}/>
        ))}
      </MapView>
    </View>
  )
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