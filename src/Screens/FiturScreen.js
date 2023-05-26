import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { baseURL, myHeadersApiPublic } from "../service";

import { connect } from 'react-redux';
import { addOrder, deleteOrder } from '../redux/orderSlice';

const SoftwareScreen = ({ navigation, route, orderslist, addOrder, deleteOrder, ...props }) => {
  const [allrobot, setAllRobot] = useState([])

  const getrobot = () => {
    fetch(`${baseURL}/api/v1/robotproductpartdevice/all/`, {
      method: "POST",
      body: JSON.stringify({
        "idrobotmaster": route.params.idrobotmaster,
        "idrobotpartdevice": 3
      }),
      headers: myHeadersApiPublic
    })
      .then(response => response.json())
      .then(response => {
        setAllRobot(response.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getrobot()
  }, [])

  const renderRobot = () => {
    return allrobot.map((value, index) => {
      return (
        <View key={index} style={styles.itemContainer}>
          <Image source={{
            uri: `${baseURL}/${value.image}`
          }} style={styles.bannerPrdct} />
          <View style={{ width: "100%", height: 100 }}>
            <Text style={styles.textprice}>Rp. {value.price}</Text>
            <Text style={styles.textdes}>{value.namecomponent} /{value.unit}</Text>
            <Text style={styles.textlong}>{value.descriptioncomponent.slice(0, 70)}...</Text>
          </View>
          <TouchableOpacity onPress={() => {
            addOrder(value.id)
            ToastAndroid.showWithGravity(
              "Success Add to Checkout",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );

          }}

            style={styles.countContainer}

          >
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/992/992651.png' }} style={styles.icon} />
          </TouchableOpacity>
        </View>
      )
    })

  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3114/3114883.png' }} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Pilih Fitur</Text>
        <TouchableOpacity style={{ width: 60, height: 50, alignItems: "center", justifyContent: "center" }}>
          <Image
            source={{
              uri: "https://i.ibb.co/1dySJCJ/shopping-cart.png"
            }}
            style={{
              height: 30,
              width: 30
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "red", position: "absolute", right: 15, top: 0 }}>{orderslist.length}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.contentContainer}>
          {renderRobot()}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("CartScreen", {
          namerobotmaster: route.params.namerobotmaster
        })}
        style={{
          backgroundColor: '#FFF',
          borderRadius: 20,
          width: 100,
          position: "absolute",
          bottom: 10,
          right: 20,
          height: 50,
          alignItems: 'center',
          justifyContent: "center"
        }}>
        <Text style={{ color: "red", fontSize: 15, fontWeight: "bold" }}>Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#9E579D',
    marginTop: 20
  },
  header: { height: 50, backgroundColor: '#FFF', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  icon: { height: 24, width: 24 },
  title: { fontSize: 19, fontWeight: '600', color: '#000' },
  contentContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 20 },
  itemContainer: { backgroundColor: '#FFF', borderRadius: 10, padding: 10, width: '47%', marginTop: 20 },
  bannerPrdct: { height: 100, width: '100%', resizeMode: "contain" },
  textprice: { color: '#000', fontWeight: '500', textAlign: "left", fontSize: 12 },
  textdes: { color: '#000', fontWeight: '500', fontSize: 13 },
  textlong: { color: '#000', fontWeight: '500', fontSize: 10 },
  countContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, width: "100%", justifyContent: "center" }
});


const mapStateToProps = (state, myOwnProps) => {
  return {
    orderslist: state.orders.orderslist,
  }
}

const mapDispatchToProps = {
  // ... normally is an object full of action creators
  addOrder,
  deleteOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(SoftwareScreen);