import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Home from "./src/Screens/Home";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import History from "./src/Screens/History";
import Account from "./src/Screens/Account";
import Navbar from "./src/Components/Menu";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ animation: "none" }}
        >
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Home}
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
