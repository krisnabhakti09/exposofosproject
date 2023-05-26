import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Button } from "native-base";
import { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../Color";
import { baseURL, myHeadersApiPublic, uploadAvatarService } from "../service";

function ProfileScreen({ navigation }) {
  const [dataUser, setdatauser] = useState({});
  const [avatar, setavatar] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value != null) {
        let myHeadersApiPrivate = new Headers();
        myHeadersApiPrivate.append("Accept", "application/json");
        myHeadersApiPrivate.append(
          "Authorization",
          `Bearer ${JSON.parse(value)}`
        );

        fetch(`${baseURL}/api/v1/users/profile/`, {
          method: "GET",
          headers: myHeadersApiPrivate,
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response.data);
            setdatauser(response.data);
            setavatar(response.data.avatar);
            setName(response.data.name);
            setNumber(response.data.number);
            setEmail(response.data.email);
          });
      }
    } catch (error) {}
  };

  const updateUser = () => {
    const formData = {
      userid: dataUser.id,
      name: name,
      number: number,
      email: email,
    };
    fetch(`${baseURL}/api/v1/users/update/`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: myHeadersApiPublic,
    })
      .then((response) => response.json())
      .then((response) => {
        if (
          (response.meta.status = "success" && response.data.role == "user")
        ) {
          setModalVisible(!modalVisible);
          getDataUser();
          alert("Sukses Update");
        } else {
          setModalVisible(!modalVisible);
          alert("Gagal Update");
        }
      })
      .catch((err) => {
        setModalVisible(!modalVisible);
        console.log(err);
      });
  };

  const updateAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      const token = await AsyncStorage.getItem("@token");
      if (token != null) {
        const results = await uploadAvatarService(
          JSON.parse(token),
          result.assets[0].uri
        );
        if (
          results.meta.status == "success" &&
          results.data.is_uploaded == true
        )
          getDataUser();
      } else {
        alert("Gagal Ganti Photo");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => updateAvatar()}>
          <Image
            style={[styles.avatar, { resizeMode: "contain" }]}
            source={{ uri: `${baseURL}/${avatar}` }}
          />
        </TouchableOpacity>
        <View style={{ maxWidth: "70%" }}>
          <Text style={styles.name}>{dataUser.name}</Text>
          <Text style={{ fontSize: 10, color: "#fff" }}>
            {dataUser.number}|{dataUser.email}{" "}
          </Text>
          <Text
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.info}
          >
            Edit Profile {"  >"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        style={styles.contentContainer}
      >
        <Text style={styles.description}>Riwayat Pesanan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.contentContainer}
      >
        <Text style={styles.description}>Pengaturan Akun</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() =>
          Linking.openURL(
            "https://api.whatsapp.com/send/?phone=6289666608447&text&type=phone_number&app_absent=0"
          )
        }
      >
        <Text style={styles.description}>Pusat Bantuan</Text>
      </TouchableOpacity>
      <Text
        onPress={() => {
          AsyncStorage.clear();
          navigation.replace("Login");
        }}
        style={styles.logout}
      >
        Log Out
      </Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View
            style={{
              width: "90%",
              height: "50%",
              backgroundColor: "#fff",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "#000",
                fontWeight: "bold",
                fontSize: 20,
                marginTop: 10,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Pengaturan Akun
            </Text>
            <View
              style={{ width: "100%", height: "90%", alignItems: "center" }}
            >
              <View
                style={{
                  height: 45,
                  backgroundColor: Colors.underline,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80%",
                  marginTop: 15,
                  borderRadius: 7,
                  paddingHorizontal: 10,
                }}
              >
                <TextInput
                  defaultValue={name}
                  placeholderTextColor="#000"
                  placeholder="Name"
                  textAlign="center"
                  onChangeText={(input) => setName(input)}
                />
              </View>
              <View
                style={{
                  height: 45,
                  backgroundColor: Colors.underline,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80%",
                  marginTop: 15,
                  borderRadius: 7,
                  paddingHorizontal: 10,
                }}
              >
                <TextInput
                  defaultValue={number}
                  placeholderTextColor="#000"
                  placeholder="Number"
                  textAlign="center"
                  onChangeText={(input) => setNumber(input)}
                />
              </View>
              <View
                style={{
                  height: 45,
                  backgroundColor: Colors.underline,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80%",
                  marginTop: 15,
                  borderRadius: 7,
                  paddingHorizontal: 10,
                }}
              >
                <TextInput
                  defaultValue={email}
                  placeholderTextColor="#000"
                  placeholder="Email"
                  textAlign="center"
                  onChangeText={(input) => setEmail(input)}
                />
              </View>
              <Button
                _pressed={{
                  bg: Colors.main,
                }}
                my={30}
                w="40%"
                rounded={50}
                bg={Colors.main}
                onPress={() => updateUser()}
              >
                Save
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#9E579D",
    height: 200,
    alignItems: "center",
    flexDirection: "row",
  },
  avatar: {
    width: 90,
    height: 90,
    // borderRadius: 45,
    // borderWidth: 3,
    // borderColor: "white",
    marginLeft: 30,
    marginRight: 25,
  },
  name: {
    fontSize: 17,
    color: "#FFF",
    fontWeight: "600",
  },
  info: {
    color: "#FFF",
    marginTop: 10,
  },
  description: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  contentContainer: {
    padding: 20,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  logout: {
    textAlign: "center",
    marginTop: 30,
    fontWeight: "600",
    fontSize: 17,
    color: "#9E579D",
  },
});
