// This is the main layout file for the app. It is the first file that is loaded when the app starts.
import React from 'react'
import { Stack ,SplashScreen} from 'expo-router'
import { useFonts } from "expo-font";
import { useEffect } from 'react';
import "../global.css";
import GlobalProvider from '@/context/GlobalProvider'
import { StatusBar } from 'expo-status-bar';


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
      });
   
     useEffect(() =>{
        if(error) throw error;

        if(fontsLoaded){
            SplashScreen.hideAsync();
        }
     } ,[error,fontsLoaded])
     if(!fontsLoaded && !error) return null;

  return (
    
    <GlobalProvider>
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
    </Stack>
    <StatusBar/>
    </GlobalProvider>
    
  )
}

export default RootLayout



