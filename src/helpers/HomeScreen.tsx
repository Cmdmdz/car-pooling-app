import { View, Text, Alert, StyleSheet, TouchableOpacity, StatusBar, TouchableHighlight } from 'react-native'
import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import AsyncStorage from '@react-native-community/async-storage';
import { AUTH, STUDENT_ID } from '../Constants'
import axios from 'axios'
import { theme } from '../core/theme'




const HomeScreen: React.FC<any> = ({ navigation }) => {

  const [data, setData] = React.useState("")
  const [onDiver, setOnDiver] = React.useState(false)

  React.useEffect(() => {

    findByStudentId();

  }, [])

  const logout = async () => {
    AsyncStorage.removeItem(AUTH)
    AsyncStorage.removeItem(STUDENT_ID)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  }

  const findByStudentId = async () => {

    return AsyncStorage.getItem(STUDENT_ID)
      .then(async sid => {

        await axios.get(`http://10.0.2.2:8080/get/${sid}`,)
          .then(async response => {
            if (response.status == 200) {
              setOnDiver(response.data.isDiver)
              setData(response.data.name)
            } else {
              Alert.alert("load data Failed")
            }
          })
          .catch(error => {
            Alert.alert("load data Failed")
            console.log(error);
          });

      })
  }

  const isDiver = (diver: Boolean) => {
    if (diver) {
      return <Paragraph>Driver member</Paragraph>;

    } else {

      return <Paragraph>general member</Paragraph>;
    }
  }

  return (
    <Background>

      <Header>WELCOME</Header>
      <Header></Header>

      <Paragraph>
        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Profile' }],
            })
          }
        >
          {isDiver(onDiver)}
        </Button>
      </Paragraph>


      <Button style={styles.loginButton} mode="contained" onPress={() =>
        navigation.reset({
          index: 0,
          routes: [{ name: 'Travel' }],
        })
      }>
        View Travel
      </Button>

      <Button style={styles.logoutButton} mode="contained" onPress="">
        POST
      </Button>

    </Background>
  )
}




const styles = StyleSheet.create({

  loginButton: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 40,
    borderRadius: 10,
    justifyContent: 'center'
  },
  logoutButton: {
    height: 50,
    backgroundColor: '#3C930D',
    alignSelf: 'stretch',
    marginTop: 40,
    borderRadius: 10,
    justifyContent: 'center'
  },
  registerButton: {
    height: 50,
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  loginButtonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  registerButtonText: {
    fontSize: 24,
    color: '#0007',
    alignSelf: 'center'
  },

});



export default HomeScreen