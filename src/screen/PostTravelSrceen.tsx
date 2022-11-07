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
import RNPickerSelect from 'react-native-picker-select';
import { STUDENT_ID } from '../Constants';


const PostTravelSrceen: React.FC<any> = ({ navigation }) => {

    // M Field

    // O Field
    const [origin, setOrigin] = React.useState("");
    const [destination, setDestination] = React.useState("");
    const [datetime, setDatetime] = React.useState("");
    const [detail, setDetail] = React.useState("");

    const update = async () => {
       

        return AsyncStorage.getItem(STUDENT_ID).then(sId => {

            const user = {
                origin: origin,
                destination: destination,
                datetime: datetime,
                detail: detail,
                studentId:sId
            }
            console.log(user)

            axios.post('http://10.0.2.2:8080/travel', user)

                .then(async response => {
                    if (response.status == 200) {
                        Alert.alert("Create Successful")

                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Travel' }],
                        })

                    } else {
                        Alert.alert("Create Failed")
                    }
                })
                .catch(error => {
                    Alert.alert("Create Failed")
                    console.log(error.message);
                });
        })
    }

    return (
        <ScrollView>
            <Background>
                <Header>Post Travel</Header>

                <TextInput
                    label="Origin"
                    returnKeyType="next"
                    onChangeText={setOrigin}

                />

                <TextInput
                    label="Destination"
                    returnKeyType="next"
                    onChangeText={setDestination}
                />

                <TextInput
                    label="Datetime"
                    returnKeyType="next"
                    onChangeText={setDatetime}
                />

                <TextInput
                    label="Detail"
                    returnKeyType="next"
                    onChangeText={setDetail}
                />

                <Button
                    mode="contained"
                    onPress={update}
                    style={{ marginTop: 24 }}
                >
                    POST TRAVEL
                </Button>
                <View style={styles.row}>
                    <Text></Text>
                    <TouchableOpacity onPress={() => navigation.replace('Home')}>
                        <Text style={styles.link}>CANCLE</Text>
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
    },
    input: {
        backgroundColor: theme.colors.surface,
    },

})



export default PostTravelSrceen;