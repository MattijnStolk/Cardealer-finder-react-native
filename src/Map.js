import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map({ location, markers, route } ) {
  //create map reference
  const mapView = React.createRef();

  //if a parameter changes, change the region of the map
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
  
  }, [route.params?.currentMarker])

  //change region in the map
  function changeRegion(loc){
    mapView.current.animateToRegion({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }, 1000)
  }

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
          <Marker 
            key={marker.title} 
            coordinate={marker.coords} 
            title={marker.title} 
            description={marker.description}
          />
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