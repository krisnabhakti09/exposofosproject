import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Box,
  Button,
  Heading,
  Image
} from "native-base";
import { useState } from "react";
import { Text, TextInput, View } from 'react-native';
import Colors from "../Color";
import { baseURL, myHeadersApiPublic } from '../service/index';
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const login = async () => {
    const formData = {
      email: email,
      password: password
    }
    console.log(formData)
    fetch(`${baseURL}/api/v1/users/login/`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: myHeadersApiPublic
    })
      .then(response => response.json())
      .then(async response => {
        if (response.meta.status == "success" && response.data.role) {
          await AsyncStorage.setItem('@token', JSON.stringify(response.data.token))
          navigation.replace("Bottom")
        } else {
          alert("email atau password anda salah")
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <Box flex={1} bg={Colors.black}>
      <Image
        flex={1}
        alt="Logo"
        resizeMode="cover"
        size="lg"
        w="full"
        source={require("../../assets/coverlogin.png")}
      />
      <Box
        w="full"
        h="full"
        position="absolute"
        top="5"
        px="6"
        justifyContent="center"
        alignItems="center"
      >
        <Heading marginBottom={30}>LOGIN</Heading>
        <View style={{ height: 45, backgroundColor: Colors.underline, justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: 15, borderRadius: 7, paddingHorizontal: 10 }}>
          <TextInput placeholderTextColor='#000' placeholder='Number / Email' textAlign='center' onChangeText={(email) => setEmail(email)} />
        </View>
        <View style={{ height: 45, backgroundColor: Colors.underline, justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: 15, borderRadius: 7, paddingHorizontal: 10 }}>
          <TextInput placeholderTextColor='#000' placeholder='Password' secureTextEntry textAlign='center' onChangeText={(password) => setPassword(password)} />
        </View>
        <Button
          _pressed={{
            bg: Colors.main,
          }}
          my={30}
          w="40%"
          rounded={10}
          bg={Colors.main}
          onPress={() => {
            login()

          }}
        >
          LOGIN
        </Button>
        <Text style={{ color: '#00000070' }}>Belum punya akun ? <Text style={{ color: Colors.main }} onPress={() => navigation.navigate("Register")}>Daftar</Text></Text>
        <View style={{ marginTop: 25, alignItems: 'center' }}>
          <Text style={{ color: '#00000070', marginBottom: 15 }}>Login dengan</Text>
          <Image source={{ uri: 'https://img.icons8.com/color/512/google-logo.png' }} style={{ height: 24, width: 24 }} />
        </View>
      </Box>
    </Box>
  );
}

export default LoginScreen;
