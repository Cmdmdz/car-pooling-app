import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    TextInput,
    FlatList,
    Alert
} from 'react-native';
import { STUDENT_ID } from '../Constants';

const ListTravelScreen: React.FC<any> = ({ navigation }) => {

    // const data = [
    //     { id: 1, icon: "https://img.icons8.com/color/70/000000/cottage.png", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit" },
    //     { id: 2, icon: "https://img.icons8.com/color/70/000000/administrator-male.png", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit" },
    //     { id: 3, icon: "https://img.icons8.com/color/70/000000/filled-like.png", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit" },
    //     { id: 4, icon: "https://img.icons8.com/color/70/000000/facebook-like.png", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit" },
    //     { id: 5, icon: "https://img.icons8.com/color/70/000000/shutdown.png", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit" },
    //     { id: 6, icon: "https://img.icons8.com/color/70/000000/traffic-jam.png", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit" },
    //     { id: 7, icon: "https://img.icons8.com/dusk/70/000000/visual-game-boy.png", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit" },
    //     { id: 8, icon: "https://img.icons8.com/flat_round/70/000000/cow.png", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit" },
    //     { id: 9, icon: "https://img.icons8.com/color/70/000000/coworking.png", description: "Lorem ipsum dolor sit amet, indu consectetur adipiscing elit" },
    // ]

    const [data, setData] = React.useState([
        {
            origin: "",
            destination: "",
            datetime: "",
            detail: "",
            name: "",
            id: ""
        }
    ])


    React.useEffect(() => {

        findByStudentId();

    }, [])

    const findByStudentId = async () => {

        return AsyncStorage.getItem(STUDENT_ID)
            .then(async sid => {

                await axios.get(`http://10.0.2.2:8080/travel`,)

                    .then(async response => {

                        if (response.status == 200) {
                            const result = response.data;
                            setData(result)

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

    const [search, setSearch] = React.useState({ data })

    return (
        <View style={styles.container}>
            <View style={styles.formContent}>
                <View style={styles.inputContainer}>
                    <Image style={[styles.icon, styles.inputIcon]} source={{ uri: 'https://img.icons8.com/search/androidL/100/2ecc71' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Search"
                        underlineColorAndroid='transparent'
                        onChangeText={(name_address: any) => setSearch(name_address)} />
                </View>

                <TouchableHighlight style={styles.saveButton} onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })}>
                    <Image style={[styles.icon, styles.iconBtnSearch]} source={{ uri: 'https://img.icons8.com/search/androidL/100/ffffff' }} />
                </TouchableHighlight>
            </View>

            <FlatList
                style={styles.notificationList}
                data={data}
                renderItem={({ item }) => {
                    console.log(item)

                    return (
                        <View style={styles.notificationBox}>
                            {/* <Image style={styles.image}
                                source={{ uri: item.icon }} /> */}
                            <Text style={styles.tile}>{item.name}</Text>
                            <Text style={styles.description}>Origin  {item.origin}</Text>
                            <Text style={styles.description}>Destination : {item.destination}</Text>
                            <Text style={styles.description}>Datetime : {item.datetime}</Text>
                            <Text style={styles.description}>Note : {item.detail}</Text>
                        </View>
                    )
                }} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D0F4DE',
    },
    formContent: {
        flexDirection: 'row',
        marginTop: 30,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        margin: 10,
    },
    icon: {
        width: 30,
        height: 30,
    },
    iconBtnSearch: {
        alignSelf: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        marginLeft: 15,
        justifyContent: 'center'
    },
    saveButton: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        width: 70,
        alignSelf: 'flex-end',
        backgroundColor: '#40E0D0',
        borderRadius: 30,
    },
    saveButtonText: {
        color: 'white',
    },
    notificationList: {
        marginTop: 20,
        padding: 10,
    },
    notificationBox: {
        padding: 20,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        borderRadius: 10,
    },
    image: {
        width: 45,
        height: 45,
    },
    description: {
        fontSize: 18,
        marginLeft: 10,
    },
    tile: {
        fontSize: 25,
        color: "#3498db",
        marginLeft: 10,
    },
});

export default ListTravelScreen