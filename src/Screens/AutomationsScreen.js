import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { baseURL } from '../service/index';

const AutomationScreen = ({ navigation }) => {
  const [allrobot, setAllRobot] = useState([])

  const getrobot = () => {
    fetch(`${baseURL}/api/v1/robotmaster/automation/`)
      .then(response => response.json())
      .then(response => {
        console.log(response.data)
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
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate("MekanikScreen", { idrobotmaster: value.id, namerobotmaster: value.name })}
          style={{
            height: 250,
            elevation: 2,
            backgroundColor: "#FFF",
            marginLeft: 20,
            marginTop: 20,
            borderRadius: 15,
            marginBottom: 10,
            width: 200,
          }}
        >
          <Image source={{
            uri: `${baseURL}/${value.image}`
          }}
            style={{
              height: 100,
              width: 200,
              resizeMode: "contain",
              borderRadius: 15
            }}
          />
          <View
            style={{
              paddingTop: 10,
              paddingHorizontal: 10,
              height: 110
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
                textAlign: "justify"
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
      )
    })

  }
  return (
    <View style={[styles.container, { marginTop: 20 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3114/3114883.png' }} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Automation</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView>
        <View style={styles.contentContainer}>
          {renderRobot()}
        </View>
      </ScrollView>
    </View>
  );
};

export default AutomationScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#9E579D'
  },
  header: { height: 50, backgroundColor: '#FFF', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  icon: { height: 24, width: 24 },
  title: { fontSize: 19, fontWeight: '600', color: '#000' },
  contentContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 5 },
  itemContainer: { backgroundColor: '#FFF', borderRadius: 10, alignItems: 'center', padding: 10, width: '47%', marginTop: 20 },
  bannerPrdct: { height: 100, width: '100%' },
  text: { color: '#000', fontWeight: '500' },
  countContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 }
});
