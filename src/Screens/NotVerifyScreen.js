import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Center, Heading, Image, VStack } from "native-base";
import { useEffect } from 'react';
import Colors from "../Color";
import Buttone from "../Components/Buttone";

function NotVerifyScreen({ navigation }) {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if (value !== null) {
        // value previously stored
        console.log(JSON.parse(value))
        navigation.replace("Bottom")
      }
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box flex={1} bg={Colors.main} safeAreaTop>
      <Center w="full" h={300}>
        <Image
          source={require("../../assets/icon2.png")}
          alt="Logo"
          size="48"
        />
      </Center>
      <VStack space={6} px={5} alignItems="center">
        <Heading color={Colors.white}>LET'S BUILD YOUR ROBOT !</Heading>
        <Buttone
          bg={Colors.white}
          color={Colors.main}
          onPress={() => navigation.navigate("Register")}
        >
          REGISTER
        </Buttone>
        <Buttone
          bg={Colors.white}
          color={Colors.main}
          onPress={() => navigation.navigate("Login")}
        >
          LOGIN
        </Buttone>
      </VStack>
    </Box>
  );
}

export default NotVerifyScreen;
