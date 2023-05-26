import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const CardItemRekomendasi = ({ onPress }) => {
  
  return (
      <TouchableOpacity 
        onPress={()=>navigation.navigate("Detail")}
           style={{styles.cardItem}}
        >
        <Image
          source={require('../../assets/images/1.png')}
        />
        <View style={{
          flexDirection:"row",
          paddingTop:10,
          paddingHorizontal:10
        }}
        >
          <Text style={{
            fontWeight:"bold"
          }}
          >
            ROBOT AVG KAIBO
          </Text>
        </View>
        <Text style={{
          paddingHorizontal:10,
          fontWeight:"bold",
          color:"#9E579D",
          paddingTop:3
        }}
        >
          Rp 5.000.000
        </Text>
      </TouchableOpacity>
  );
}

export default CardItemRekomendasi;

const styles = StyleSheet.create({
  cardItem: {
    height:250,
    elevation:2,
    backgroundColor:"#FFF",
    marginLeft:20,
    marginTop:20,
    borderRadius:15,
    marginBottom:10,
    width:160
  }
})