import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'



export default function UserInfo() {

    const navigation = useNavigation();
        return (

        <View>
            <Image 
            source={require('C:/Users/jadal/OneDrive/Desktop/CMPS 271/CMPS271-Ropemaxxing/assets/phone-call.png')}
            style = {styles.phone}/>

            <Image
            source={require('C:/Users/jadal/OneDrive/Desktop/CMPS 271/CMPS271-Ropemaxxing/assets/icons8-location-50.png')}
            style = {styles.location}
            />

            <Image
            source={require('C:/Users/jadal/OneDrive/Desktop/CMPS 271/CMPS271-Ropemaxxing/assets/icons8-email-48.png')}
            style = {styles.email}/>

            <Image
            source={require('C:/Users/jadal/OneDrive/Desktop/CMPS 271/CMPS271-Ropemaxxing/assets/user_icon.jpg')}
            style={styles.image}
            />    

            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
                source={require('C:/Users/jadal/OneDrive/Desktop/CMPS 271/CMPS271-Ropemaxxing/assets/icons8-back-26.png')}
                style={styles.back}/>
            </TouchableOpacity>
            
            <Text style={styles.number}>Phone: 123-456-7890</Text>

            <Text style={styles.address}>Location: New York</Text>

            <Text style={styles.emailadress}>Email: john@example.com</Text>
            
            <Text style={styles.username}>Zaki Bachir</Text>

        </View>
    );    
}


function BackButton() {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.navigate('App')}>
        <Image
                    source={require('C:/Users/jadal/OneDrive/Desktop/CMPS 271/CMPS271-Ropemaxxing/assets/icons8-back-26.png')}
                    style={styles.back}/>
      </TouchableOpacity>
    );
  }
  
const styles = StyleSheet.create({
    phone: {
      position: 'absolute',
      top: 300,
      left:80,
      width: 30,
      height: 30,
    },
    location:{
        position: 'absolute',
        top: 400,
        left:80,

        width: 30,
        height: 30,
    },
    email:{
        position: 'absolute',
        top: 500,
        left:80,
        width: 30,
        height: 30,
    },
    image:{
        position: 'absolute',
        width: 60,
        height:60,
        left:175,
        top:140,
    },
    back:{
        position: 'absolute',
        width: 30,
        height:30,
        top:50,
        left:20
    },

    username:{
        top: 155,
        left: 171,
    },

    number: {
        top: 300,
        left:140,
        height: 20
    },

    address:{
        top: 385,
        left: 140
    },

    emailadress: {
        top:465,
        left: 140
    }

  });

