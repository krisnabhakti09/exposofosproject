import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { baseURL, myHeadersApiPublic } from "../service";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from 'react-redux';
import { addOrder, deleteOrder } from '../redux/orderSlice';


const History = ({ navigation, route, orderslist, addOrder, deleteOrder, ...props }) => {
  const [allrobot, setAllRobot] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    getDataUser()
  }, [navigation])




  const getrobot = (userid) => {
    fetch(`${baseURL}/api/v1/robotorders/userid/`, {
      method: "POST",
      body: JSON.stringify({
        "userid": userid
      }),
      headers: myHeadersApiPublic
    })
      .then(response => response.json())
      .then(response => {
        if (response.data.length > 0) {
          const filteredArr = response.data.reduce((acc, current) => {
            const x = acc.find(item => item.kodeinvoice === current.kodeinvoice);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          console.log(filteredArr)
          setAllRobot(filteredArr)
          setLoading(false)
        } else {
          setLoading(false)
        }
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }


  const getDataUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if (value != null) {
        let myHeadersApiPrivate = new Headers();
        myHeadersApiPrivate.append("Accept", "application/json");
        myHeadersApiPrivate.append("Authorization", `Bearer ${JSON.parse(value)}`);

        fetch(`${baseURL}/api/v1/users/profile/`, {
          method: "GET",
          headers: myHeadersApiPrivate,
        })
          .then(response => response.json())
          .then(response => {
            console.log(response.data)
            getrobot(response.data.id)
          })
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const renderRobot = () => {
    return allrobot.map((value, index) => {
      return (
        <TouchableOpacity onPress={() => {
          if (value.recommended == "ya") {
            navigation.navigate("Detailhistoryrekomendasi", { value: value })
          } else {
            navigation.navigate("Detailhistory", { kodeinvoice: value.kodeinvoice })
          }
        }} key={index} style={styles.itemContainer}>
          <Text style={[styles.textprice, { fontWeight: "bold" }]}>{value.kodeinvoice}</Text>
          <Text style={styles.textdes}>{value.namerobotmaster} Rp.{value.totals}</Text>
        </TouchableOpacity>
      )
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { textAlign: "center" }]}>Riwayat Pesanan</Text>
      </View>
      <ScrollView>
        <View style={styles.contentContainer}>
          {loading ?
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator size={'large'} color="#fff" />
            </View>
            :
            renderRobot()
          }
        </View>
      </ScrollView>
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
  contentContainer: { flex: 1, alignItems: "center" },
  itemContainer: { backgroundColor: '#FFF', borderRadius: 10, padding: 10, width: '90%', marginTop: 20 },
  bannerPrdct: { height: 100, width: '100%', resizeMode: "contain" },
  textprice: { color: '#000', fontWeight: '500', textAlign: "left", fontSize: 12 },
  textdes: { color: '#000', fontWeight: '500', fontSize: 13 },
  textlong: { color: '#000', fontWeight: '500', fontSize: 10 },
  countContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, width: "100%", justifyContent: "center" }
});


const mapStateToProps = (state, myOwnProps) => {
  console.log(state.orders.orderslist)
  return {
    orderslist: state.orders.orderslist,
  }
}

const mapDispatchToProps = {
  // ... normally is an object full of action creators
  addOrder,
  deleteOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(History);