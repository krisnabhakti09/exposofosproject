import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { configureStore } from "@reduxjs/toolkit";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import BottomNav from "./src/Navigations/BottomNav";
import AutomationsScreen from "./src/Screens/AutomationsScreen";
import CartScreen from "./src/Screens/CartScreen";
import CartScreenrecomended from "./src/Screens/CartScreenrecomended";
import CategoryScreen from "./src/Screens/CategoryScreen";
import DetailRecommended from "./src/Screens/DetailRecommended";
import Detailhistory from "./src/Screens/Detailhistory";
import Detailhistoryrekomendasi from "./src/Screens/Detailhistoryrekomendasi";
import FiturScreen from "./src/Screens/FiturScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import MekanikScreen from "./src/Screens/MekanikScreen";
import NotVerifyScreen from "./src/Screens/NotVerifyScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import RoboticsScreen from "./src/Screens/RoboticsScreen";
import SoftwareScreen from "./src/Screens/SoftwareScreen";
import rootReducer from "./src/redux/reducers";

const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: rootReducer,
});

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <Stack.Navigator
            initialRouteName="Notverify"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="NotVerify" component={NotVerifyScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Robotics" component={RoboticsScreen} />
            <Stack.Screen name="Software" component={SoftwareScreen} />
            <Stack.Screen name="Automations" component={AutomationsScreen} />
            <Stack.Screen name="Bottom" component={BottomNav} />
            <Stack.Screen name="Fitur" component={FiturScreen} />
            <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen name="MekanikScreen" component={MekanikScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="Detailhistory" component={Detailhistory} />
            <Stack.Screen
              name="DetailRecommended"
              component={DetailRecommended}
            />
            <Stack.Screen
              name="CartScreenrecomended"
              component={CartScreenrecomended}
            />
            <Stack.Screen
              name="Detailhistoryrekomendasi"
              component={Detailhistoryrekomendasi}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
