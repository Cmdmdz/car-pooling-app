import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH, STUDENT_ID } from '../Constants';
import axios from 'axios';

const HomeScreen: React.FC<any> = ({ navigation }) => {

    const [data, setData] = React.useState({
        name: "",
        address: "",
        isDiver: false,
        phone: "",
        email: "",
    })

    React.useEffect(() => {

        findByStudentId();

    }, [])

    const findByStudentId = async () => {

        return AsyncStorage.getItem(STUDENT_ID)
            .then(async sid => {

                await axios.get(`http://10.0.2.2:8080/get/${sid}`,)

                    .then(async response => {

                        if (response.status == 200) {
                            const result = response.data;

                            setData({
                                name: result.name,
                                address: result.address,
                                isDiver: result.isDiver,
                                phone: result.mobileNumber,
                                email: result.email,
                            })

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

    const isDiver = () => {

        if (data.isDiver) {
            return [
                { id: 1, name: "Edit Profile", image: "https://cdn-icons-png.flaticon.com/512/4428/4428551.png" },
                { id: 2, name: "Travel", image: "https://cdn-icons-png.flaticon.com/512/2831/2831972.png" },
                { id: 3, name: "Post Travel", image: "https://cdn-icons-png.flaticon.com/512/4400/4400483.png" },
                { id: 4, name: "Log out", image: "https://cdn-icons-png.flaticon.com/512/4400/4400483.png" },
            ]
        } else {
            return [
                { id: 1, name: "Edit Profile", image: "https://cdn-icons-png.flaticon.com/512/4428/4428551.png" },
                { id: 2, name: "Travel", image: "https://cdn-icons-png.flaticon.com/512/2831/2831972.png" },
                { id: 4, name: "Log out", image: "https://cdn-icons-png.flaticon.com/512/4400/4400483.png" },
            ]
        }

    }


    const clickEventListener = (item: any) => {

        if (item.id == 1) {
            return navigation.reset({
                index: 0,
                routes: [{ name: 'Profile' }],
            })
        } else if (item.id == 2) {
            return navigation.reset({
                index: 0,
                routes: [{ name: 'Travel' }],
            })
        } else if (item.id == 3) {
            return navigation.reset({
                index: 0,
                routes: [{ name: 'PostTravel' }],
            })

        } else if (item.id == 4) {

            AsyncStorage.removeItem(AUTH);
            AsyncStorage.removeItem(STUDENT_ID);
            return navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        }

        Alert.alert('Message', 'Item clicked. ' + item.name);
    }

    const renderRow = ({ item, index }: any) => (
        <TouchableOpacity style={styles.card} onPress={() => { clickEventListener(item) }}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                {/* <Text style={styles.count}>{item.count}</Text> */}
                <TouchableOpacity style={styles.followButton} onPress={() => clickEventListener(item)}>
                    <Text style={styles.followButtonText}>Explore now</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );


    return (

        <View style={styles.container}>
            <FlatList
                style={styles.contentList}
                // columnWrapperStyle={styles.container}
                data={isDiver()}
                keyExtractor={(item: any) => {
                    return item.id;
                }}
                renderItem={renderRow}
            />
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D0F4DE",
        padding: 20,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',

    },
    contentList: {
        flex: 1,
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: "#ebf0f7"
    },

    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: "white",
        padding: 10,
        flexDirection: 'row',
        borderRadius: 30,
    },

    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#3399ff",
        fontWeight: 'bold'
    },
    count: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#6666ff"
    },
    followButton: {
        marginTop: 10,
        height: 35,
        width: 100,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#dcdcdc",
    },
    followButtonText: {
        color: "#dcdcdc",
        fontSize: 12,
    },
});

export default HomeScreen;