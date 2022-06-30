import {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Button } from "react-native";

export default function Settings( {theme, setTheme}) {
    //variables
    const [oppositeTheme, setOppositeTheme] = useState()

    //when theme changes, change the opposite theme for the button
    useEffect(()=> {
        if (theme == 'dark') {
            setOppositeTheme('light')
        } else {
            setOppositeTheme('dark')
        }    
    }, [theme])

    //on button press, switch the theme
    function toggleSwitch(currentTheme){
        if( currentTheme === 'dark'){
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <Button 
            title={`Change theme to ${oppositeTheme}`}
            onPress={ ()=> toggleSwitch(theme) }
            />
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });