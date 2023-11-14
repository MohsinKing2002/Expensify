import { StatusBar } from "expo-status-bar";
import Home from "./src/Screens/Home";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import History from "./src/Screens/History";
import Account from "./src/Screens/Account";
import Login from "./src/Screens/Login";
import Register from "./src/Screens/Register";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ animation: "none" }}
        >
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Home}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen
            name="Register"
            options={{ headerShown: false }}
            component={Register}
          />
          <Stack.Screen
            name="History"
            options={{
              headerTitleAlign: "center",
              headerTitle: "Transactions History",
            }}
            component={History}
          />
          <Stack.Screen
            name="Account"
            options={{
              headerTitleAlign: "center",
              headerTitle: "Account",
            }}
            component={Account}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" backgroundColor="white" />
    </PaperProvider>
  );
}
