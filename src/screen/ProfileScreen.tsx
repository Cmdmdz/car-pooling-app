
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,

} from 'react-native';
import { Paragraph } from 'react-native-paper';
import Button from '../components/Button';
import { STUDENT_ID } from '../Constants';
import { theme } from '../core/theme';

const ProfileScreen: React.FC<any> = ({ navigation }) => {


  const [data, setData] = React.useState({
    name: "",
    address: "",
    onDiver: false,
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
                onDiver: result.isDiver,
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

  const isDiver = (diver: Boolean) => {
    if (diver == true) {
      return <Text>DIVER</Text>;

    } else {

      return <Text>GENERAL</Text>;
    }
  }

  return (

    <View style={styles.container}>
      <View style={[styles.card, styles.profileCard]}>
        {/* <Image style={styles.avatar} source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }} /> */}
        <Text style={styles.name}>{data.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTittle}>Address</Text>
        <Text>{data.address}</Text>

      </View>

      <View style={styles.card}>
        <Text style={styles.cardTittle}>Contact</Text>
        <Text>Phone : {data.phone}</Text>
        <Text>Email : {data.email}</Text>

      </View>

      <View style={styles.card}>
        <Text style={styles.cardTittle}>Status</Text>
        <Text>Member : {isDiver(data.onDiver)}</Text>
      </View>

      <View style={styles.row} >
        <Button style={styles.buttonEdit} onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'EditProfile' }],
          })
        }} mode="contained"   >
          Edit
        </Button>
        <Button style={styles.buttonBack} onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        }} mode="contained" >
          Home
        </Button>
      </View>



    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#D0F4DE"
  },
  cardTittle: {
    color: "#808080",
    fontSize: 22,
    marginBottom: 5,
  },
  avatar: {
    width: 150,
    height: 150,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    height: 100,
    marginTop: 10,
  },
  profileCard: {
    // height: 200,
    alignItems: 'center',
    marginTop: 20,
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    color: "#808080",
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
  },
  photosCard: {
    marginTop: 10,
  },
  photo: {
    width: 113,
    height: 113,
    marginTop: 5,
    marginRight: 5,
  },
  row: {
    borderRadius: 10,
    padding: 10,
    height: 100,
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonEdit: {
    marginHorizontal: "5%",
    width: '40%',
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 4,
  },
  buttonBack: {
    marginHorizontal: "5%",
    width: '40%',
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 4,
  },
});



export default ProfileScreen;
