import React, {useState} from 'react'
import { StyleSheet,View, Text,Image, TouchableOpacity, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function RegisterScreen({navigation}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");



    return (
        <View style={styles.container}>
            <View style={styles.textOver}>
                <Text style={styles.bigText}>
                    გამარჯობა!
                </Text>
                <Text style={styles.smallText}>
                    რეგისრაციისთვის გთხოვთ შეავსოთ  მოცემული ველები რათა გაიაროთ რეგისტრაცია
                </Text>
            </View>
            <View style={styles.inputs}>
                
                <TextInput style={styles.input}
                            onChangeText={text => setUsername(text)}
                            placeholder="მომხმარებელი"
                            value={username}/>
                            <TextInput style={styles.input}
                            placeholder="პაროლი"
                            onChangeText={text => setPassword(text)}
                            value={password}/>
                            <TextInput style={styles.input}
                            placeholder="გაიმეორეთ პაროლი"
                            onChangeText={text => setRepeatPassword(text)}
                            value={repeatPassword}/>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} >   
                    <LinearGradient style={styles.button} colors={['#7BE495', '#329D9C']}>
                        <Text style={styles.buttonText}>რეგისტრაცია</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.underTextContainer}>
                    <Text style={styles.underText}>გააქვს უკვე ანგარიში?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.underTextBold}> - შესვლა</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
   
        
    )
}

const styles = StyleSheet.create({
    underTextContainer: {
        flexDirection: "row",
        justifyContent: "center",
        margin: 5
    },
    underTextBold: {
        fontFamily: "NinoBold"
    },
    underText: {
        fontFamily: "Nino"
    },
    textOver: {
        flex:1,
        justifyContent: "center",
        alignContent: "center",
        width: "80%"
    },
    bigText: {
        margin:12,
        color: "#1B4B6D",
        fontSize: 35,
        textAlign: "center"
    },
    smallText: {
        margin:12,
        color: "#1B4B6D",
        fontSize: 16,
        textAlign: "center",
        fontFamily: "FiragoThin"
    },
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    button: {
        width: "100%",
        alignSelf: "center",
        padding: 15,
        borderRadius: 15,
        margin: 10
    },
    buttonText: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 17,
        fontFamily: "NinoBold"
    },
    inputs: {
        flex:0.5,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        
    },
    
    input: {
        width: "82%",
        height: 50,
        alignSelf: "center",
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#329D9C",
        margin:5,
        padding: 15,
        
    },
    buttons: {
        flex:1,
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
  