import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import email from '../assets/icons8-email-48.png';
import phone from '../assets/phone-call.png';
import location from '../assets/icons8-location-50.png';
import user from '../assets/user_icon.jpg';
import back from '../assets/icons8-back-26.png';

export default function UserInfo() {

    const navigation = useNavigation();
        return (

        <View>
            <Image 
            source={phone}
            style = {styles.phone}/>

            <Image
            source={location}
            style = {styles.location}
            />

            <Image
            source={email}
            style = {styles.email}/>

            <Image
            source={user}
            style={styles.image}
            />    

            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
                source={back}
                style={styles.back}/>
            </TouchableOpacity>
            
            <Text style={styles.number}>Phone: 123-456-7890</Text>

            <Text style={styles.address}>Location: New York</Text>

            <Text style={styles.emailadress}>Email: john@example.com</Text>
            
            <Text style={styles.username}>Zaki Bachir</Text>

        </View>
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

