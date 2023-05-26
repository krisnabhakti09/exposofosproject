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

function RegisterScreen({ navigation }) {
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [repassword, setrepassword] = useState("")
  const register = () => {
    if (password === repassword) {

      const formData = {
        name: name,
        number: number,
        email: email,
        password: password
      }
      console.log(formData)
      fetch(`${baseURL}/api/v1/users/register/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: myHeadersApiPublic
      })
        .then(response => response.json())
        .then(response => {
          if (response.meta.status = "success" && response.data.role == "user") {
            navigation.goBack()
            alert("Register Sukses")
          } else {
            alert("Gagal Register")
          }
        })
        .catch(err => console.log(err))
    } else {
      alert("re-password tidak salam")
    }
  }

  return (
    <Box flex={1} bg={Colors.black}>
      <Image
        flex={1}
        alt="Logo"
        resizeMode="cover"
        size="lg"
        w="full"
        source={require("../../assets/coverregister.png")}
      />
      <Box
        w="full"
        h="full"
        position="absolute"
        top="10"
        px="6"
        justifyContent="center"
        alignItems="center"
      >
        <Heading marginBottom={30}>REGISTER</Heading>
        <View style={{ height: 45, backgroundColor: Colors.underline, justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: 15, borderRadius: 7, paddingHorizontal: 10 }}>
          <TextInput placeholderTextColor='#000' placeholder='Name' textAlign='center' onChangeText={(input) => setName(input)} />
        </View>
        <View style={{ height: 45, backgroundColor: Colors.underline, justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: 15, borderRadius: 7, paddingHorizontal: 10 }}>
          <TextInput placeholderTextColor='#000' placeholder='Number' textAlign='center' onChangeText={(input) => setNumber(input)} />
        </View>
        <View style={{ height: 45, backgroundColor: Colors.underline, justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: 15, borderRadius: 7, paddingHorizontal: 10 }}>
          <TextInput placeholderTextColor='#000' placeholder='Email' textAlign='center' onChangeText={(input) => setEmail(input)} />
        </View>
        <View style={{ height: 45, backgroundColor: Colors.underline, justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: 15, borderRadius: 7, paddingHorizontal: 10 }}>
          <TextInput placeholderTextColor='#000' placeholder='Password' secureTextEntry textAlign='center' onChangeText={(input) => setpassword(input)} />
        </View>
        <View style={{ height: 45, backgroundColor: Colors.underline, justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: 15, borderRadius: 7, paddingHorizontal: 10 }}>
          <TextInput placeholderTextColor='#000' placeholder='Re-Password' secureTextEntry textAlign='center' onChangeText={(input) => setrepassword(input)} />
        </View>
        <Button
          _pressed={{
            bg: Colors.main,
          }}
          my={30}
          w="40%"
          rounded={50}
          bg={Colors.main}
          onPress={() => register()}
        >
          SIGN UP
        </Button>
        <Text style={{ color: '#00000070' }}>Sudah punya akun ? <Text style={{ color: Colors.main }} onPress={() => navigation.navigate("Login")}>Log In</Text></Text>
      </Box>
    </Box>
  );
}

export default RegisterScreen;
