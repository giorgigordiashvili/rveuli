import React from 'react'
import { StyleSheet,View, Text,Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({navigation}) {
    return (
        <LinearGradient colors={['#7BE495', '#329D9C']}
        style={styles.container}>
            <View style={styles.logoes}>
                  <Image style={styles.logo} source={require('../assets/clipboard.png')}></Image>
                  <Image style={styles.logo} source={require('../assets/logoText.png')}></Image>
                  <Text style={styles.logoText}>შეასრულე ბუღალტრის ფუნქცია და მართე საკუთარი ფინანსები აპლიკაციით</Text>
            </View>
      
        <View style={styles.buttons}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>       
                <Text style={styles.buttonText}>შესვლა</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>       
                <Text style={styles.buttonText}>რეგისტრაცია</Text>
            </TouchableOpacity>
        </View>
      </LinearGradient>
   
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
        width: "30%",
        resizeMode: "contain",
        margin:16
    },
    button: {
        width: "100%",
        alignSelf: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 15,
        margin: 10
    },
    buttonText: {
        textAlign: "center",
        color: "#55C595",
        fontSize: 17,
        fontFamily: "NinoBold"
    },
    logoes: {
        flex:1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    buttons: {
        flex:0.5,
        width: "72%",
        justifyContent: 'center',
    },
    logoText: {
        textAlign: "center",
        fontSize: 14,
        
        color: "#FFFFFF",
        width: "75%"
    }
  });
  