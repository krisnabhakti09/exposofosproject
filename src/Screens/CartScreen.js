import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, ToastAndroid, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addOrder, deleteOrder } from '../redux/orderSlice';
import { baseURL, myHeadersApiPublic } from '../service/index';

export const kurirs = [
  {
    "brand": "JNE REG",
    "desc": "Akan sampai tanggal 29 - 30 Okt",
    "price": 17000
  },
  {
    "brand": "JNT REG",
    "desc": "Akan sampai tanggal 29 - 30 Okt",
    "price": 19000
  },
  {
    "brand": "POS",
    "desc": "Akan sampai tanggal 01 - 03 Des",
    "price": 20000
  }
]


export const methods = [
  {
    "brand": "BNI",
    "sn": "8343543853884",
    "price": 3000
  },
  {
    "brand": "BCA",
    "sn": "7575676767676",
    "price": 3500
  },
  {
    "brand": "MANDIRI",
    "sn": "24234323243",
    "price": 4000
  }
]

const CartScreen = ({ navigation, route, orderslist, addOrder, deleteOrder, ...props }) => {
  const [dataUser, setdatauser] = useState({})
  const [productItem, setproductItem] = useState([])
  const [alamat, setalamat] = useState("")
  const [kurir, setKuris] = useState(kurirs[0])
  const [ppn, setPpn] = useState(10000)
  const [catatan, setCatatan] = useState("")
  const [method, setmethod] = useState(methods[0])
  const [subtotal, setSubtotal] = useState(0)
  const [totals, setTotals] = useState(0)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleMetode, setmodalVisibleMetode] = useState(false);
  const [loading, setLoading] = useState(false)
  const [storeState, setStoreState] = useState(orderslist)
  const [couter, setCouter] = useState(0)

  useEffect(() => {
    getDataUser()
    cartekstrak()
    subTotalCreate()
  }, [])

  useEffect(() => {
    subTotalCreate()
  }, [alamat, kurir, method])


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
            setdatauser(response.data)
          })
      }
    } catch (error) {
    }
  }

  const cartekstrak = async () => {
    var datacart = []

    for (let index = 0; index < orderslist.length; index++) {
      fetch(`${baseURL}/api/v1/robotproductpartdevice/id/`, {
        method: "POST",
        body: JSON.stringify({
          "idrobotproductpartdevice": orderslist[index].idrobotproductpartdevices
        }),
        headers: myHeadersApiPublic
      })
        .then(response => response.json())
        .then(response => {
          const data = response.data
          data.idcart = orderslist[index].id
          datacart.push(data)
        })
      setproductItem(datacart)
    }

  }

  const subTotalCreate = () => {
    var total = 0
    for (let index = 0; index < productItem.length; index++) {
      total += productItem[index].price;
    }
    setSubtotal(total)
  }

  const deleteCart = (idcart) => {
    const newData = productItem.filter(item => item.idcart != idcart)
    setproductItem(newData)
  }

  const createPesanan = async () => {
    setLoading(true)
    if (alamat.length == 0 || subtotal.length == 0) {
      alert("Alamat dan Sub Total Wajib Terisi")
      setLoading(false)
    } else {
      for (let index = 0; index < productItem.length; index++) {
        const formData = {
          "idrobotproductpartdevice": productItem[index].idrobotpartdevice,
          "userid": dataUser.id,
          "kodeinvoice": `INV${dataUser.id}${subtotal + kurir.price + method.price + ppn}`,
          "namecustomer": dataUser.name,
          "namerobotmaster": route.params.namerobotmaster,
          "addresscustomer": alamat,
          "delivery": kurir.brand,
          "pricedelivery": kurir.price,
          "pricemethod": method.brand,
          "pricemethodsn": method.sn,
          "subtotal": subtotal,
          "ppn": ppn,
          "totals": subtotal + kurir.price + method.price + ppn,
          "pesan": catatan,
          "deliverydesc": kurir.desc,
          "pricemethodadmin": method.price
        }
        fetch(`${baseURL}/api/v1/robotorders/save/`, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: myHeadersApiPublic
        })
          .then(response => response.json())
          .then(res => {
            const triger = index + 1
            console.log(index + 1)
            if (triger == productItem.length) {
              ToastAndroid.showWithGravity(
                "Success",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              setLoading(false)
              navigation.navigate("Cart")
            }
          })
          .catch(err => {
            setLoading(false)
          })

      }
    }

  }


  const renderProductItem = () => {
    return productItem.map((value, index) => {
      return (
        <View key={index} style={styles.containerItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
            <Image source={{ uri: `${baseURL}/${value.image}` }} style={{ height: 45, width: 45, marginRight: 15 }} />
            <View style={{ maxWidth: '85%' }}>
              <Text numberOfLines={1} style={{ fontWeight: '500' }}>{value.namerobotmaster}</Text>
              <Text numberOfLines={1} style={{ fontWeight: '500' }}>{value.namecomponent}</Text>
              <Text numberOfLines={1} style={{ lineHeight: 25, fontSize: 11 }}>{value.descriptioncomponent.slice(0, 80)}...</Text>
              <Text numberOfLines={1} style={{ fontWeight: '500' }}>Rp. {value.price}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => deleteCart(value.idcart)}>
            <Image source={{ uri: `https://i.ibb.co/QM6b71C/delete.png` }} style={{ height: 25, width: 25, marginRight: 15 }} />
          </TouchableOpacity>
        </View>
      )
    })
  }

  return (
    <View style={{ flex: 1, marginTop: 22 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3114/3114883.png' }} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>REVIEW CHECKOUT</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerLocation}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2838/2838912.png' }} style={styles.icon} />
          <View style={{ marginLeft: 15, width: '90%' }}>
            <Text style={{ fontSize: 17, fontWeight: '500' }}>Alamat Pengiriman</Text>
            <Text>{dataUser.name} | {dataUser.number}</Text>
            <TextInput
              placeholder='Masukan alamat tujuan pengiriman'
              onChangeText={(input) => setalamat(input)}
              style={{
                height: 50,
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: "#aeaeae"
              }}
            />
          </View>
        </View>
        {renderProductItem()}
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.containerOpsi}>
          <View>
            <Text>Opsi pengiriman</Text>
            <Text style={{ lineHeight: 25, fontWeight: '600' }}>{kurir.brand}</Text>
            <Text>{kurir.desc}</Text>
          </View>
          <Text>RP. {kurir.price}   {">"}</Text>
        </TouchableOpacity>
        <View style={styles.containerOpsi}>
          <Text>Catatan : </Text>
          <TextInput
            placeholder='Silahkan tinggalkan pesan(opsional)'
            onChangeText={(input) => setCatatan(input)}
            style={{
              height: 50,
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: "#aeaeae",
              fontSize: 11
            }}
          />
        </View>
        <View style={styles.containerOpsi}>
          <Text>Total pesanan ({productItem.length} produk) : </Text>
          <Text>Rp. {subtotal}</Text>
        </View>
        <TouchableOpacity onPress={() => setmodalVisibleMetode(!modalVisibleMetode)} style={styles.containerOpsi}>
          <Text>Metode pembayaran</Text>
          <Text>{method.brand}-{method.sn} {">"}</Text>
        </TouchableOpacity>
        <View style={styles.containerOpsi}>
          <View>
            <Text style={{ marginBottom: 10 }}>Rincian pembayaran</Text>
            <Text style={{ fontSize: 12 }}>Subtotal produk</Text>
            <Text style={{ fontSize: 12 }}>Subtotal pengiriman</Text>
            <Text style={{ fontSize: 12 }}>Admin Pembayaran</Text>
            <Text style={{ fontSize: 12 }}>Ppp 11%</Text>
            <Text style={{ fontWeight: '600', marginTop: 10 }}>Total pembayaran</Text>
          </View>
          <View>
            <Text style={{ marginBottom: 10 }}></Text>
            <Text style={{ fontSize: 12 }}>Rp. {subtotal}</Text>
            <Text style={{ fontSize: 12 }}>Rp. {kurir.price}</Text>
            <Text style={{ fontSize: 12 }}>Rp. {method.price}</Text>
            <Text style={{ fontSize: 12 }}>Rp. {ppn}</Text>
            <Text style={{ fontWeight: '600', marginTop: 10 }}>Rp. {subtotal + kurir.price + method.price + ppn}</Text>
          </View>
        </View>
        <View style={{ height: 75 }} />
      </ScrollView >
      <View style={styles.containerCheckout}>
        <View style={{ width: '65%', backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'flex-end', padding: 20 }}>
          <Text style={{ fontWeight: '600', fontSize: 17 }}>Total Pembayaran</Text>
          <Text style={{ fontWeight: '600', fontSize: 17, color: '#9E579D' }}>Rp. {subtotal + kurir.price + method.price + ppn}</Text>
        </View>
        <TouchableNativeFeedback onPress={() => createPesanan()}>
          <View style={{ width: '35%', backgroundColor: '#9E579D', justifyContent: 'center', alignItems: 'center' }}>
            {loading ?
              <ActivityIndicator size={'large'} color={'#fff'} />
              :
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#FFF' }}>Buat Pesanan</Text>
            }
          </View>
        </TouchableNativeFeedback>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.4)" }}>
          <View style={{ width: "90%", height: "50%", backgroundColor: "#fff", borderRadius: 20 }}>
            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 20, marginTop: 10, textAlign: "center", marginBottom: 10 }}>Pilih Jasa Pengiriman</Text>
            <ScrollView>
              <View style={{ width: "100%", height: "90%", alignItems: "center" }}>
                {
                  kurirs.map((value, index) => {
                    return (
                      <TouchableOpacity key={index} onPress={() => {
                        setKuris(kurirs[index])
                        setModalVisible(!modalVisible)
                      }} style={{
                        width: Dimensions.get('window').width - 150,
                        height: 60, borderBottomWidth: 1, borderBottomColor: "#aeaeae", flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                      }} >
                        <View>
                          <Text style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>{value.brand}</Text>
                          <Text style={{ color: "#000", fontSize: 10, }}>{value.desc}</Text>
                          <Text style={{ color: "#000", fontSize: 10, fontWeight: "bold" }}> Rp {value.price}</Text>
                        </View>
                        <Text>{'>'}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </ScrollView>
          </View>
        </View>

      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleMetode}
        onRequestClose={() => {
          setmodalVisibleMetode(!modalVisibleMetode);
        }}
      >
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.4)" }}>
          <View style={{ width: "90%", height: "50%", backgroundColor: "#fff", borderRadius: 20 }}>
            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 20, marginTop: 10, textAlign: "center", marginBottom: 10 }}>Pilih Metode Pembayaran</Text>
            <ScrollView>
              <View style={{ width: "100%", height: "90%", alignItems: "center" }}>
                {
                  methods.map((value, index) => {
                    return (
                      <TouchableOpacity key={index} onPress={() => {
                        setmethod(methods[index])
                        setmodalVisibleMetode(!modalVisibleMetode)
                      }} style={{
                        width: Dimensions.get('window').width - 150,
                        height: 60, borderBottomWidth: 1, borderBottomColor: "#aeaeae", flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                      }} >
                        <View>
                          <Text style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}>{value.brand}</Text>
                          <Text style={{ color: "#000", fontSize: 10, }}>{value.sn}</Text>
                          <Text style={{ color: "#000", fontSize: 10, fontWeight: "bold" }}> Rp {value.price}</Text>
                        </View>
                        <Text>{'>'}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </ScrollView>
          </View>
        </View>

      </Modal>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {},
  header: { height: 50, backgroundColor: '#FFF', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, elevation: 3 },
  containerLocation: { padding: 20, flexDirection: 'row', backgroundColor: '#FFF', elevation: 3, marginTop: 3 },
  icon: { height: 24, width: 24 },
  containerItem: { flexDirection: 'row', padding: 20, backgroundColor: '#9E579D50', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  containerOpsi: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#FFF', marginTop: 5 },
  containerCheckout: { flexDirection: 'row', height: 70, position: 'absolute', bottom: 0 }
})


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

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);