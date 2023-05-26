import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { baseURL } from "../service/index";

const HomeScreen = ({ navigation }) => {
  const [allrobot, setAllRobot] = useState([]);

  const getrobot = () => {
    fetch(`${baseURL}/api/v1/robotmaster/recomendation/`)
      .then((response) => response.json())
      .then((response) => {
        setAllRobot(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getrobot();
  }, []);

  const renderRobot = () => {
    return allrobot.map((value, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("DetailRecommended", { value: value })
          }
          style={{
            height: 250,
            elevation: 2,
            backgroundColor: "#FFF",
            marginLeft: 20,
            marginTop: 20,
            borderRadius: 15,
            marginBottom: 10,
            width: 160,
          }}
        >
          <Image
            source={{
              uri: `${baseURL}/${value.image}`,
            }}
            style={{
              height: 100,
              width: 160,
              resizeMode: "contain",
              borderRadius: 15,
            }}
          />
          <View
            style={{
              paddingTop: 10,
              paddingHorizontal: 10,
              height: 110,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "#000",
                fontSize: 12,
              }}
            >
              {value.name}
            </Text>
            <Text
              style={{
                color: "#000",
                fontSize: 10,
                textAlign: "justify",
              }}
            >
              {value.description}
            </Text>
          </View>

          <Text
            style={{
              paddingHorizontal: 10,
              fontWeight: "bold",
              color: "#9E579D",
              paddingTop: 3,
            }}
          >
            Rp{value.price}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  return (
    <View
      style={{
        backgroundColor: "#9E579D",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#FFF",
          height: "20%",
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          paddingHorizontal: 10,
          paddingTop: 60,
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 75,
          }}
        >
          <Image
            source={require("../../assets/favicon2.png")}
            style={{ height: 70, width: 70, marginTop: 5, marginRight: -50 }}
          />
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              marginLeft: 50,
            }}
          >
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  fontSize: 25,
                  color: "#9E579D",
                  fontWeight: "bold",
                }}
              >
                SOFOSROBOTICS
              </Text>
            </View>
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  fontSize: 15,
                  color: "#9E579D",
                  fontWeight: "bold",
                }}
              >
                ROBOTICS & AUTOMATIONS
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%", paddingTop: 20, paddingBottom: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                color: "#FFF",
              }}
            >
              Recommended
            </Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 400 }}
        >
          <LinearGradient
            colors={["#9E579D", "transparent"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 250,
              marginTop: 100,
              top: -50,
            }}
          />
          {renderRobot()}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontWeight: "bold",
                marginTop: -100,
                fontSize: 25,
                color: "#FFF",
              }}
            >
              Costum
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 50,
            width: "100%",
            marginTop: -40,
            marginLeft: -50,
          }}
        >
          {/* <TouchableOpacity onPress={() => navigation.navigate("Robotics")}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 100,
                width: 100,
                borderRadius: 15,
                backgroundColor: "#FFFFFF",
                marginLeft: 20,
              }}
            >
              <FontAwesome5 name="robot" size={50} color="black" />
              <Text
                style={{
                  fontSize: 12,
                  paddingTop: 5,
                }}
              >
                ROBOTICS
              </Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate("Category")}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 100,
                width: 100,
                borderRadius: 15,
                backgroundColor: "#FFFFFF",
                marginLeft: 20,
              }}
            >
              <MaterialCommunityIcons
                name="robot-industrial"
                size={50}
                color="black"
              />
              <Text
                style={{
                  fontSize: 12,
                  paddingTop: 5,
                }}
              >
                Kategory
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ width: "100%", marginTop: 120, marginBottom: 1 }}>
            <Text
              style={{
                fontWeight: "bold",
                marginTop: -100,
                fontSize: 25,
                color: "#FFF",
              }}
            >
              Parts
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 50,
            width: "100%",
            marginTop: -40,
            marginLeft: -50,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Robotics")}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 100,
                width: 100,
                borderRadius: 15,
                backgroundColor: "#FFFFFF",
                marginLeft: 20,
              }}
            >
              <FontAwesome5 name="robot" size={50} color="black" />
              <Text
                style={{
                  fontSize: 12,
                  paddingTop: 5,
                }}
              >
                ROBOTICS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Automations")}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 100,
                width: 100,
                borderRadius: 15,
                backgroundColor: "#FFFFFF",
                marginLeft: 20,
              }}
            >
              <MaterialCommunityIcons
                name="robot-industrial"
                size={50}
                color="black"
              />
              <Text
                style={{
                  fontSize: 12,
                  paddingTop: 5,
                }}
              >
                AUTOMATIONS
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ width: "100%", marginTop: 20, marginBottom: 20 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                color: "#FFF",
              }}
            >
              Produk Lainnya
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            marginLeft: -20,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://api.whatsapp.com/send/?phone=6289666608447&text&type=phone_number&app_absent=0"
              )
            }
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 100,
                width: 100,
                borderRadius: 15,
                backgroundColor: "#FFFFFF",
                marginLeft: 20,
              }}
            >
              <Entypo name="blackboard" size={50} color="black" />
              <Text
                style={{
                  fontSize: 12,
                  paddingTop: 5,
                }}
              >
                CONSULT & TRAINING
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
