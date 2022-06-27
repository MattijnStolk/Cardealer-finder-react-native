import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map({ location, data, markers, setMarkers }) {
  console.log("in map")
  console.log(location)
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
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsTraffic={true}
      >
        {markers.map(marker => (
          <Marker key={marker.title} coordinate={marker.coordinates} title={marker.title} description={marker.description}/>
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