import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map( {location} ){
    console.log("in map")
    console.log(location)
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