import React from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { nameValidator } from '../helpers/nameValidator';
import { sIdValidator } from '../helpers/sIdValidator';
import { passwordValidator } from '../helpers/passwordValidator';

const RegisterScreen: React.FC<any> = ({ navigation }) => {

  const [name, setName] = React.useState({ value: '', error: '' });
  const [phone, setPhone] = React.useState({ value: '', error: '' });
  const [studentId, setStudentId] = React.useState({ value: '', error: '' });
  const [password, setPassword] = React.useState({ value: '', error: '' });

  const register = async () => {
    const nameError = nameValidator(name.value)
    const studentIdError = sIdValidator(studentId.value)
    const phoneError = passwordValidator(phone.value)
    const passwordError = passwordValidator(password.value)
    if (passwordError || nameError || studentIdError || phoneError) {
      setName({ ...name, error: nameError })
      setPhone({ ...phone, error: phoneError })
      setStudentId({ ...studentId, error: studentIdError })
      setPassword({ ...password, error: passwordError })
      return
    }

    const user = {
      name: name.value,
      studentId: studentId.value,
      mobileNumber: phone.value,
      password: password.value
    }

     axios.post('http://10.0.2.2:8080/register', user)
      .then(async response => {
        if (response.status == 200) {
          Alert.alert("Register Successful")

          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })

        } else {
          Alert.alert("Register Failed")
        }
      })
      .catch(error => {
        Alert.alert("Register Failed")
        console.log(error);
      });

  }

  return (
    <ScrollView>
    <Background>
      <Header>Create Account</Header>
      <TextInput
        label="Student ID"
        returnKeyType="next"
        onChangeText={(text: any) => setStudentId({ value: text, error: '' })}
        error={!!studentId.error}
        errorText={studentId.error}
      />
      <TextInput
        label="Your name"
        returnKeyType="next"
        onChangeText={(text: any) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Phone"
        returnKeyType="next"
        onChangeText={(text: any) => setPhone({ value: text, error: '' })}
        error={!!phone.error}
        errorText={phone.error}

      />

      <TextInput
        label="Password"
        returnKeyType="done"
        secureTextEntry
        onChangeText={(text: any) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
      />
      <Button
        mode="contained"
        onPress={register}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 2,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  }


})


export default RegisterScreen;