import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import * as Font from 'expo-font';
import DashboardScreen from './components/DashboardScreen';


let customFonts = {
  'FiragoRegular': require('./assets/fonts/FiraGO-Regular.otf'),
  'FiragoBold': require('./assets/fonts/FiraGO-Bold.otf'),
  'FiragoThin': require('./assets/fonts/FiraGO-Thin.otf'),
  'Nino': require('./assets/fonts/bpg-nino-mtavruli-webfont.ttf'),
  'NinoBold' : require('./assets/fonts/bpg-nino-mtavruli-bold-webfont.ttf')
};

const Stack = createStackNavigator();


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync(customFonts);
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  return (
    (fontsLoaded) ? 
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />

      </Stack.Navigator>
    </NavigationContainer> : <View></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
