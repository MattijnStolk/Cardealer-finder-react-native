import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/Home.js';
import Map from './src/Map.js';
import List from './src/List.js';
import Settings from './src/Settings.js'


export default function App() {
  //Variables
  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState(null)
  const [theme, setTheme] = useState('light')

  //when page loads, check if permission for location
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

  //fetch data from API
  function getData(){
    fetch(`https://stud.hosted.hr.nl/0986087/carstuff/autodealers.json`)
    .then(res => res.json())
    .then(data => {setData(data); initMarkers(data)})
    .catch(err => console.log(err))
  }

  //convert into actually usefull syntax
  function initMarkers(data){
    for (const single of data) {
      setMarkers(current => [...current, {
        title: single.name,
        coords : {
          longitude: (1*single.adress.lon),
          latitude: (1*single.adress.lat)
        },
        description: single.brands.join(', '),
        info: ''
      }])
    }
  }

//main navigation
const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator>
        <Tab.Screen name="Home" >
          { (props) => <Home {...props} markers={markers} setMarkers={setMarkers}/> }
        </Tab.Screen> 

        <Tab.Screen name="Map">
          { (props) => <Map {...props} location={location} markers={markers}/>}
        </Tab.Screen>

        <Tab.Screen name="List">
          { (props) => <List {...props} markers={markers}/>}
        </Tab.Screen>

        { <Tab.Screen name='Settings'>
          { (props) => <Settings {...props} theme={theme} setTheme={setTheme}/>}
        </Tab.Screen> }

      </Tab.Navigator>
    </NavigationContainer>
  );
  
}
