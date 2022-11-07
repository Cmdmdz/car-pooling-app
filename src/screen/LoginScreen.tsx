import React from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
// import AsyncStorage from '@react-native-community/async-storage';
import { AUTH, STUDENT_ID } from '../Constants';



type Props = {
  [x: string]: any
}

const LoginScreen: React.FC<any> = ({ navigation }) => {

  const [studentId, onChangeEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  const onLoginPressed = async () => {

    const user = {
      studentId: studentId,
      password: password
    }
    console.log(user)
    return axios.post('http://10.0.2.2:8080/login', user)
      .then(async response => {
        if (response.status == 200) {
          Alert.alert("Login Successful")
          console.log(JSON.stringify(response.data))

          AsyncStorage.setItem(AUTH, response.data.auth)
          AsyncStorage.setItem(STUDENT_ID, response.data.studentId)
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })

        } else {
          Alert.alert("Login Failed")
        }
      })
      .catch(error => {
        Alert.alert("Login Failed")
        console.log(error);
      });
  }


  return (
    <ScrollView>
      <Background>
        {/* <BackButton goBack={navigation.goBack} /> */}
        <Logo />
        <Header>FIND TRAVEL</Header>
        <TextInput
          returnKeyType="next"
          onChangeText={onChangeEmail}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          returnKeyType="done"

          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>

        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Register')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})


export default LoginScreen


