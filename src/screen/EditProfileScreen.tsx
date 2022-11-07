import React, { useState } from 'react'
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
import { STUDENT_ID } from '../Constants';
import DropDownPicker from 'react-native-dropdown-picker';


const EditProfileScreen: React.FC<any> = ({ navigation }) => {

    // M Field
    const [name, setName] = React.useState({ value: '', error: '' });
    const [phone, setPhone] = React.useState({ value: '', error: '' });

    // O Field
    const [address, setAddress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: false },
        { label: 'Banana', value: true }
    ]);

    const update = async () => {

        const nameError = nameValidator(name.value)
        const phoneError = passwordValidator(phone.value)
        if (nameError || phoneError) {
            setName({ ...name, error: nameError })
            setPhone({ ...phone, error: phoneError })
            return
        }

        return AsyncStorage.getItem(STUDENT_ID).then(sId => {

            const user = {
                name: name.value,
                address: address,
                email: email,
                isDiver: value,
                studentId: sId,
                mobileNumber: phone.value,

            }
            console.log(user)

            axios.put('http://10.0.2.2:8080/update', user)

                .then(async response => {
                    if (response.status == 200) {
                        Alert.alert("Update Successful")

                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Profile' }],
                        })

                    } else {
                        Alert.alert("Update Failed")
                    }
                })
                .catch(error => {
                    Alert.alert("Update Failed")
                    console.log(error.message);
                });
        })



    }

    return (
            <Background>
                <Header>Update Profile</Header>

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
                    label="email"
                    returnKeyType="next"
                    onChangeText={setEmail}
                />

                <TextInput
                    label="Adress"
                    returnKeyType="next"
                    onChangeText={setAddress}
                />

                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />

                <Button
                    mode="contained"
                    onPress={update}
                    style={{ marginTop: 24 }}
                >
                    Update
                </Button>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigation.replace('Home')}>
                        <Text style={styles.link}>Cancle</Text>
                    </TouchableOpacity>
                </View>
            </Background>
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
    },
    input: {
        backgroundColor: theme.colors.surface,
    },


})



// const styles = StyleSheet.create({
//     container: {
//       width: '100%',
//       marginVertical: 12,
//     },

//     description: {
//       fontSize: 13,
//       color: theme.colors.secondary,
//       paddingTop: 8,
//     },
//     error: {
//       fontSize: 13,
//       color: theme.colors.error,
//       paddingTop: 8,
//     },
//   })


export default EditProfileScreen;