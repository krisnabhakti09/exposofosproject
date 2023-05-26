import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { connect } from 'react-redux';
import { addOrder, deleteOrder } from '../redux/orderSlice';
import { baseURL } from "../service";

const DetailRecommended = ({ navigation, route, orderslist, addOrder, deleteOrder, ...props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3114/3114883.png' }} style={styles.icon} />
        </TouchableOpacity>
        <View style={{ width: "100%" }}>
          <Text style={[styles.title, { textAlign: "center", marginRight: 5 }]}>Detail {route.params.value.name}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={{ height: 200, width: "100%", alignItems: "center", justifyContent: "center" }}>
          <Image source={{
            uri: `${baseURL}/${route.params.value.image}`
          }}
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "contain"
            }}
          />
        </View>
      </View>
      <View style={{
        height: "65%",
        width: "100%",
        backgroundColor: "#9E579D",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        position: "absolute",
        bottom: 0,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30
      }}>
        <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold", paddingLeft: 20, paddingTop: 20 }}>{route.params.value.name}</Text>
        <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold", paddingLeft: 20, paddingTop: 20 }}>Rp{route.params.value.price}</Text>
        <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold", paddingLeft: 20, paddingTop: 20 }}>{route.params.value.description}</Text>
      </View>
      <View style={{ height: 100, width: "100%", alignItems: "center", justifyContent: "flex-end", bottom: 10, position: "absolute", }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CartScreenrecomended", {
            value: route.params.value,
          })}
          style={{
            backgroundColor: '#FFF',
            borderRadius: 30,
            width: 120,
            height: 50,
            alignItems: 'center',
            justifyContent: "center"
          }}>
          <Text style={{ color: "red", fontSize: 15, fontWeight: "bold" }}>Add to Cart</Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: '#FFF',
            borderRadius: 20,
            width: 100,
            height: 5,
            alignItems: 'center',
            justifyContent: "center",
            marginTop: 6
          }} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20
  },
  header: { height: 50, backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailRecommended);