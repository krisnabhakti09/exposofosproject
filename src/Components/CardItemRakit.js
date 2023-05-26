import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import robotics from "../../assets/robotics.png";

const CardItemRakit = ({ onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View>
          <Image source={robotics} />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CardItemRakit;

{
  /*const styles = StyleSheet.create({
  cardItem: {
    height: 170,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  }
})
*/
}
